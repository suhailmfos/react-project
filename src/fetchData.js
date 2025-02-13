const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get("http://localhost:8081/api/protected", {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response.data);
    } catch (error) {
        console.error("Unauthorized");
    }
};

export default fetchData;