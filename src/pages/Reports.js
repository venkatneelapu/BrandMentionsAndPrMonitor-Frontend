import React from "react";
import "../styles/dashboard.css";

function Reports() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>AI Reports & Insights</h1>

        <p>
          AI-generated executive reports,
          sentiment analysis, risk detection,
          and actionable recommendations.
        </p>
      </div>

      <div className="reports-grid">
        <div className="report-card">
          <div className="report-header">
            <h3>Executive Summary</h3>
          </div>

          <p>
            Brand sentiment remains strongly
            positive this week. Product launches
            and innovation announcements are
            generating significant engagement
            across news and social channels.
          </p>
        </div>

        <div className="report-card">
          <div className="report-header">
            <h3>Sentiment Breakdown</h3>
          </div>

          <div className="sentiment-stats">
            <div className="sentiment-item positive">
              <span>Positive</span>
              <strong>82%</strong>
            </div>

            <div className="sentiment-item neutral">
              <span>Neutral</span>
              <strong>11%</strong>
            </div>

            <div className="sentiment-item negative">
              <span>Negative</span>
              <strong>7%</strong>
            </div>
          </div>
        </div>

        <div className="report-card">
          <div className="report-header">
            <h3>PR Risk Assessment</h3>
          </div>

          <div className="risk-badge low">
            Low Risk
          </div>

          <p>
            No significant reputation threats
            detected. Continue monitoring
            customer complaints and competitor
            campaigns.
          </p>
        </div>

        <div className="report-card">
          <div className="report-header">
            <h3>Trending Topics</h3>
          </div>

          <div className="topics-list">
            <span>AI</span>
            <span>Innovation</span>
            <span>Automation</span>
            <span>Product Launch</span>
            <span>Market Growth</span>
          </div>
        </div>
      </div>

      <div className="analytics-card report-recommendations">
        <h3>AI Recommendations</h3>

        <ul>
          <li>
            Increase promotion of positive
            product launch coverage.
          </li>

          <li>
            Respond quickly to customer
            complaints before escalation.
          </li>

          <li>
            Monitor competitor campaigns for
            market opportunities.
          </li>

          <li>
            Expand media outreach in high
            engagement regions.
          </li>
        </ul>

        <button className="export-btn">
          Export Report
        </button>
      </div>
    </div>
  );
}

export default Reports;