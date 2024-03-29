const User = require("../models/User");
const Order = require("../models/Order");
const CryptoJS = require("crypto-js")
const updateUserInfo = async (req, res) => {

  if (req.body.password) {

    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS
    ).toString();
  }


  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

//delete user
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Delete the user's orders
    await Order.deleteMany({ userId: userId });
    await User.findOneAndDelete({ user_id: userId });

    res.status(200).json("User has been deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};


//get user
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
};

//get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

//excel thingy
const getUsersForExcel = async (req, res) => {
  try {
    const users = await User.find({company:1});
    const extractedData = users.map(user => ({
      firstname: user.firstname,
      lastname: user.lastname,
      warehouse: user.warehouse
    }));

    res.status(200).json(extractedData);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { updateUserInfo, deleteUser, getUser, getUsers,getUsersForExcel };
