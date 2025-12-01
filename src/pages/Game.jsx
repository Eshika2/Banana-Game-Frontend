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
            setMessage("Error loading puzzle.");
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
        } catch (err) {
            console.log("Error updating score:", err);
        }
    };

    const handleTimeUp = async () => {
        clearInterval(timerRef.current);
        setIsTimeUp(true);
        setCanAnswer(false);
        setMessage("⏳ Time's up! -5 points ⏳");

        await updateScore(false);

        setTimeout(() => {
            startNewGame();
        }, 3000);
    };

    const checkAnswer = async () => {
        if (!canAnswer) return;
        if (!answer.trim()) {
            setMessage("⚠️ Enter an answer ⚠️");
            return;
        }

        clearInterval(timerRef.current);
        setCanAnswer(false);

        if (parseInt(answer) === parseInt(correctAnswer)) {
            setMessage("✅ Correct ✅  \n +20 points");
            await updateScore(true);
        } else {
            setMessage(`❌ Wrong! ❌ \n Correct Answer: ${correctAnswer} \n -5 points`);
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
        setMessage("👋 Game quit 👋 \n -5 points");

        await updateScore(false);

        setTimeout(() => {
            navigate("/home");
        }, 3000);
    };

    return (
        <div
            className="
                w-full h-screen flex flex-col items-center pt-10 
                bg-cover bg-center text-white relative
            "
            style={{ backgroundImage: "url('/Images/Background/back4.jpg')" }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative z-10 text-center">
                <h1 className="text-7xl font-extrabold text-yellow-400 drop-shadow-lg">
                    Banana Game
                </h1>
                <h2 className="text-4xl mt-2">Player: <span className="text-yellow-300">{userName}</span></h2>

                <h3
                    className={`
                        text-xl mt-4 font-bold 
                        ${timer <= 5 ? "text-red-600 animate-pulse" : "text-white"}
                    `}
                >
                    ⏳ Time Left: {timer}s ⏳
                </h3>

                {bananaImg && (
                    <img
                        src={bananaImg}
                        alt="Puzzle"
                        className="
                            w-[700px] h-[400px] mt-5 rounded-lg shadow-xl 
                            border border-white/30 bg-black/20
                        "
                    />
                )}

                <input
                    type="number"
                    placeholder="Enter your answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    disabled={!canAnswer}
                    className="
                        mt-6 p-3 w-64 text-white text-xl rounded-md text-center
                        outline-none border-2 border-yellow-400 focus:border-yellow-300
                        disabled:bg-gray-400 disabled:cursor-not-allowed
                    "
                />

                <div className="flex gap-4 mt-5 justify-center">
                    <button
                        onClick={checkAnswer}
                        disabled={!canAnswer}
                        className="
                            bg-green-600 hover:bg-green-700 active:scale-95 
                            px-6 py-2 rounded-lg text-lg font-semibold shadow-md
                            disabled:bg-gray-500 disabled:cursor-not-allowed
                        "
                    >
                        Submit
                    </button>

                    <button
                        onClick={quitGame}
                        disabled={!canAnswer}
                        className="
                            bg-red-600 hover:bg-red-700 active:scale-95 
                            px-6 py-2 rounded-lg text-lg font-semibold shadow-md
                            disabled:bg-gray-500 disabled:cursor-not-allowed
                        "
                    >
                        Quit
                    </button>
                </div>

                <h3 className="mt-6 text-2xl whitespace-pre-line text-yellow-300 font-bold drop-shadow-lg">
                    {message}
                </h3>
            </div>
        </div>
    );
}
