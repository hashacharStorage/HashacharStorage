const mongoose = require("mongoose");
let AutoIncrement = require("mongoose-sequence")(mongoose);

const FormSchema = new mongoose.Schema(
  {
    formName: {
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
  },
  { timestamps: true }
);
FormSchema.plugin(AutoIncrement, { inc_field: "formID", start_seq: 0 });
module.exports = mongoose.model("Form", FormSchema);
