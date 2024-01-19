import axios from "axios";
import { setSession } from "./jwt";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log("err in api", err);
    if (
      err.response.status === 401 &&
      err.response.data.error.message === "jwt expired"
    ) {
      setSession(null);
      const navigate = useNavigate();
      navigate("/login");
    }
    return Promise.reject(err);
  }
);

export default api;
