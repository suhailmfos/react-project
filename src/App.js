import React, { useEffect, useState } from "react";
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Register from "./Register";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

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
                <Route path="/" element={<Home isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} /> {/* Redirect to login page */}
                <Route path="/login" element={isAuthenticated ? <Navigate to="/"/> : <Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/register" element={isAuthenticated ? <Navigate to ="/" /> :  <Register />} />l̥
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;