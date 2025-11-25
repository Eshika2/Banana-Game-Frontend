import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/user/auth/data",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          const user = res.data.output;
          user.profile_img = localStorage.getItem("avatar");
          setUserData(user);
        }
      } catch (err) {
        console.log("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

  return (
    <div style={styles.container}>
      {/* Back Button */}
      <button style={styles.backButton} onClick={() => navigate(-1)}>
        ◀ Back
      </button>

      <h1 style={styles.title}>My Profile</h1>

      {/* Profile Information */}
      <div style={styles.profileInfo}>
        <img
          src={userData.profile_img}
          alt="Avatar"
          style={styles.avatar}
        />
        <div style={styles.infoText}>
          <p><strong>Username:</strong> {userData.user_name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Member Since:</strong> {formatDate(userData.created_at)}</p>
        </div>
      </div>

      {/* Game Statistics */}
      <div style={styles.statsContainer}>
        <h2>Game Statistics</h2>
        <div style={styles.statsGrid}>
          <div style={styles.statBox}>
            <p><strong>Level</strong></p>
            <p>{userData.level}</p>
          </div>
          <div style={styles.statBox}>
            <p><strong>Rank</strong></p>
            <p>{userData.rank}</p>
          </div>
          <div style={styles.statBox}>
            <p><strong>Score</strong></p>
            <p>{userData.score}</p>
          </div>
          <div style={styles.statBox}>
            <p><strong>Highest Score</strong></p>
            <p>{userData.heighest_score}</p>
          </div>
          <div style={styles.statBox}>
            <p><strong>Games Played</strong></p>
            <p>{userData.total_match_count}</p>
          </div>
          <div style={styles.statBox}>
            <p><strong>Correct Answers</strong></p>
            <p>{userData.total_correct_answer_count}</p>
          </div>
          <div style={styles.statBox}>
            <p><strong>Wrong Answers</strong></p>
            <p>{userData.total_wrong_answer_count}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    minHeight: "100vh",
    backgroundImage: "url(/Images/Background/back3.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
    textShadow: "1px 1px 2px black",
  },
  backButton: {
    position: "absolute",
    top: "20px",
    right: "20px",
    padding: "10px 20px",
    background: "yellow",
    color: "black",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  title: {
    textAlign: "center",
    fontSize: "2.5rem",
    marginBottom: "30px",
    color: "orange",
  },
  profileInfo: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "40px",
    background: "rgba(0,0,0,0.5)",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px black",
  },
  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    border: "3px solid white",
    objectFit: "cover",
  },
  infoText: {
    fontSize: "1.1rem",
    lineHeight: "1.5",
  },
  statsContainer: {
    background: "rgba(0,0,0,0.5)",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px black",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    marginTop: "20px",
  },
  statBox: {
    background: "rgba(255, 215, 0, 0.2)",
    padding: "15px",
    borderRadius: "10px",
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    boxShadow: "0 0 5px black",
  },
};
