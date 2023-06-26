const {
    createOrder,
    deleteOrder,
    getOrder,
    updateOrder,
    getOrders,
  } = require("../controller/order");
  const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("../controller/verifyToken");
  
  const router = require("express").Router();
  
  //update
  router.put("/find/:id", verifyToken, updateOrder);
  
  //create
  router.post("/", verifyTokenAndAuthorization, createOrder);
  
  //delete
  router.delete("/:id", verifyTokenAndAdmin, deleteOrder);
  
  //get user Orders
  router.get("/find/:userId", verifyTokenAndAuthorization, getOrder);
  
  //get all users Orders
  router.get("/", verifyTokenAndAdmin, getOrders);
  
  module.exports = router;
  