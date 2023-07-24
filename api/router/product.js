const {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateproduct,
} = require("../controller/product");
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  verifyToken
} = require("../controller/verifyToken");

const router = require("express").Router();

//update
router.put("/find/:id", verifyTokenAndAdmin, updateproduct);

//create
router.post("/", verifyTokenAndAdmin, createProduct);

//delete
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);

//get product
router.get("/find/:id", getProduct);

//get all products
router.get("/:company", verifyToken, getProducts);

module.exports = router;
