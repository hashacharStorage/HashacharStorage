const mongoose = require("mongoose");
let AutoIncrement = require("mongoose-sequence")(mongoose);

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
});

CompanySchema.plugin(AutoIncrement, { inc_field: "id", start_seq: 0 });

module.exports = mongoose.model("Company", CompanySchema);
