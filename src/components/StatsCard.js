import React from "react";
import {
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

import "../styles/cards.css";

function StatsCard({
  title,
  value,
  icon,
  trend = 0,
  color = "blue",
}) {
  const isPositive = trend >= 0;

  return (
    <div className="stats-card">
      <div className="stats-card-top">
        <div
          className={`stats-icon ${color}`}
        >
          {icon}
        </div>

        <div
          className={`trend ${
            isPositive
              ? "positive-trend"
              : "negative-trend"
          }`}
        >
          {isPositive ? (
            <FaArrowUp />
          ) : (
            <FaArrowDown />
          )}

          <span>
            {Math.abs(trend)}%
          </span>
        </div>
      </div>

      <div className="stats-card-body">
        <h4>{title}</h4>

        <h2>{value}</h2>
      </div>
    </div>
  );
}

export default StatsCard;