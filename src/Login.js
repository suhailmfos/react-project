import React, { useState } from "react";
import axios from "axios";

// const API_URL = "http://localhost:8080/api/auth/login";
const API_URL = "https://suhail.up.railway.app/api/auth/login";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [token, setToken] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(API_URL, {
                username,
                password,
            });
            setToken(response.data);
            localStorage.setItem("token", response.data);
            console.log("token value : " + token);
            console.log("response " + response.data);
            alert("Login successfull with token: " + response.data + "\n" +
                username + " \n" + password);
        } catch (err) {
            setError("Invalid username or password");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;