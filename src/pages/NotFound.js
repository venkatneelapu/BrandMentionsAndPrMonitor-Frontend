import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

import "../styles/dashboard.css";

function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-card">
        <FaExclamationTriangle className="notfound-icon" />

        <h1>404</h1>

        <h2>Page Not Found</h2>

        <p>
          The page you are looking for
          doesn't exist or has been moved.
        </p>

        <Link
          to="/dashboard"
          className="notfound-btn"
        >
          Go To Dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFound;