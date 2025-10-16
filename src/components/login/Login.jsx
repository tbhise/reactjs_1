import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [formData, setFormDate] = useState({
    email_id: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormDate((prevData) => ({
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

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "userDetails",
        JSON.stringify(response.data.userDetails)
      );
      sessionStorage.setItem("showLoginToast", "true");
      navigate("/dashboard");
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
    <>
      <div
        className="container-fluid h-screen flex"
        style={{
          backgroundImage: "url(../images/bg-10.png)",
        }}
      >
        <div className="flex items-center justify-center grow bg-center bg-no-repeat page-bg">
          <div className="kt-card max-w-[370px] w-full">
            <form
              onSubmit={handleSubmit}
              className="kt-card-content flex flex-col gap-5 p-10"
            >
              <div className="flex flex-col gap-1">
                <label className="kt-form-label font-normal text-mono">
                  Email
                </label>
                <input
                  className="kt-input"
                  placeholder="email@email.com"
                  type="text"
                  value={formData.email_id}
                  onChange={handleChange}
                  name="email_id"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-1">
                  <label className="kt-form-label font-normal text-mono">
                    Password
                  </label>
                </div>
                <div className="kt-input" data-kt-toggle-password="true">
                  <input
                    name="password"
                    placeholder="Enter Password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    className="kt-btn kt-btn-sm kt-btn-ghost kt-btn-icon bg-transparent! -me-1.5"
                    data-kt-toggle-password-trigger="true"
                    type="button"
                  >
                    <span className="kt-toggle-password-active:hidden">
                      <i className="ki-filled ki-eye text-muted-foreground"></i>
                    </span>
                    <span className="hidden kt-toggle-password-active:block">
                      <i className="ki-filled ki-eye-slash text-muted-foreground"></i>
                    </span>
                  </button>
                </div>
              </div>
              <label className="kt-label">
                <input
                  className="kt-checkbox kt-checkbox-sm"
                  name="check"
                  type="checkbox"
                  value="1"
                />
                <span className="kt-checkbox-label">Remember me</span>
              </label>
              <button className="kt-btn kt-btn-primary flex justify-center grow">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
