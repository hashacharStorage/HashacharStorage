const Company = require("../models/Company");
const Form = require("../models/Form");
const Product = require("../models/Product");
const { generatePDF } = require("../utils/generatePDF/pdfGenerator");


const createForm = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const newForm = new Form(req.body);
    await newForm.save();
    res.status(200).send("ok")
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ ...error, "msg": "server error" });
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
    console.log(req.params.formID)
    await Form.findByIdAndDelete(req.params.formID);
    res.status(200).json("Form Has Been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};
//get Form
const getForm = async (req, res) => {
  try {
    console.log(req.params)
    const form = await Form.findById(req.params.formID);
    res.status(200).send(form);
  } catch (error) {
    console.log(error)
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

const getPdf = async (req, res) => {
  console.log(req.body)
  try {
    const form = await Form.findById(req.params.formID)
    let order = [];
    for (const product of form.products) {
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
    const company = await Company.findOne({ id: form.company });
    const user = {...req.body.data,team:0,villa:false,company:company.name}
    console.log(user)
    const pdf = await generatePDF(order, user)
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="pdf"`);
    res.status(200).send(pdf);

  } catch (error) {
    console.log(error)
    res.status(500).send('Internal Server Error');

  }


}

module.exports = {
  createForm,
  updateForm,
  deleteForm,
  getForm,
  getForms,
  getPdf
};
