import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Settings() {
  const navigate = useNavigate();
  const [selectedAvatar, setSelectedAvatar] = useState("");

  const avatars = [
    "/Images/Avatars/av1.jpg",
    "/Images/Avatars/av2.jpg",
    "/Images/Avatars/av3.jpg",
    "/Images/Avatars/av4.jpg",
    "/Images/Avatars/av5.jpg",
    "/Images/Avatars/av6.jpg",
  ];

  const handleAvatarSelect = (avatar) => setSelectedAvatar(avatar);

  const handleSaveAvatar = () => {
    localStorage.setItem("avatar", selectedAvatar);
    toast.success("Avatar saved successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_name");
    localStorage.removeItem("avatar");

    toast.success("Logout successful!");
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center relative flex flex-col items-center pt-20 text-white"
      style={{ backgroundImage: "url('/Images/Background/back4.jpg')" }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-5 right-5 px-4 py-2 bg-yellow-400 text-black font-bold rounded shadow-lg hover:bg-yellow-300 z-50"
      >
        Back
      </button>

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-orange-400 drop-shadow-lg mb-6 z-10">
        Choose Your Avatar
      </h1>

      {/* Avatar Selection */}
      <div className="flex flex-wrap justify-center gap-6 z-10 bg-black/40 backdrop-blur-md px-6 py-6 rounded-xl shadow-xl border border-white/10">
        {avatars.map((avatar, idx) => (
          <img
            key={idx}
            src={avatar}
            onClick={() => handleAvatarSelect(avatar)}
            className={`w-24 h-24 rounded-full object-cover cursor-pointer transition-all duration-300 shadow-xl hover:shadow-emerald-400
              ${
                selectedAvatar === avatar
                  ? "ring-4 ring-green-400 scale-110 shadow-green-400"
                  : "ring-4 ring-transparent hover:scale-105"
              }
            `}
            alt="avatar"
          />
        ))}
      </div>

      {/* Save Avatar Button */}
      <button
        onClick={handleSaveAvatar}
        className="mt-8 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow-lg z-10"
      >
        Save Avatar
      </button>

      {/* Logout Button - placed FURTHER DOWN */}
      <button
        onClick={handleLogout}
        className="fixed bottom-[50px] mt-20 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg shadow-lg z-10"
      >
        Logout
      </button>
    </div>
  );
}
