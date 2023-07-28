const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");
const Company = require("../models/Company");
const axios = require("axios")
const emailSender = require("../utils/emailsender")


const createOrder = async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  const generateorder = async (user) => {
    let order = [];
    for (const product of req.body.products) {
      const foundProduct = await Product.findOne({
        product_id: product.productId,
      });
      if (foundProduct) {
        const orderItem = {
          product_id: foundProduct.product_id,
          title: foundProduct.title,
          serial: foundProduct.serial,
          quantity: product.quantity,
          isBlack: foundProduct.isBlack,
        };
        order.push(orderItem);
      }
    }
    return order;
  };

  try {
    const existingOrder = await Order.findOne({ userId: req.body.userId });
    const userResponse = await User.findById(req.body.userId);
    const company = await Company.findOne({ id: userResponse.company });
    const user = {
      ...userResponse._doc,
      company: company.name,
      company_email: company.email,
    };
    if (existingOrder) {
      existingOrder.products = req.body.products;
      existingOrder.updatedAt = Date.now();
      await existingOrder.save();
    } else {
      const newOrder = new Order(req.body);
      await newOrder.save();
    }
    const order = await generateorder(user);

    axios.post("http://localhost:5001/generateOrderpdf",
      { user, order },
      {
        headers: {
          'content-type': 'application/json'
        }
      }).then((response) => {
        const pdf = response.data.pdf;
        emailSender.sendEmail(pdf, user)
      })

    res.status(200).send("ok")

  } catch (error) {
    console.log(error);
    res.status(500).json({ ...error, "msg": "the error is here" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

//delete Order
const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order Has Been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};
//get Order
const getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ userId: req.params.id });
    if (order === null) {
      res.status(404).json({ message: "לא נמצאה הזמנה במערכת." });
      return;
    }
    const productIds = order.products.map((item) => item.productId);
    const products = await Product.find({ product_id: { $in: productIds } }, [
      "title",
      "product_id",
      "_id",
    ]);
    const productsWithQuantity = products.map((product) => {
      const orderProduct = order.products.find(
        (item) => item.productId === product.product_id
      );
      return {
        ...product.toObject(),
        quantity: orderProduct.quantity,
      };
    });

    const updatedAt = order.updatedAt;
    res
      .status(200)
      .json({ products: productsWithQuantity, createdAt: updatedAt });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//get all Orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving Orders.", error });
  }
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getOrders,
};
