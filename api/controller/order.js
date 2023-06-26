const Order = require("../models/Order");

const createOrder = async (req, res) => {
  const newOrder = new Order(req.body);

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
    const order = await Order.find({ userId: req.params.userID });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
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
