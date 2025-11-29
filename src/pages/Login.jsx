import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import toast from "react-hot-toast";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleSubmit() {
        const emailError = validateEmail(email);
        if (emailError) {
            toast.error(emailError);
            return;
        }

        try { 
            await axios.post(import.meta.env.VITE_BACKEND_URL +  "/api/user/auth/login", {
                email : email,
                password : password
            })
            .then(
                (response)=>{
                    // console.log("Login Successfull", response.data);

                    toast.success(response.data.message || "Login Successfull");

                    localStorage.setItem("token", response.data.output.token);
                    // console.log(response.data.output.token);

                    const user_name = response.data.output.user_name || email.split("@")[0];
                    localStorage.setItem("user_name", user_name);

                    const defaultAvatar = "/Images/Avatars/default_avatar.png";
                    const storedAvatar = localStorage.getItem("avatar") || defaultAvatar;
                    localStorage.setItem("avatar", storedAvatar);

                    navigate("/home");
                }
            )
            .catch(
                (error)=>{
                    console.log("Login Failed", error);
                    toast.error(error.response.data.message || "Login Failed");
                }
            );
        } catch (err) {
            console.error(err);
            if (err.response?.data?.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        }
    };

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return "Please enter a valid email address";
        }

        return null;
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('/Images/Background/back1.jpg')" }}
        >
            <div className="backdrop-blur-2xl bg-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/30">
                <h2 className="text-4xl font-bold text-black text-center mb-6">
                    Login
                </h2>

                <div className="space-y-4">
                    <div>
                        <label className="text-white font-medium">Email</label>
                        <input
                            type="text"
                            className="w-full mt-1 p-3 rounded-xl bg-white/80 focus:ring-2 focus:ring-yellow-500 outline-none"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-white font-medium">Password</label>
                        <input
                            type="password"
                            className="w-full mt-1 p-3 rounded-xl bg-white/80 focus:ring-2 focus:ring-yellow-500 outline-none"
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full mt-3 p-3 rounded-xl bg-green-600 hover:bg-green-700 text-white py-3 font-semibold transition cursor"
                    >
                        Login
                    </button>
                </div>

                <p className="text-center text-white mt-4">
                    Don't have an account?{" "}
                    <Link className="text-yellow-300 font-semibold hover:underline" to="/signup">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
