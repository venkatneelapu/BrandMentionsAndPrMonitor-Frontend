import React from "react";
import {
  FaExternalLinkAlt,
  FaClock,
} from "react-icons/fa";

import "../styles/cards.css";

function MentionCard({
  title,
  snippet,
  source,
  sentiment,
  publishedAt,
  url,
}) {
  const getSentimentClass = () => {
    switch (
      (sentiment || "").toLowerCase()
    ) {
      case "positive":
        return "sentiment-positive";

      case "negative":
        return "sentiment-negative";

      default:
        return "sentiment-neutral";
    }
  };

  return (
    <div className="mention-card">
      <div className="mention-header">
        <div>
          <h4 className="mention-source">
            {source || "Unknown Source"}
          </h4>

          <div className="mention-date">
            <FaClock />

            <span>
              {publishedAt ||
                "Recently Published"}
            </span>
          </div>
        </div>

        <span
          className={`sentiment-badge ${getSentimentClass()}`}
        >
          {sentiment || "Neutral"}
        </span>
      </div>

      <h3 className="mention-title">
        {title}
      </h3>

      <p className="mention-snippet">
        {snippet}
      </p>

      <div className="mention-footer">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="open-link-btn"
        >
          Open Article

          <FaExternalLinkAlt />
        </a>
      </div>
    </div>
  );
}

export default MentionCard;