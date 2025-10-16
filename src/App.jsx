import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
  NavLink,
} from "react-router-dom";
import Login from "./pages/login";
import Users from "./components/users";
import Home from "./components/home";
import PrivateRoute from "./components/privateRoute";
function App() {
  return (
    <>
      <Router>
        <AppContent />
      </Router>
    </>
  );
}
function AppContent() {
  const location = useLocation();
  const hideNavbarPaths = ["/login"];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);
  const [fullName, setFullName] = useState("");
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (userDetails && userDetails.fullName) {
      setFullName(userDetails.fullName);
    }
  }, [location.pathname]);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    sessionStorage.setItem("showLogOutToast", true);
    navigate("/login");
  };
  return (
    <div>
      {!shouldHideNavbar && (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/home">
              Laravel
            </Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                <li className="nav-item ">
                  <NavLink
                    to="/home"
                    end
                    className={({ isActive }) =>
                      isActive ? "nav-link active text-white" : "text-white nav-link"
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/users"
                    end
                    className={({ isActive }) =>
                      isActive ? "nav-link active text-white" : " text-white nav-link"
                    }
                  >
                    Users
                  </NavLink>
                </li>
              </ul>
            </div>
            <span className="navbar-brand">{fullName}</span>
            <span className="navbar-icon">
              <button className="btn btn-sm btn-link" onClick={handleLogout}>
                <MdLogout size={20} color="white" />{" "}
              </button>
            </span>
          </div>
        </nav>
      )}
      <div className="container-fluid mt-4 ">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}
export default App;
