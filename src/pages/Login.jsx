import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Authorization.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [incorrectUserOrPassError, setIncorrectUserOrPassError] = useState("");

  // Validation functions
  const validateUsername = () => {
    if (!username.trim()) {
      setUsernameError("Username is required.");
      return false;
    }
    setUsernameError("");
    return true;
  };

  const validatePassword = () => {
    if (!password.trim()) {
      setPasswordError("Password is required.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const ok1 = validateUsername();
    const ok2 = validatePassword();

    if(!ok1 || !ok2) return;
    
    // Verify credentials
    const credentialsValid = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      return storedUser.username === username && storedUser.password === password;
    }

    if (credentialsValid) {
      setIncorrectUserOrPassError("");

      // Stores logged in user's session + account info locally
      localStorage.setItem("loggedInUser", JSON.stringify(storedUser));

      window.location.href = "/";
    } else {
      setIncorrectUserOrPassError("Incorrect username or password.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card large">
        <h1 className="auth-title">Log in to your account</h1>

        <form onSubmit={handleSubmit} className="auth-form">

          <div className="auth-field">
            <label className="auth-label">Username</label>
            <input
              type="text"
              value={username}
              onBlur={validateUsername}
              onChange={(e) => setUsername(e.target.value)}
              className={`auth-input ${usernameError ? "auth-input-error" : ""}`}
            />
            {usernameError && <p className="auth-error-text">{usernameError}</p>}
          </div>

          <div className="auth-field">
            <label className="auth-label">Password</label>
            <input
              type="password"
              value={password}
              onBlur={validatePassword}
              onChange={(e) => setPassword(e.target.value)}
              className={`auth-input ${passwordError ? "auth-input-error" : ""}`}
            />
            {passwordError && <p className="auth-error-text">{passwordError}</p>}
          </div>

          <p className="auth-text">
            Don’t have an account?{" "}
            <Link to="/signup" className="auth-link">Create account</Link>
          </p>

          <button type="submit" className="auth-button">Log in</button>
          {incorrectUserOrPassError && <p className="auth-error-text">{incorrectUserOrPassError}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
