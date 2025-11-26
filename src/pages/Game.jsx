import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Game() {
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [bananaImg, setBananaImg] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [answer, setAnswer] = useState("");
    const [message, setMessage] = useState("");
    const [timer, setTimer] = useState(30);
    const [isTimeUp, setIsTimeUp] = useState(false);
    const [canAnswer, setCanAnswer] = useState(true);

    const timerRef = useRef(null);

    useEffect(() => {
        const storedName = localStorage.getItem("user_name");
        if (!storedName) {
            navigate("/login");
            return;
        }
        setUserName(storedName);
        startNewGame();
    }, []);

    useEffect(() => {
        if (timer <= 0 && canAnswer) {
            handleTimeUp();
        }
    }, [timer]);

    const startTimer = () => {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setTimer(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);
    };

    const startNewGame = async () => {
        clearInterval(timerRef.current);
        try {
            setMessage("");
            setAnswer("");
            setTimer(30);
            setIsTimeUp(false);
            setCanAnswer(true);

            const res = await axios.get(import.meta.env.VITE_BANANA_API_URL);

            setBananaImg(res.data.question);
            setCorrectAnswer(res.data.solution);

            console.log(res.data);

            startTimer();
        } catch (err) {
            setMessage("❌ Error loading puzzle.");
        }
    };

    const updateScore = async (correct) => {
        try {
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/edit", {
                user_name: userName,
                correct,
                wrong: !correct,
                points: correct ? 20 : -5
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
        } catch (err) {}
    };

    const handleTimeUp = async () => {
        clearInterval(timerRef.current);
        setIsTimeUp(true);
        setCanAnswer(false);
        setMessage("⏳ Time's up! -5 points");

        await updateScore(false);

        setTimeout(() => {
            startNewGame();
        }, 3000);
    };

    const checkAnswer = async () => {
        if (!canAnswer) return;
        if (!answer.trim()) {
            setMessage("⚠ Enter an answer");
            return;
        }

        clearInterval(timerRef.current);
        setCanAnswer(false);

        if (parseInt(answer) === parseInt(correctAnswer)) {
            setMessage("✅ Correct! +20 points");
            await updateScore(true);
        } else {
            setMessage(`❌ Wrong! Correct: ${correctAnswer} \n-5 points`);
            await updateScore(false);
        }

        setTimeout(() => {
            startNewGame();
        }, 3000);
    };

    const quitGame = async () => {
        if (!canAnswer) return;

        clearInterval(timerRef.current);
        setCanAnswer(false);
        setIsTimeUp(true);
        setMessage("🚪 Game quit! -5 points");

        await updateScore(false);

        setTimeout(() => {
            navigate("/home");
        }, 3000);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>🍌 Banana Game</h1>
            <h2 style={{ color: "yellow" }}>Player: {userName}</h2>
            <h3 style={{ color: timer <= 5 ? "red" : "white" }}>⏳ Time Left: {timer}s</h3>

            {bananaImg && (
                <img
                    src={bananaImg}
                    alt="Puzzle"
                    style={styles.image}
                />
            )}

            <input
                type="number"
                placeholder="Enter your answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                style={styles.input}
                disabled={!canAnswer}
            />

            <div style={{ display: "flex", gap: "10px" }}>
                <button style={styles.btn} onClick={checkAnswer} disabled={!canAnswer}>
                    Submit
                </button>
                <button style={styles.btn2} onClick={quitGame} disabled={!canAnswer}>
                    Quit
                </button>
            </div>

            <h3 style={{ color: "white", textAlign: "center", whiteSpace: "pre-line" }}>
                {message}
            </h3>
        </div>
    );
}

const styles = {
    container: {
        height: "100vh",
        backgroundImage: 'url(/Images/Background/back3.jpg)',
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "40px",
        color: "white",
        textShadow: "2px 2px 4px black",
    },
    title: {
        fontSize: "3rem",
        fontWeight: "bold",
        color: "orange",
    },
    image: {
        width: "700px",
        height: "400px",
        marginTop: "20px",
        borderRadius: "10px",
        boxShadow: "0px 0px 20px rgba(0,0,0,0.7)",
    },
    input: {
        padding: "10px",
        fontSize: "20px",
        marginTop: "20px",
        width: "250px",
        borderRadius: "5px",
        border: "none",
        outline: "none",
        textAlign: "center",
    },
    btn: {
        marginTop: "15px",
        padding: "12px 25px",
        fontSize: "18px",
        backgroundColor: "green",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontWeight: "bold",
    },
    btn2: {
        marginTop: "15px",
        padding: "12px 25px",
        fontSize: "18px",
        backgroundColor: "red",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontWeight: "bold",
    }
};
