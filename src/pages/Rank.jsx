import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Rank() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [myData, setMyData] = useState(null);

    const limit = 5;

    const fetchLeaderboard = async (page) => {
        try {
            const res = await axios.get(
                import.meta.env.VITE_BACKEND_URL + "/api/user/leaderboard",
                {
                    params: { page, limit },
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );
            setUsers(res.data.output.users);
            setTotalPages(res.data.output.totalPages);
        } catch (err) {
            console.log("Leaderboard Fetch Error:", err);
        }
    };

    const fetchMyRank = async () => {
        try {
            const res = await axios.get(
                import.meta.env.VITE_BACKEND_URL + "/api/user/leaderboard",
                {
                    params: { page: 1, limit: 1000000 },
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );

            const list = res.data.output.users;
            const myName = localStorage.getItem("user_name");
            const mine = list.find((u) => u.user_name === myName);
            if (mine) setMyData(mine);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchLeaderboard(currentPage);
    }, [currentPage]);

    useEffect(() => {
        fetchMyRank();
    }, []);

    return (
        <div
            className="min-h-screen w-full bg-cover bg-center relative"
            style={{ backgroundImage: "url('/Images/Background/back4.jpg')" }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content Wrapper */}
            <div className="relative z-10 max-w-3xl mx-auto px-4 py-10">

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="fixed top-5 right-5 px-4 py-2 bg-yellow-400 text-black font-bold rounded shadow-lg hover:bg-yellow-300"
                >
                    Back
                </button>

                {/* Title */}
                <h1 className="text-center text-5xl font-extrabold mb-10 text-yellow-300 drop-shadow-xl">
                    🏆 Leaderboard 🏆
                </h1>

                {/* Leaderboard List */}
                <div className="space-y-4 min-h-[420px]">
                    {users.map((u, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center bg-black/60 px-6 py-4 rounded-xl shadow-lg text-white"
                        >
                            <span className="text-2xl w-20 font-bold">#{u.rank}</span>
                            <span className="flex-1 text-xl">{u.user_name}</span>
                            <span className="text-xl">{u.score}</span>
                        </div>
                    ))}
                </div>

                {/* Pagination Buttons */}
                <div className="flex justify-center items-center gap-6 mt-10">
                    <button
                        onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg font-bold bg-yellow-400 text-black shadow-md
                        ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-300"}`}
                    >
                        ◀ Prev
                    </button>

                    <span className="text-xl font-semibold">
                        Page {currentPage} / {totalPages}
                    </span>

                    <button
                        onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-lg font-bold bg-yellow-400 text-black shadow-md
                        ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-300"}`}
                    >
                        Next ▶
                    </button>
                </div>

                {/* My Rank Section */}
                {myData && (
                    <div className="mt-12">
                        <h2 className="text-3xl font-bold mb-4 text-center">My Rank</h2>

                        <div className="flex justify-between items-center px-6 py-5 rounded-xl shadow-lg bg-yellow-300/60 font-bold text-black">
                            <span className="text-2xl w-20 font-extrabold">#{myData.rank}</span>
                            <span className="flex-1 text-xl">{myData.user_name}</span>
                            <span className="text-xl">{myData.score}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
