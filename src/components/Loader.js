import React from "react";
import { FaRobot } from "react-icons/fa";

import "../styles/dashboard.css";

function Loader({
  text = "AI Agent is analyzing brand mentions...",
}) {
  return (
    <div className="loader-container">
      <div className="loader-card">
        <div className="loader-wrapper">
          <div className="loader-ring"></div>

          <div className="loader-icon">
            <FaRobot />
          </div>
        </div>

        <h2 className="loader-title">
          AI Monitoring Engine
        </h2>

        <p className="loader-text">
          {text}
        </p>

        <div className="loader-progress">
          <div className="loader-progress-bar"></div>
        </div>

        <div className="loader-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default Loader;