const {
  createCart,
  deleteCart,
  getCart,
  updateCart,
  getCarts,
} = require("../controller/cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../controller/verifyToken");

const router = require("express").Router();

//update
router.put("/find/:id", verifyTokenAndAuthorization, updateCart);

//create
router.post("/", verifyToken, createCart);

//delete
router.delete("/:id", verifyTokenAndAuthorization, deleteCart);

//get user Cart
router.get("/find/:userId", verifyTokenAndAuthorization, getCart);

//get all users carts
router.get("/", verifyTokenAndAdmin, getCarts);

module.exports = router;
