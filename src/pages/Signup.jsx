import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import toast from "react-hot-toast";

function Signup() {
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
            className="d-flex justify-content-center align-items-center vh-100"
            style={{
                backgroundImage: `url('/Images/Background/back1.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="bg-white p-3 rounded w-25 shadow">
                <h2 className="text-center mb-3">Sign Up</h2>

                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Email</strong>
                    </label>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        name="email"
                        className="form-control rounded-0"
                        value={email}
                        onChange={(e)=>{
                            setEmail(e.target.value);
                        }}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="user_name">
                        <strong>Username</strong>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Username"
                        name="user_name"
                        className="form-control rounded-0"
                        value={user_name}
                        onChange={(e)=>{
                            setUserName(e.target.value);
                        }}
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
                        onChange={(e)=>{
                            setPassword(e.target.value);
                        }}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success w-100 rounded-0" onClick={handleSubmit}>
                    Sign Up
                </button>

                <p className="mt-3 text-center">Already have an account?</p>
                <Link
                    to="/login"
                    className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
                >
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Signup;
