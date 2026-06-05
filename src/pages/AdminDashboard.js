import React, {
  useEffect,
  useState,
} from "react";

import {
  FaUsers,
  FaNewspaper,
  FaFileAlt,
  FaExclamationTriangle,
} from "react-icons/fa";

import StatsCard from "../components/StatsCard";

import {
  getUsers,
} from "../services/api";

import "../styles/dashboard.css";

function AdminDashboard() {
  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers =
    async () => {
      try {
        const response =
          await getUsers();

        setUsers(
          response.users || []
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>
          Admin Dashboard
        </h1>

        <p>
          Manage users and
          monitor platform
          activity.
        </p>
      </div>

      <div className="stats-grid">
        <StatsCard
          title="Total Users"
          value={users.length}
          icon={<FaUsers />}
          trend={0}
          color="blue"
        />

        <StatsCard
          title="Total Mentions"
          value="--"
          icon={<FaNewspaper />}
          trend={0}
          color="green"
        />

        <StatsCard
          title="Reports"
          value="--"
          icon={<FaFileAlt />}
          trend={0}
          color="orange"
        />

        <StatsCard
          title="Alerts"
          value="--"
          icon={
            <FaExclamationTriangle />
          }
          trend={0}
          color="red"
        />
      </div>

      <div className="analytics-card">
        <h3>
          Registered Users
        </h3>

        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="3"
                  >
                    Loading...
                  </td>
                </tr>
              ) : users.length ===
                0 ? (
                <tr>
                  <td
                    colSpan="3"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                users.map(
                  (user) => (
                    <tr
                      key={
                        user._id
                      }
                    >
                      <td>
                        {
                          user.name
                        }
                      </td>

                      <td>
                        {
                          user.email
                        }
                      </td>

                      <td>
                        {
                          user.role
                        }
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;