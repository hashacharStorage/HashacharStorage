const {
  createForm,
  deleteForm,
  getForm,
  updateForm,
  getForms,
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
router.delete("/:formID", verifyTokenAndAdmin, deleteForm);

//get specific Form
router.get("/find/:formID", verifyTokenAndAdmin, getForm);

//get all Forms
router.get("/", verifyTokenAndAdmin, getForms);

module.exports = router;
