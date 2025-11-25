import React from "react";

export default function Instructions() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundImage: "url(/Images/Background/back3.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        textShadow: "2px 2px 4px black",
      }}
    >
      <h1 style={{ color: "yellow", fontSize: "3rem", marginBottom: "20px" }}>
        🍌 How to Play
      </h1>

      <div
        style={{
          maxWidth: "650px",
          background: "rgba(0,0,0,0.65)",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 0 20px black",
          fontSize: "1.15rem",
          lineHeight: "1.9",
        }}
      >
        <ol>
          <li>
            Start by creating an account with your email and password. Once you
            sign up, you can log in anytime to continue your progress.
          </li>

          <li>
            Head over to the <b>Play</b> page to begin. A banana image will
            appear, and your job is simple — guess the correct number or answer
            related to the banana shown.
          </li>

          <li>
            Every round has a countdown timer. Try to answer before it reaches
            zero!  
            <b>
              If the time runs out, don’t worry — the game automatically loads a
              brand-new banana and starts the next round.
            </b>
          </li>

          <li>
            Your score increases or decreases based on how you play:
            <ul style={{ marginTop: "10px" }}>
              <li>✔ Correct answer: <b>+20 points</b></li>
              <li>❌ Wrong answer: <b>-5 points</b></li>
              <li>⬆ Reaching Level 2: <b>+100 bonus</b></li>
              <li>⬆ Unlocking higher levels: <b>+300 bonus</b></li>
            </ul>
            The better you play, the faster you level up.
          </li>

          <li>
            The <b>Leaderboard</b> shows how you rank among all players. Your
            rank updates instantly based on your current score.
          </li>

          <li>
            Visit <b>My Profile</b> to see your level, total score, rank and more.
          </li>

          <li>
            Your progress is always saved, so you can log out and come back
            later without losing anything.
          </li>
        </ol>
      </div>

      <button
        style={{
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
        }}
        onClick={() => window.history.back()}
      >
        ⬅ Back
      </button>
    </div>
  );
}
