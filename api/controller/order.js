const Product = require("../models/Product");
const Order = require("../models/Order");

const createOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  console.log("123456456")
  console.log(req)
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json(error);
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
    const productIds = order.products.map((item) => item.productId);
    const products = await Product.find({ product_id: { $in: productIds } }, ["title", "product_id", "_id"]);
    const productsWithQuantity = products.map((product) => {
      const orderProduct = order.products.find(
        (item) => item.productId === product.product_id
      );
      console.log(orderProduct)
      return {
        ...product.toObject(),
        quantity: orderProduct.quantity
      };
    });

    res.status(200).json(productsWithQuantity);
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
