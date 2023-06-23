const router = require("express").Router();
const { registerUser, loginUser } = require("../controller/auth");
const { verifyTokenAndAdmin } = require("../controller/verifyToken");

//REGISTER
router.post("/register", verifyTokenAndAdmin, registerUser);

//LOGIN
router.post("/login", loginUser);

module.exports = router;
