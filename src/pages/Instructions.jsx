import React from "react";
import { useNavigate } from "react-router-dom";

export default function Instructions() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white relative flex flex-col items-center px-5"
      style={{ backgroundImage: "url('/Images/Background/back4.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <button
        onClick={() => navigate(-1)}
        className="absolute top-5 right-5 px-4 py-2 bg-yellow-400 text-black font-bold rounded shadow hover:bg-yellow-300 z-10"
      >
        Back
      </button>

      <div className="relative z-10 w-full max-w-3xl pt-20 pb-10 flex flex-col items-center">
        <h1 className="text-yellow-300 text-4xl sm:text-5xl font-extrabold drop-shadow-lg mb-8">
          How to Play ?
        </h1>

        <div className="bg-black/60 p-6 sm:p-8 rounded-xl shadow-xl text-lg leading-relaxed backdrop-blur-sm">
          <ol className="list-decimal list-inside space-y-5">
            
            <li>
              Start by creating an account with your email and password. Once you
              sign up, you can log in anytime to continue your progress.
            </li>

            <li>
              Head over to the <b>Play</b> page to begin. A banana image will
              appear and your job is to type the correct number
              related to the banana shown.
            </li>

            <li>
              Every round has a countdown timer. Try to answer before it reaches
              zero.{" "}
              <b>
                If the time runs out, the game automatically loads a new banana
                and starts the next round.
              </b>
            </li>

            <li>
              Your score changes based on how you play:
              <ul className="list-disc list-inside mt-3 space-y-1 ml-8">
                <li>✅ Correct answer: <b>+20 points</b></li>
                <li>❌ Wrong answer: <b>-5 points</b></li>
                <li>⬆️ Level 2: <b>+100 bonus</b></li>
                <li>⬆️ Level 3: <b>+200 bonus</b></li>
                <li>⬆️ Higher levels: <b>+300 bonus</b></li>
              </ul>
            </li>

            <li>
              The <b>Leaderboard</b> shows how you rank among all players and updates instantly.
            </li>

            <li>
              Visit <b>My Profile</b> to view your level, score, rank and stats.
            </li>

            <li>
              Your progress is automatically saved and you can log out anytime and return without losing a thing.
            </li>

          </ol>
        </div>
      </div>
    </div>
  );
}
