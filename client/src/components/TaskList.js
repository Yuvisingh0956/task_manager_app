import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTaskStatus, deleteTask } from "../redux/taskSlice";
import EditTaskForm from "./EditTaskForm";
import { toast } from "react-toastify";

const statusLabels = {
  backlog: "Backlog",
  "in-progress": "In Progress",
  done: "Done",
};

export default function TaskList() {
  const tasks = useSelector((state) => state.tasks.items);
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);

  if (!tasks.length)
    return (
      <p style={{ color: "#888", textAlign: "center" }}>
        No tasks yet. Add one!
      </p>
    );

  return (
    <ul>
      {tasks.map((task) => (
        <li className="task-item" key={task._id}>
          {editingId === task._id ? (
            <EditTaskForm task={task} onClose={() => setEditingId(null)} />
          ) : (
            <>
              <div>
                <span className={`status ${task.status}`}>
                  {statusLabels[task.status]}
                </span>
                <b>{task.title}</b>
                {task.description && (
                  <span style={{ color: "#666", marginLeft: 8 }}>
                    {task.description}
                  </span>
                )}
              </div>
              <div className="task-actions">
                <button
                  style={{
                    background: "#fff",
                    color: "#1976d2",
                    border: "1px solid #1976d2",
                  }}
                  onClick={() => dispatch(toggleTaskStatus(task._id))}
                  title="Toggle Status"
                  aria-label="Toggle Status"
                >
                  ↻ Status
                </button>
                <button
                  style={{
                    background: "#fff",
                    color: "#388e3c",
                    border: "1px solid #388e3c",
                  }}
                  onClick={() => setEditingId(task._id)}
                  title="Edit Task"
                  aria-label="Edit Task"
                >
                  ✏️ Edit
                </button>
                <button
                  style={{
                    background: "#fff",
                    color: "#d32f2f",
                    border: "1px solid #d32f2f",
                  }}
                  onClick={() => {
                    dispatch(deleteTask(task._id));
                    toast.success("Task deleted!");
                  }}
                  title="Delete Task"
                  aria-label="Delete Task"
                >
                  🗑️
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
