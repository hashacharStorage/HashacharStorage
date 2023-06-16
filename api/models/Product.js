const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    serial: {
      type: String,
      unique: true,
      required: true,
    },
    desc: {
      type: String,
    },
    companies: [
      {
        type: Schema.Types.Number,
        ref: "Company",
        required: true,
      },
    ],
    image: {
      type: String,
    },
    minQuantity: {
      type: Number,
      default: 1,
    },
    black: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
