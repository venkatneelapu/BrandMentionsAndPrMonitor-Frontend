import React, { useState } from "react";

import {
  FaNewspaper,
  FaSmile,
  FaFrown,
  FaShieldAlt,
} from "react-icons/fa";

import SearchBar from "../components/SearchBar";
import StatsCard from "../components/StatsCard";
import MentionCard from "../components/MentionCard";
import Loader from "../components/Loader";
import { searchMentions } from "../services/api";

import "../styles/dashboard.css";

function Dashboard() {
  const [loading, setLoading] =
    useState(false);

  const [mentions, setMentions] =
    useState([]);

  const [stats, setStats] =
  useState({
    total: 0,
    positivePercentage: 0,
    negativePercentage: 0,
    riskLevel: "Low",
  });

const handleSearch = async (
  keyword
) => {
  try {
    setLoading(true);

    const response =
      await searchMentions(
        keyword
      );

    setMentions(
      response.mentions || []
    );

    setStats({
      total:
        response.statistics
          ?.total || 0,

      positivePercentage:
        response.statistics
          ?.positivePercentage ||
        0,

      negativePercentage:
        response.statistics
          ?.negativePercentage ||
        0,

      riskLevel:
        response.statistics
          ?.negativePercentage >
        30
          ? "High"
          : response.statistics
                ?.negativePercentage >
              15
            ? "Medium"
            : "Low",
    });

        setLoading(false);
      } catch (error) {
        console.log(error);

        setLoading(false);
      }
};
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>
          Brand Mentions Dashboard
        </h1>

        <p>
          Monitor mentions, analyze
          sentiment, detect PR risks and
          generate AI-powered insights.
        </p>
      </div>

      <SearchBar
        onSearch={handleSearch}
        loading={loading}
      />

      <div className="stats-grid">
        <StatsCard
          title="Total Mentions"
          value={stats.total}
          icon={<FaNewspaper />}
          trend={18}
          color="blue"
        />

        <StatsCard
          title="Positive Sentiment"
          value={`${stats.positivePercentage}%`}
          icon={<FaSmile />}
          trend={12}
          color="green"
        />

        <StatsCard
          title="Negative Sentiment"
          value={`${stats.negativePercentage}%`}
          icon={<FaFrown />}
          trend={-4}
          color="red"
        />

        <StatsCard
          title="PR Risk Score"
          value={stats.riskLevel}
          icon={<FaShieldAlt />}
          trend={5}
          color="orange"
        />
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="dashboard-section">
            <div className="section-header">
              <h2>
                Recent Brand Mentions
              </h2>

              <span>
                {mentions.length} Results
              </span>
            </div>

            <div className="mentions-grid">
              {mentions.map((item) => (
                <MentionCard
                  key={item._id}
                  title={item.title}
                  snippet={item.snippet}
                  source={item.source}
                  sentiment={
                    item.sentiment
                  }
                  publishedAt={
                    item.publishedAt
                  }
                  url={item.link}
                />
              ))}
            </div>
          </div>

          <div className="analytics-grid">
            <div className="analytics-card">
              <h3>
                Trending Topics
              </h3>

              <div className="topics-list">
                <span>
                  Electric Vehicles
                </span>

                <span>
                  Sustainability
                </span>

                <span>AI</span>

                <span>Market Growth</span>

                <span>
                  Product Launches
                </span>
              </div>
            </div>

            <div className="analytics-card">
              <h3>
                AI Recommendations
              </h3>

              <ul>
                <li>
                  Monitor negative
                  mentions regarding
                  regulations.
                </li>

                <li>
                  Leverage positive EV
                  launch coverage.
                </li>

                <li>
                  Improve PR response
                  time for complaints.
                </li>

                <li>
                  Track competitor
                  campaigns daily.
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;