import { useState } from "react";
import { Link } from "react-router-dom";
import "./auth.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("No account found. Please sign up first.");
      return;
    }

    if (
      storedUser.username === username &&
      storedUser.password === password
    ) {
      localStorage.setItem("loggedInUser", JSON.stringify(storedUser));
      window.location.href = "/app";
    } else {
      alert("Incorrect username or password.");
    }
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
