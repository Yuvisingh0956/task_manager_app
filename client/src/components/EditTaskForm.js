import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../redux/taskSlice";
import { toast } from "react-toastify";

export default function EditTaskForm({ task, onClose }) {
  const [form, setForm] = useState({
    title: task.title,
    description: task.description || "",
  });
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateTask({ id: task._id, data: form })).unwrap();
    toast.success("Task updated!");
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 12 }}>
      <input
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="Title"
        required
      />
      <input
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        placeholder="Description"
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onClose} style={{ marginLeft: 8 }}>
        Cancel
      </button>
    </form>
  );
}
