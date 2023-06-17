const mongoose = require("mongoose");
const { Schema } = mongoose;
let AutoIncrement = require("mongoose-sequence")(mongoose);

const ProductSchema = new mongoose.Schema(
  {

    title: {
      type: String,
      required: true,
    },
    serial: {
      type: String,
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
    isBlack: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

ProductSchema.plugin(AutoIncrement, { inc_field: "product_id", start_seq: 0 });

module.exports = mongoose.model("Product", ProductSchema);
