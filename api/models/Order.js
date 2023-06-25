const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: Number,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    status: {
      type: String,
      default: "ההזמנה הגיעה למחסן",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
