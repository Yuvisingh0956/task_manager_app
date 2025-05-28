import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../redux/taskSlice";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Spinner from "../components/Spinner";

export default function Dashboard() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) dispatch(fetchTasks());
  }, [dispatch, token]);

  return (
    <div>
      <Navbar />
      <div className="app-container">
        <TaskForm />
        <TaskList />
      </div>
    </div>
  );
}
