import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaGoogle,
} from "react-icons/fa";

import {
  loginUser,
  googleLoginUrl,
} from "../services/api";

import "../styles/dashboard.css";


function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const response =
        await loginUser(
          formData
        );

      localStorage.setItem(
        "token",
        response.token
      );

      localStorage.setItem(
        "role",
        response.user.role
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          response.user
        )
      );

      if (
        response.user.role ===
        "admin"
      ) {
        navigate("/admin");
      } else {
        navigate(
          "/dashboard"
        );
      }
    } catch (err) {
      setError(
        err?.response?.data
          ?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin =
    () => {
      window.location.href =
        googleLoginUrl;
    };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>
            Welcome Back
          </h1>

          <p>
            Login to your
            Brand Monitor AI
            account
          </p>
        </div>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <form
          onSubmit={
            handleSubmit
          }
          className="auth-form"
        >
          <div className="auth-input-group">
            <FaEnvelope className="auth-icon" />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              required
            />
          </div>

          <div className="auth-input-group">
            <FaLock className="auth-icon" />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={
                formData.password
              }
              onChange={
                handleChange
              }
              required
            />
          </div>

          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading
              ? "Signing In..."
              : "Login"}
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <button
            type="button"
            className="google-btn"
            onClick={handleGoogleLogin}
            >
            <FaGoogle />
            <span>
                Continue with Google
            </span>
        </button>

        <div className="auth-footer">
          <p>
            Don't have an
            account?
          </p>

          <Link to="/signup">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;