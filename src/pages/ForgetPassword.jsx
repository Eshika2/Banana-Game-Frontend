import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    async function sendEmail() {
        const emailError = validateEmail(email);
        if (emailError) {
            toast.error(emailError);
            return;
        }

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/sendOTP", {
            email: email
        })
        .then((response) => {
            setEmailSent(true);
            toast.success(response.data.message || "OTP Sent Successfully");
        })
        .catch((error) => {
            toast.error(error.response.data.message || "Something went wrong. Please try again.");
        });
    }

    async function resetPassword() {
        const passwordError = validatePassword(password);
        if (passwordError) {
            toast.error(passwordError);
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/password/reset", {
            email: email,
            otp: otp,
            password: password
        })
        .then((response) => {
            toast.success(response.data.message || "Password Reset Successfully");
            window.location.href = "/login";
        })
        .catch((error) => {
            toast.error(error.response.data.message || "Something went wrong. Please try again.");
            window.location.reload();
        });
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return "Please enter a valid email address";
        }

        return null;
    }

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

    return (
        <div className="w-full h-screen bg-[url('/Images/Background/back1.jpg')] bg-cover bg-center flex p-2">
            <button
                onClick={() => navigate(-1)}
                className="absolute top-5 right-5 px-4 py-2 bg-yellow-400 text-black font-bold rounded shadow hover:bg-yellow-300 z-10"
            >
                Back
            </button>
            {
                emailSent ?
                <div className="w-full h-full flex items-center justify-center">
                    <div className="w-[400px] backdrop-blur-2xl bg-white/20 p-8 rounded-2xl shadow-2xl border border-white/30">
                        <h1 className="text-2xl text-center font-bold mb-4">Reset Password</h1>
                        <div className="mb-4">
                            <label className="block text-white font-bold" htmlFor="otp">
                                OTP
                            </label>
                            <input
                                className="w-full mt-1 p-3 rounded-xl bg-white/80 focus:ring-2 focus:ring-yellow-500 outline-none"
                                id="otp"
                                type="text"
                                placeholder="Enter your otp"
                                onChange={(e)=>{
                                    setOtp(e.target.value);
                                }}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-white font-bold" htmlFor="password">
                                New Password
                            </label>
                            <input
                                className="w-full mt-1 p-3 rounded-xl bg-white/80 focus:ring-2 focus:ring-yellow-500 outline-none"
                                id="password"
                                type="password"
                                placeholder="Enter your new password"
                                required
                                onChange={(e)=>{
                                    setPassword(e.target.value);
                                }}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-white font-bold" htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <input
                                className="w-full mt-1 p-3 rounded-xl bg-white/80 focus:ring-2 focus:ring-yellow-500 outline-none"
                                id="confirmPassword"
                                type="password"
                                placeholder="Enter your confirm password"
                                required
                                onChange={(e)=>{
                                    setConfirmPassword(e.target.value);
                                }}
                            />
                        </div>
                        <button
                            className="w-full mt-3 p-3 rounded-xl bg-green-600 hover:bg-green-700 text-white py-3 font-semibold transition cursor"
                            type="submit"
                            onClick={resetPassword}
                        >
                            Reset Password
                        </button>
                    </div>
                </div> :

                <div className="w-full h-full flex items-center justify-center">
                    <div className="w-[400px] h-[250px] backdrop-blur-2xl bg-white/20 p-8 rounded-2xl shadow-2xl border border-white/30">
                        <h1 className="text-2xl text-center font-bold mb-4">Forget Password</h1>
                        <div className="mb-4">
                            <label className="block text-white font-bold" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="w-full mt-1 p-3 rounded-xl bg-white/80 focus:ring-2 focus:ring-yellow-500 outline-none"
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                onChange={(e)=>{
                                    setEmail(e.target.value);
                                }}
                            />
                        </div>
                        <button
                            className="w-full mt-3 p-3 rounded-xl bg-green-600 hover:bg-green-700 text-white py-3 font-semibold transition cursor"
                            type="submit"
                            onClick={sendEmail}
                        >
                            Send OTP
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}