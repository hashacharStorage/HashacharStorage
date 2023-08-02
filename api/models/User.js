const mongoose = require("mongoose");
const { Schema } = mongoose;
let AutoIncrement = require("mongoose-sequence")(mongoose);

const UserSchema = new mongoose.Schema(
  {
    warehouse: {
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
      default: 0,
    },
    villa: {
      type: Boolean,
      default: false,
    },
    shirtSize: {
      type: String,
      default: "L",
    },
  },
  { timestamps: true }
);
UserSchema.plugin(AutoIncrement, { inc_field: "user_id", start_seq: 1 });
module.exports = mongoose.model("User", UserSchema);
