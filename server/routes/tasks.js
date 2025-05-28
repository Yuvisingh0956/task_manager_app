const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Task = require("../models/Task");

// Get all tasks for user
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
});

// Create task
router.post("/", auth, async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({ title, description, user: req.user.id });
  await task.save();
  res.json(task);
});

// Update task
router.put("/:id", auth, async (req, res) => {
  const { title, description, status } = req.body;
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    { title, description, status },
    { new: true }
  );
  res.json(task);
});

// Toggle status
router.patch("/:id/status", auth, async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
  if (!task) return res.status(404).json({ msg: "Task not found" });
  // Simple toggle logic: backlog -> in-progress -> done -> backlog
  const statusOrder = ["backlog", "in-progress", "done"];
  const nextStatus =
    statusOrder[(statusOrder.indexOf(task.status) + 1) % statusOrder.length];
  task.status = nextStatus;
  await task.save();
  res.json(task);
});

// Delete task
router.delete("/:id", auth, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ msg: "Task deleted" });
});

module.exports = router;
