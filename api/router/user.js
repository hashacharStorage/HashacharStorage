const { updateUserInfo, getUser, deleteUser, getUsers, getUsersForExcel } = require("../controller/user");
const verifyToken = require("../controller/verifyToken");

const router = require("express").Router();

//update user info
router.put("/:id", verifyToken.verifyTokenAndAuthorization, updateUserInfo);

//delete user
router.delete("/:id", verifyToken.verifyTokenAndAdmin, deleteUser);

//get user
router.get("/find/:id", verifyToken.verifyTokenAndAuthorization, getUser);

//get all users
router.get("/", verifyToken.verifyTokenAndAdmin, getUsers);

//get users for excel thing
router.get("/excel-users", getUsersForExcel);

module.exports = router;
