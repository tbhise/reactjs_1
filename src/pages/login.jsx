import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email_id: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email: formData.email_id,
        password: formData.password,
      });

      // console.log("Login successful:", response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "userDetails",
        JSON.stringify(response.data.userDetails)
      );
      sessionStorage.setItem("showLoginToast", "false");
      navigate("/home");
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Login failed:", error.response?.data || error.message);
    } finally {
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("showLogOutToast")) {
      toast.success("Logged out successfully..!"); 
      sessionStorage.removeItem("showLogOutToast");
    }
  }, []);

  return (
    <div className="container m-auto ">
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email Id :</label>
              <input
                type="text"
                className="form-control"
                name="email_id"
                value={formData.email_id}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password : </label>
              <input
                type="text"
                name="password"
                className="form-control"
                value={formData.password}
                required
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <button className="btn btn-primary"> Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
