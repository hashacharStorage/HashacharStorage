const Product = require("../models/Product");

const createProduct = async (req, res) => {
  const newProduct =new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateproduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

//delete product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product Has Been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};
//get product
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

//get all products from the company
const getProducts = async (req, res) => {
  const qCompanies = req.params.company;
  const filter = {};
  filter.companies = { $in: qCompanies };
  try {
    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products.", error });
  }
};

module.exports = {
  createProduct,
  updateproduct,
  deleteProduct,
  getProduct,
  getProducts,
};
