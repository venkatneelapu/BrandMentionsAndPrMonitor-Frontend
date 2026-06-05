import React, {
  useEffect,
} from "react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import {
  getCurrentUser,
} from "../services/api";

function LoginSuccess() {
  const navigate =
    useNavigate();

  const [searchParams] =
    useSearchParams();

  useEffect(() => {
    const handleLogin =
      async () => {
        try {
          const token =
            searchParams.get(
              "token"
            );

          if (!token) {
            navigate(
              "/login"
            );
            return;
          }

          localStorage.setItem(
            "token",
            token
          );

          const response =
            await getCurrentUser();

          localStorage.setItem(
            "user",
            JSON.stringify(
              response.user
            )
          );

          localStorage.setItem(
            "role",
            response.user.role
          );

          if (
            response.user
              .role ===
            "admin"
          ) {
            navigate(
              "/admin"
            );
          } else {
            navigate(
              "/dashboard"
            );
          }
        } catch (error) {
          console.error(
            error
          );

          localStorage.removeItem(
            "token"
          );

          localStorage.removeItem(
            "role"
          );

          localStorage.removeItem(
            "user"
          );

          navigate(
            "/login"
          );
        }
      };

    handleLogin();
  }, [
    navigate,
    searchParams,
  ]);

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>
          Logging you in...
        </h2>

        <p>
          Please wait while we
          verify your account.
        </p>
      </div>
    </div>
  );
}

export default LoginSuccess;