import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaGoogle,
} from "react-icons/fa";

import {
  signupUser,
  googleLoginUrl,
} from "../services/api";

import "../styles/dashboard.css";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
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

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError(
        "Passwords do not match"
      );
      return;
    }

    if (
      formData.password.length <
      6
    ) {
      setError(
        "Password must be at least 6 characters"
      );
      return;
    }

    try {
      setLoading(true);

      const response =
        await signupUser({
          name: formData.name,
          email:
            formData.email,
          password:
            formData.password,
        });

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

      navigate(
        "/dashboard"
      );
    } catch (err) {
      setError(
        err?.response?.data
          ?.message ||
          "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup =
    () => {
      window.location.href =
        googleLoginUrl;
    };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>
            Create Account
          </h1>

          <p>
            Join Brand Monitor AI
            and start tracking
            your brand reputation
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
            <FaUser className="auth-icon" />

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={
                formData.name
              }
              onChange={
                handleChange
              }
              required
            />
          </div>

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

          <div className="auth-input-group">
            <FaLock className="auth-icon" />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={
                formData.confirmPassword
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
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <button
            type="button"
            className="google-btn"
            onClick={handleGoogleSignup}
            >
            <FaGoogle />
            <span>
                Continue with Google
            </span>
        </button>

        <div className="auth-footer">
          <p>
            Already have an
            account?
          </p>

          <Link to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;