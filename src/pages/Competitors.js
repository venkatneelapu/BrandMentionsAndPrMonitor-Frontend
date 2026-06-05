import React from "react";
import "../styles/dashboard.css";

function Competitors() {
  const competitors = [
    {
      name: "Tesla",
      mentions: 1248,
      sentiment: "82%",
      risk: "Low",
    },
    {
      name: "BYD",
      mentions: 987,
      sentiment: "76%",
      risk: "Low",
    },
    {
      name: "Rivian",
      mentions: 642,
      sentiment: "69%",
      risk: "Medium",
    },
    {
      name: "Lucid",
      mentions: 411,
      sentiment: "71%",
      risk: "Medium",
    },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Competitor Analysis</h1>

        <p>
          Compare competitors based on
          brand visibility, sentiment,
          engagement, and PR risk levels.
        </p>
      </div>

      <div className="competitor-grid">
        {competitors.map(
          (competitor, index) => (
            <div
              key={index}
              className="competitor-card"
            >
              <div className="competitor-header">
                <h3>
                  {competitor.name}
                </h3>

                <span
                  className={`risk-tag ${
                    competitor.risk ===
                    "Low"
                      ? "risk-low"
                      : "risk-medium"
                  }`}
                >
                  {competitor.risk} Risk
                </span>
              </div>

              <div className="competitor-stats">
                <div className="competitor-stat">
                  <span>
                    Total Mentions
                  </span>

                  <strong>
                    {
                      competitor.mentions
                    }
                  </strong>
                </div>

                <div className="competitor-stat">
                  <span>
                    Positive
                    Sentiment
                  </span>

                  <strong>
                    {
                      competitor.sentiment
                    }
                  </strong>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      <div className="analytics-card competitor-insights">
        <h3>
          AI Competitor Insights
        </h3>

        <ul>
          <li>
            Tesla currently dominates
            online visibility and
            media coverage.
          </li>

          <li>
            BYD is rapidly gaining
            market attention in Asia.
          </li>

          <li>
            Rivian receives more
            customer complaint
            discussions compared to
            competitors.
          </li>

          <li>
            Lucid maintains positive
            sentiment but lower
            overall exposure.
          </li>

          <li>
            Monitor competitor product
            launches for PR
            opportunities.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Competitors;