const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    company: {
      type: Schema.Types.Number,
      ref: "Company",
      required: true,
    },
    team: {
      type: Schema.Types.Number,
      ref: "Team",
      default: 1
    },
    villa: {
      type: Boolean,
      default: false,
    },
    shirtSize: {
      type: String,
      default: 'L',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);