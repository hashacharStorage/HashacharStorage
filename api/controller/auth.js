const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const registerUser = async (req, res) => {
  try {
    //check if email is already exist
    const existingUser = await User.findOne({ email: req.body.email.toLowerCase() });
    if (existingUser) {
      return res.status(400).send({ message: "אימייל כבר קיים במערכת" });
    }
    //check if warehouse number is vacant
    const userWithSameWarehouse = await User.findOne({
      warehouse: req.body.warehouse,
      company: req.body.company,
    });
    if (userWithSameWarehouse) {
      return res.status(400).send({ message: "המחסן תפוס עבור החברה הזאת" });
    }

    const newUser = new User({
      warehouse: req.body.warehouse,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      shirtSize:req.body.shirtSize,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS
      ).toString(),
      company: req.body.company,
    });
    const savedUser = await newUser.save();
    res.status(200).send(savedUser);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email.toLowerCase() });
    if (user === null) {
      res.status(401).json({ msg: "המשתמש אינו קיים" });
      return;
    }
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      res.status(401).json({ msg: "שם משתמש או סיסמא אינם נכונים" });
      return;
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        company: user.company,
      },
      process.env.JWT_SEC
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ others, accessToken });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { registerUser, loginUser };
