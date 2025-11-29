import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        console.log("Error:", err);
      }
    };

    fetchProfile();
  }, []);

  if (!userData) return <div>Loading...</div>;

  const formatDate = (d) => new Date(d).toLocaleDateString();

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/Images/Background/back4.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10">

        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 right-5 px-4 py-2 bg-yellow-400 text-black font-bold rounded shadow-lg hover:bg-yellow-300"
        >
          Back
        </button>

        <div className="max-w-3xl mx-auto px-6 pt-20 pb-10 text-white">
          <h1 className="text-center text-5xl font-extrabold text-orange-400 drop-shadow-lg mb-10">
            My Profile
          </h1>

          <div className="flex flex-col sm:flex-row items-center gap-6 bg-black/60 p-6 rounded-xl shadow-xl">
            <img
              src={userData.profile_img}
              alt="Avatar"
              className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
            />

            <div className="text-lg space-y-1">
              <p><span className="font-bold text-red-500">Username:</span> {userData.user_name}</p>
              <p><span className="font-bold text-red-500">Email:</span> {userData.email}</p>
              <p><span className="font-bold text-red-500">Member Since:</span> {formatDate(userData.created_at)}</p>
            </div>
          </div>

          <div className="mt-10 bg-black/60 p-6 rounded-xl shadow-lg">
            <h2 className="text-center text-2xl font-bold mb-4">Game Statistics</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <StatBox title="Level" value={userData.level} />
              <StatBox title="Rank" value={userData.rank} />
              <StatBox title="Score" value={userData.score} />
              <StatBox title="Highest Score" value={userData.heighest_score} />
              <StatBox title="Games Played" value={userData.total_match_count} />
              <StatBox title="Correct Answers" value={userData.total_correct_answer_count} />
              <StatBox title="Wrong Answers" value={userData.total_wrong_answer_count} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

function StatBox({ title, value }) {
  return (
    <div className="bg-white/5 p-4 rounded-lg text-center font-bold shadow-md backdrop-blur-sm">
      <p className="text-lg text-red-500">{title}</p>
      <p className="text-2xl mt-1">{value}</p>
    </div>
  );
}
