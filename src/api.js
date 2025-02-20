import axios from "axios";

const api = axios.create({
  baseURL: "https://suhail.up.railway.app",
  withCredentials: true, // ✅ Ensures cookies are sent
});

export default api;