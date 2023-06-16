const router = require("express").Router();
const { getAllCompanies, registerCompany } = require("../controller/company");

//GET
router.get("/all", getAllCompanies);

//CREATE
router.post("/register", registerCompany);

module.exports = router;
