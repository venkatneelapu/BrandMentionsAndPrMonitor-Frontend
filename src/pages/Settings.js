import React, { useEffect, useMemo, useState } from "react";
import { getSettings, saveSettings } from "../services/api";

import "../styles/dashboard.css";

function Settings() {
  const defaultSettings = useMemo(
    () => ({
      emailAlerts: true,
      weeklyReports: true,
      competitorTracking: true,
    }),
    [],
  );

  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const applyDarkModeClass = () => {
    // Only DARK theme.
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
  };

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);
        setError("");

        const resp = await getSettings();
        const backendSettings = resp?.settings || resp;

        if (!mounted) return;
        const next = {
          emailAlerts: backendSettings?.emailAlerts ?? true,
          weeklyReports: backendSettings?.weeklyReports ?? true,
          competitorTracking: backendSettings?.competitorTracking ?? false,
        };

        setSettings(next);
        applyDarkModeClass();
      } catch (e) {
        if (!mounted) return;
        setError(
          e?.response?.data?.message || e.message || "Failed to load settings",
        );
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  const handleToggle = async (key) => {
    const updated = {
      ...settings,
      [key]: !settings[key],
    };

    setSettings(updated);
    setError("");

    // Dark mode is forced (no light mode). Keep toggle value persisted if backend wants it.

    try {
      setSaving(true);
      await saveSettings(updated);

      // Keep local user cache in sync (optional but prevents UI mismatch)
      const localUserRaw = localStorage.getItem("user");
      if (localUserRaw) {
        const localUser = JSON.parse(localUserRaw);
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...localUser,
            ...updated,
          }),
        );
      }
    } catch (e) {
      setError(
        e?.response?.data?.message || e.message || "Failed to save settings",
      );

      // Revert optimistic update
      setSettings(settings);
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");
      await saveSettings(settings);
    } catch (e) {
      setError(
        e?.response?.data?.message || e.message || "Failed to save settings",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Settings</h1>
        <p>
          Configure notifications, monitoring preferences, reports, and account
          settings.
        </p>
      </div>

      <div className="settings-container">
        {error ? (
          <div
            className="analytics-card"
            style={{ marginBottom: 16, color: "#dc2626" }}
          >
            <strong>Error:</strong> {error}
          </div>
        ) : null}

        <div className="analytics-card">
          <h3>Notification Settings</h3>

          <div className="setting-item">
            <div>
              <h4>Email Alerts</h4>
              <p>Receive alerts for negative mentions and PR risks.</p>
            </div>

            <label className="switch">
              <input
                type="checkbox"
                checked={settings.emailAlerts}
                onChange={() => handleToggle("emailAlerts")}
                disabled={loading || saving}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <div>
              <h4>Weekly Reports</h4>
              <p>Receive weekly AI generated reports.</p>
            </div>

            <label className="switch">
              <input
                type="checkbox"
                checked={settings.weeklyReports}
                onChange={() => handleToggle("weeklyReports")}
                disabled={loading || saving}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <div className="analytics-card">
          <h3>Monitoring Settings</h3>

          <div className="setting-item">
            <div>
              <h4>Competitor Tracking</h4>
              <p>Monitor competitor brands automatically.</p>
            </div>

            <label className="switch">
              <input
                type="checkbox"
                checked={settings.competitorTracking}
                onChange={() => handleToggle("competitorTracking")}
                disabled={loading || saving}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <div className="analytics-card">
          <h3>Account Actions</h3>

          <div className="settings-actions">
            <button
              className="settings-btn primary-btn"
              onClick={handleSave}
              disabled={loading || saving}
            >
              {saving ? "Saving..." : "Save Settings"}
            </button>

            <button className="settings-btn danger-btn" disabled>
              Delete Account
            </button>
          </div>

          {loading ? (
            <p style={{ marginTop: 10 }}>Loading settings...</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Settings;
