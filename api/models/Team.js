const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let AutoIncrement = require("mongoose-sequence")(mongoose);

const TeamSchema = new Schema({
  name: { type: String, required: true },
});

TeamSchema.plugin(AutoIncrement, { id:'Team_id_seq',inc_field: "id", start_seq: 0 });

module.exports = mongoose.model("Team", TeamSchema);