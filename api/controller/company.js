const Company = require("../models/Company");

const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).send(companies);
  } catch (error) {
    res.status(500).send(error);
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


module.exports = { getAllCompanies, registerCompany };
