const {
  createForm,
  deleteForm,
  getForm,
  updateForm,
  getForms,
  getPdf,
} = require("../controller/form");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../controller/verifyToken");

const router = require("express").Router();

//update
router.put("/find/:formID", verifyTokenAndAdmin, updateForm);

//create
router.post("/", verifyTokenAndAdmin, createForm);

//delete
router.delete("/find/:formID", verifyTokenAndAdmin, deleteForm);

//get specific Form
router.get("/find/:formID", verifyTokenAndAdmin, getForm);

//get all Forms
router.get("/", verifyTokenAndAdmin, getForms);

//get pdf file from form
router.post("/pdf/:formID", verifyTokenAndAdmin, getPdf);


module.exports = router;
