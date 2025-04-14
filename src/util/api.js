import axios from "axios";

const api = async () => {
  const baseURL =
    import.meta.env.VITE_BACKEND_URI || "http://localhost:3000/api";
  return await axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};
export default api;
