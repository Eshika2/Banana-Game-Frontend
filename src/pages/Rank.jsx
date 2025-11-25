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
            setCurrentPage(res.data.output.currentPage);
            setTotalPages(res.data.output.totalPages);
        } catch (err) {
            console.log("Leaderboard Fetch Error:", err);
        }
    };

    const fetchMyRank = async () => {
        try {
            const res = await axios.get(
                import.meta.env.VITE_BACKEND_URL + "/api/user/leaderboard",
                { params: { page: 1, limit: 1000000 }, headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
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
        fetchMyRank();
    }, []);

    const nextPage = () => {
        if (currentPage < totalPages) fetchLeaderboard(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) fetchLeaderboard(currentPage - 1);
    };

    return (
        <div style={styles.container}>
            {/* Back Button */}
            <button onClick={() => navigate(-1)} style={styles.backButton}>
                ◀ Back
            </button>

            <h1 style={styles.title}>🏆 Leaderboard</h1>

            <div style={styles.listContainer}>
                {users.map((u, index) => (
                    <div key={index} style={styles.row}>
                        <span style={styles.rank}>#{u.rank}</span>
                        <span style={styles.name}>{u.user_name}</span>
                        <span style={styles.score}>{u.score}</span>
                    </div>
                ))}
            </div>

            {/* Pagination Buttons */}
            <div style={styles.pagination}>
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    style={{ ...styles.button, opacity: currentPage === 1 ? 0.5 : 1 }}
                >
                    ◀ Prev
                </button>
                <span style={styles.pageText}>
                    Page {currentPage} / {totalPages}
                </span>
                <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    style={{ ...styles.button, opacity: currentPage === totalPages ? 0.5 : 1 }}
                >
                    Next ▶
                </button>
            </div>

            {/* My Rank Section at bottom */}
            {myData && (
                <div style={styles.mySection}>
                    <h2 style={{ marginBottom: "20px" }}>📌 My Rank</h2>
                    <div style={styles.myRow}>
                        <span style={styles.rank}>#{myData.rank}</span>
                        <span style={styles.name}>{myData.user_name}</span>
                        <span style={styles.score}>{myData.score}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        padding: "20px",
        backgroundImage: "url(/Images/Background/back3.jpg)",
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        textShadow: "2px 2px 4px black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        position: "relative",
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
        fontSize: "3rem",
        fontWeight: "bold",
        marginBottom: "20px",
        color: "yellow",
    },
    listContainer: {
        width: "80%",
        margin: "auto",
        flex: 1,
    },
    row: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(0,0,0,0.5)",
        padding: "12px 20px",
        marginBottom: "10px",
        borderRadius: "10px",
        boxShadow: "0 0 10px black",
    },
    myRow: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(255,215,0,0.3)",
        padding: "15px 20px",
        borderRadius: "10px",
        boxShadow: "0 0 15px black",
        fontWeight: "bold",
    },
    rank: { fontSize: "1.5rem", width: "70px" },
    name: { flex: 1, fontSize: "1.3rem" },
    score: { fontSize: "1.3rem" },
    pagination: {
        marginTop: "20px",
        marginBottom: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
    },
    button: {
        padding: "10px 20px",
        borderRadius: "8px",
        background: "yellow",
        color: "black",
        fontSize: "1rem",
        cursor: "pointer",
        border: "none",
        fontWeight: "bold",
    },
    pageText: { fontSize: "1.2rem" },
    mySection: {
        marginTop: "auto",
        textAlign: "center",
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
    },
};
