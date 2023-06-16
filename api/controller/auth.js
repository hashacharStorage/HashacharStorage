const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const registerUser = async (req, res) => {
  try {
    const newUser = new User({
      id: req.body.id,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS
      ).toString(),
      company: req.body.company,
    });
    const savedUser = await newUser.save();
    res.status(200).send(savedUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("user not found");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password)
      res.status(401).json("wrong username or password");

    const accessToken = jwt.sign(
      {
        id: user._id,
        company: user.company,
      },
      process.env.JWT_SEC
    );

    const { password, ...others } = user._doc;

    res.status(200).json({others, accessToken});
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { registerUser, loginUser };
