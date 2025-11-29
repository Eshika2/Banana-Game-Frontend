import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import toast from "react-hot-toast";

export default function Signup() {
    const [user_name, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleSubmit() {
        const emailError = validateEmail(email);
        if (emailError) {
            toast.error(emailError);
            return;
        }

        const passwordError = validatePassword(password);
        if (passwordError) {
            toast.error(passwordError);
            return;
        }

        try {
            const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/auth/register", {
                email : email,
                user_name : user_name,
                password : password
            });

            if (res.data.success) {
                toast.success(res.data.message || "Registration successful");
                navigate("/login");
            } else {
                toast.error(res.data.message || "Registration failed");
            }
        } catch (err) {
            console.error(err);
            if (err.response?.data?.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        }
    };

    function validatePassword(password) {
        const minLength = /.{8,}/;
        const upperCase = /[A-Z]/;
        const lowerCase = /[a-z]/;
        const number = /[0-9]/;
        const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

        if (!minLength.test(password)) return "Password must be at least 8 characters long";
        if (!upperCase.test(password)) return "Password must contain at least one uppercase letter";
        if (!lowerCase.test(password)) return "Password must contain at least one lowercase letter";
        if (!number.test(password)) return "Password must contain at least one number";
        if (!specialChar.test(password)) return "Password must include at least one special character";

        return null;
    }

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
                    Create Account
                </h2>

                <div className="space-y-4">
                    <div>
                        <label className="text-white font-medium">Username</label>
                        <input
                            type="text"
                            className="w-full mt-1 p-3 rounded-xl bg-white/80 focus:ring-2 focus:ring-yellow-500 outline-none"
                            placeholder="Enter username"
                            value={user_name}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-white font-medium">Email</label>
                        <input
                            type="email"
                            className="w-full mt-1 p-3 rounded-xl bg-white/80 focus:ring-2 focus:ring-yellow-500 outline-none"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-white font-medium">Password</label>
                        <input
                            type="password"
                            className="w-full mt-1 p-3 rounded-xl bg-white/80 focus:ring-2 focus:ring-yellow-500 outline-none"
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full mt-3 p-3 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
                    >
                        Sign Up
                    </button>
                </div>

                <p className="text-center text-white mt-4">
                    Already have an account?{" "}
                    <Link className="text-yellow-300 font-semibold hover:underline" to="/login">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
