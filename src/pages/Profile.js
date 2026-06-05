import React from "react";
import {
  FaUser,
  FaEnvelope,
  FaShieldAlt,
  FaCalendarAlt,
  FaChartLine,
} from "react-icons/fa";

import "../styles/dashboard.css";

function Profile() {
  const user = JSON.parse(
  localStorage.getItem("user")
) || {
  name: "User",
  email: "No Email",
  role: "user",
};

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>My Profile</h1>

        <p>
          Manage your account information and
          view your activity statistics.
        </p>
      </div>

      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-avatar">
            {user.name.charAt(0)}
          </div>

          <h2>{user.name}</h2>

          <span className="profile-role">
            {user.role}
          </span>
        </div>

        <div className="profile-details">
          <div className="analytics-card">
            <h3>Account Information</h3>

            <div className="profile-info">
              <div className="profile-row">
                <FaUser />
                <span>{user.name}</span>
              </div>

              <div className="profile-row">
                <FaEnvelope />
                <span>{user.email}</span>
              </div>

              <div className="profile-row">
                <FaShieldAlt />
                <span>{user.role}</span>
              </div>

              <div className="profile-row">
                <FaCalendarAlt />
                <span>
                  Joined {user.joined}
                </span>
              </div>
            </div>
          </div>

          <div className="analytics-card">
            <h3>Activity Statistics</h3>

            <div className="profile-stats">
              <div className="profile-stat-box">
                <FaChartLine />

                <h2>
                  {user.searches}
                </h2>

                <p>
                  Brand Searches
                </p>
              </div>

              <div className="profile-stat-box">
                <FaChartLine />

                <h2>
                  {user.reports}
                </h2>

                <p>
                  Reports Generated
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;