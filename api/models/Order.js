const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    UserID: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    status:{
        type:String,
        default: "ההזמנה הגיעה למחסן"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
