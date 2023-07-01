const Company = require("../models/Company");
const User = require("../models/User");
const Product = require("../models/Product");

const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).send(companies);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCompany = async (req, res) => {
  const id = req.params.id;
  try {
    const company = await Company.findById(id);
    res.status(200).json(company);
  } catch (error) {
    res.send(404).json({ messgae: "no company has found" });
  }
};

const registerCompany = async (req, res) => {
  try {
    const company = new Company(req.body);
    const savedCompany = await company.save();

    res.status(200).json(savedCompany);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while saving the company." });
  }
};

const updateCompany = async (req, res) => {
  try {
    const updatedCopany = await Company.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCopany);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    const specificCompany = await Company.findById(companyId);

    await User.deleteMany({ company: specificCompany.id });

    // Remove company ID from products
    const products = await Product.find({ companies: specificCompany.id });
    for (let product of products) {
      if (
        product.companies.length === 2 &&
        product.companies.includes(specificCompany.id)
      ) {
        // compnies lisk is only built from admin and deletec comapny
        await product.remove();
      } else {
        // Remove company ID from the array
        product.companies = product.companies.filter(
          (company) => company !== specificCompany.id
        );
        await product.save();
      }
    }

    await specificCompany.remove();

    res.status(200).json("Company, users, products have been removed");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getAllCompanies,
  registerCompany,
  updateCompany,
  deleteCompany,
  getCompany
};
