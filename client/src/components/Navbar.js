import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav
      style={{
        marginBottom: 32,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#1976d2",
            fontWeight: "bold",
            fontSize: 22,
          }}
        >
          Task Manager
        </Link>
      </div>
      <div>
        {token ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: 12 }}>
              Login
            </Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
