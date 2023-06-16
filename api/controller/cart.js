const Cart = require("../models/Cart");

const createCart = async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(error);
  }
};

//delete Cart
const deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart Has Been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};
//get Cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userID });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
};

//get all Carts
const getCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving Carts.", error });
  }
};

module.exports = {
  createCart,
  updateCart,
  deleteCart,
  getCart,
  getCarts,
};
