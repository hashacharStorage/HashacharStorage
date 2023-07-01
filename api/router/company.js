const router = require("express").Router();
const {
  getAllCompanies,
  registerCompany,
  updateCompany,
  deleteCompany,
  getCompany,
} = require("../controller/company");
const { verifyTokenAndAdmin } = require("../controller/verifyToken");

//GET
router.get("/all", getAllCompanies);
router.get("/find/:id", getCompany);

//CREATE
router.post("/register", verifyTokenAndAdmin, registerCompany);

//UPDATE
router.put("/find/:id", verifyTokenAndAdmin, updateCompany);

//DELETE
router.delete("/find/:id", verifyTokenAndAdmin, deleteCompany);
module.exports = router;
