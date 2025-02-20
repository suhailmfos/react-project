import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "https://suhail.up.railway.app";

function Login({ setIsAuthenticated }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const goToRegister = () => {
        navigate("/register");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await axios.post(`${API_URL}/login`, { username, password }, { withCredentials: true });
            setIsAuthenticated(true);
            navigate("/"); // Redirect to Home
        } catch (err) {
            setError("Login failed. Please try again.");
        }
    };

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/v1/current-user`, { withCredentials: true });
                console.log("Logged in as:", response.data);
                setIsAuthenticated(true);
            } catch (err) {
                console.log("User not authenticated");
                setIsAuthenticated(false);
            }
        };

        fetchCurrentUser();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            placeholder="Username"
                            className="w-full px-4 py-2 border rounded-md mb-2"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 border rounded-md mb-4"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                    >
                        Login
                    </button>
                </form>
                <div className="flex justify-between mt-4">
                    <button
                        onClick={goToRegister}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;