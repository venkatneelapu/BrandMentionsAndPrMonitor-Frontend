import React, { useEffect, useState } from "react";

import { FaBell, FaUserCircle, FaSignOutAlt, FaCog } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("role");

    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>Brand Monitor AI</h2>

        <p>AI-Powered Brand Intelligence Platform</p>
      </div>

      <div className="navbar-right">
        <button
          className="notification-btn"
          onClick={() => navigate("/reports")}
          aria-label="Notifications"
          title="Notifications"
        >
          <FaBell />
          <span className="notification-dot"></span>
        </button>

        <div className="user-dropdown">
          <button className="user-btn" onClick={() => setShowMenu(!showMenu)}>
            {user?.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="Profile"
                className="user-avatar"
              />
            ) : (
              <FaUserCircle />
            )}

            <div className="user-info">
              <span>{user?.name || "User"}</span>

              <small>{user?.role || "User"}</small>
            </div>
          </button>

          {showMenu && (
            <div className="dropdown-menu">
              <button onClick={() => navigate("/profile")}>
                <FaUserCircle />
                Profile
              </button>

              <button onClick={() => navigate("/settings")}>
                <FaCog />
                Settings
              </button>

              <button onClick={handleLogout}>
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
