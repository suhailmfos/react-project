import React, { useEffect, useState } from "react";
import { HashRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Register from "./Register";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const PrivateRoute = ({ element }) => {
    const token = localStorage.getItem("token");
    return token ? element : <Navigate to="login" />;
}

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    useEffect(() => {
        axios.get(API_URL + "/api/v1/current-user", { withCredentials: true })
            .then(response => {
                if (response.data.username) {
                    setIsAuthenticated(true);
                }
            })
            .catch(() => setIsAuthenticated(false));
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} /> {/* Redirect to login page */}
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/home"
                    element={isAuthenticated ? <Home setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;