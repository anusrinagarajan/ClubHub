import { useState } from "react";
import { Link } from "react-router-dom";
import "./auth.css";

function Signup() {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      fullname,
      username,
      password,
      email,
      year,
    };

    // Save in localStorage
    localStorage.setItem("user", JSON.stringify(newUser));

    // Go to login
    window.location.href = "/login";
  };

  return (
    <div className="auth-container">
      <div className="auth-card large">
        <h1 className="auth-title">Create account</h1>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="auth-input"
          />

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

          <input
            type="email"
            placeholder="College-verified email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
          />

          <input
            type="text"
            placeholder="College year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="auth-input"
          />

          <p className="auth-text">
            Already have an account?{" "}
            <Link to="/login" className="auth-link">Log in</Link>
          </p>

          <button type="submit" className="auth-button">Create account</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
