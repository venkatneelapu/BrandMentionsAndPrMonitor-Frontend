import React, { useState } from "react";
import { searchMentions } from "../services/api";

import SearchBar from "../components/SearchBar";
import MentionCard from "../components/MentionCard";
import Loader from "../components/Loader";

import "../styles/dashboard.css";

function Mentions() {
  const [loading, setLoading] =
    useState(false);

  const [mentions, setMentions] =
    useState([]);

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

    setLoading(false);
  } catch (error) {
    console.log(error);

    setMentions([]);

    setLoading(false);
  }
};

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>
          Brand Mentions
        </h1>

        <p>
          Discover and monitor
          online brand mentions,
          news articles, press
          releases, reviews, and
          public discussions.
        </p>
      </div>

      <SearchBar
        onSearch={handleSearch}
        loading={loading}
      />

      {loading ? (
        <Loader text="Searching for brand mentions..." />
      ) : (
        <>
          <div className="section-header">
            <h2>
              Mention Results
            </h2>

            <span>
              {mentions.length} Mentions
            </span>
          </div>

          <div className="mentions-grid">
            {mentions.map((item) => (
              <MentionCard
                key={item.id ||item.link}
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

          {!mentions.length && (
            <div className="analytics-card">
              <h3>
                No Mentions Yet
              </h3>

              <p
                style={{
                  color: "#94a3b8",
                  lineHeight:
                    "28px",
                }}
              >
                Search for a brand
                name to start
                monitoring mentions
                across news and web
                sources.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Mentions;