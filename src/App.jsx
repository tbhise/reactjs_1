import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Users from "./components/Users/Users";
import Login from "./components/login/Login";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LocationAwareApp() {
  const location = useLocation();

  useEffect(() => {
    const classes = [
      "antialiased",
      "flex",
      "h-full",
      "text-base",
      "text-foreground",
      "bg-background",
      "demo1",
      "kt-sidebar-fixed",
      "kt-header-fixed",
    ];

    if (location.pathname === "/") {
      document.body.classList.remove(...classes);
      document.getElementById("root").classList.remove("flex", "grow");
    } else {
      document.body.classList.add(...classes);
      document.getElementById("root").classList.add("flex", "grow");
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      {/* Add other routes here */}
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LocationAwareApp />
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;
