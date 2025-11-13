import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // clear old errors

        try {
            const res = await axios.post("http://localhost:3000/api/user/auth/login", {
                email,
                password,
            });

            console.log(res.data);

            if (res.data.success) {
                const token = res.data.output.token;
                const username = res.data.output.user_name || email.split("@")[0];

                // save data locally
                localStorage.setItem("token", token);
                localStorage.setItem("player", JSON.stringify({ name: username }));

                alert("Login successful!");
                navigate("/home");
            } else {
                // backend returned success: false
                setError(res.data.message || "Invalid credentials");
            }
        } catch (err) {
            console.error(err);

            // show backend messages (like invalid password, user not found)
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
                <h2 className="text-center mb-3">Login</h2>

                {error && (
                    <div className="alert alert-danger text-center py-2">{error}</div>
                )}

                <form onSubmit={handleSubmit}>
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
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Login
                    </button>
                </form>

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
