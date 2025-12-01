import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save username for the rest of the app
    localStorage.setItem("username", username);

    // Go to the main app/dashboard
    navigate("/app");
  };

  return (
    <div className="auth-container">
      <div className="auth-card large">
        <h1 className="auth-title">Log in to your account</h1>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="auth-input"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
          />

          <p className="auth-text">
            Don’t have an account?{" "}
            <Link to="/signup" className="auth-link">Create account</Link>
          </p>

          <button type="submit" className="auth-button">Log in</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
