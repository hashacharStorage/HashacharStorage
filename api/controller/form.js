const Form = require("../models/Form");

const createForm = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("product raw: ", req.body)

  const generateForm = async () => {
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
    const newForm = new Form(req.body);
    await newForm.save();
    res.status(200).send("ok")
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ ...error, "msg": "the error is here" });
  }
};

const updateForm = async (req, res) => {
  try {
    const updatedForm = await Form.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedForm);
  } catch (error) {
    res.status(500).json(error);
  }
};

//delete Form
const deleteForm = async (req, res) => {
  try {
    await Form.findByIdAndDelete(req.params.id);
    res.status(200).json("Form Has Been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};
//get Form
const getForm = async (req, res) => {
  try {
    const Form = await Form.findOne({ userId: req.params.userID });

    res.status(200).json(Form);
  } catch (error) {
    res.status(500).json(error);
  }
};

//get all Forms
const getForms = async (req, res) => {
  try {
    const Forms = await Form.find();
    res.status(200).json(Forms);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving Forms.", error });
  }
};

module.exports = {
  createForm,
  updateForm,
  deleteForm,
  getForm,
  getForms,
};
