import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import About from "./pages/About";
import { setSession } from "./utils/jwt";

function App() {
  const isTokenPresent = () => !!localStorage.getItem("accessToken");
  console.log("isTokenPresent", isTokenPresent());
  if (isTokenPresent()) {
    let token = localStorage.getItem("accessToken");
    setSession(token);
  }
  function PrivateRoute({ element, redirectTo = "/login" }) {
    return isTokenPresent() ? (
      element
    ) : (
      <Navigate to={redirectTo} replace={true} />
    );
  }
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute element={<HomePage />} />} />
          <Route path="/about" element={<PrivateRoute element={<About />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
