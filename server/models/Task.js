const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: "backlog" }, // or use boolean for completed
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
module.exports = mongoose.model("Task", TaskSchema);
