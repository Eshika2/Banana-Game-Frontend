import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
    const [user_name, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // reset error message before submitting

        try {
            const res = await axios.post("http://localhost:3000/api/user/auth/register", {
                user_name,
                email,
                password,
            });

            if (res.data.success) {
                alert("Registration successful!");
                navigate("/login");
            } else {
                setError(res.data.message || "Registration failed");
            }
        } catch (err) {
            console.error(err);
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    };

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

                {error && (
                    <div className="alert alert-danger py-2 text-center">{error}</div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="user_name">
                            <strong>Username</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Username"
                            autoComplete="off"
                            name="user_name"
                            className="form-control rounded-0"
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
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
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Sign Up
                    </button>
                </form>

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
