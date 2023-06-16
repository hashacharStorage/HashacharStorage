const { updateUserInfo, getUser, deleteUser, getUsers } = require("../controller/user");
const verifyToken = require("../controller/verifyToken");

const router = require("express").Router();

//update user info
router.put("/:id", verifyToken.verifyTokenAndAuthorization, updateUserInfo);

//delete user
router.delete("/:id", verifyToken.verifyTokenAndAdmin, deleteUser);

//get user
router.get("/find/:id", verifyToken.verifyTokenAndAdmin, getUser);

//get all users
router.get("/", verifyToken.verifyTokenAndAdmin, getUsers);

module.exports = router;
