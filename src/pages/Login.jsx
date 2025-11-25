import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import toast from "react-hot-toast";

function Login() {
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
            className="d-flex justify-content-center align-items-center vh-100"
            style={{
                backgroundImage: `url('/Images/Background/back1.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="bg-white p-3 rounded w-25 shadow">
                <h2 className="text-center mb-3">Login</h2>

                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Email</strong>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Email"
                        autoComplete="off"
                        name="email"
                        className="form-control rounded-0"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password">
                        <strong>Password</strong>
                    </label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        className="form-control rounded-0"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success w-100 rounded-0" onClick={handleSubmit}>
                    Login
                </button>

                <p className="mt-3 text-center">Don't have an account?</p>
                <Link
                    to="/signup"
                    className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
                >
                    Sign Up
                </Link>
            </div>
        </div>
    );
}

export default Login;
