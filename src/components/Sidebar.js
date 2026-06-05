import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaChartLine,
  FaNewspaper,
  FaFileAlt,
  FaUsers,
  FaCog,
  FaRobot,
} from "react-icons/fa";

import "../styles/sidebar.css";

function Sidebar() {
  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <FaChartLine />,
    },
    {
      title: "Brand Mentions",
      path: "/mentions",
      icon: <FaNewspaper />,
    },
    {
      title: "AI Reports",
      path: "/reports",
      icon: <FaFileAlt />,
    },
    {
      title: "Competitors",
      path: "/competitors",
      icon: <FaUsers />,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: <FaCog />,
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <FaRobot />
        </div>

        <div>
          <h2>Brand AI</h2>
          <p>PR Intelligence</p>
        </div>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >
            <span>{item.icon}</span>
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <h4>AI Monitoring Active</h4>

        <p>
          Tracking brand mentions, news,
          sentiment trends and PR risks
          in real time.
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;