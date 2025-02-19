import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Basic validation for password confirmation
        if (user.password !== user.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post(API_URL + "/register/user", {
                username: user.username,
                email: user.email,
                password: user.password,
            });

            if (response.status === 201) {
                alert("Registration successful! Redirecting to login...");
                setTimeout(() => navigate("/login"), 2000); // Redirect to login page in 2 seconds
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || "Registration failed. Try again.");
            } else {
                setError("Server is not responding. Please try again later.");
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="w-full px-4 py-2 border rounded-md mb-2"
                        value={user.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border rounded-md mb-2"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border rounded-md mb-2"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="w-full px-4 py-2 border rounded-md mb-2"
                        value={user.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
                    >
                        Register
                    </button>
                </form>
                <p className="text-sm text-gray-500 mt-3 text-center">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-500">
                        Login here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;