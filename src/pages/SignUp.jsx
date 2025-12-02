import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Authorization.css";

function Signup() {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");

  const [fullnameError, setFullnameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [yearError, setYearError] = useState("");
  
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // Validation functions
  const validateFullname = () => {
    if (!fullname.trim()) {
      setFullnameError("Full name is required.");
      return false;
    }
    setFullnameError("");
    return true;
  };

  const validateUsername = () => {
    if (!username.trim()) {
      setUsernameError("Username is required.");
      return false;
    }
    if (storedUser && storedUser.username === username.trim()) {
      setUsernameError("This username already exists.");
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

  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError("Email is required.");
      return false;
    }
    if (!email.includes("@") || !email.endsWith(".edu")) {
      setEmailError("Please use a valid .edu email address.");
      return false;
    }
    if (storedUser && storedUser.email === email.trim()) {
      setEmailError("This email is already being used.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validateYear = () => {
    if (!year.trim()) {
      setYearError("College year is required.");
      return false;
    }
    setYearError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const ok1 = validateFullname();
    const ok2 = validateUsername();
    const ok3 = validatePassword();
    const ok4 = validateEmail();
    const ok5 = validateYear();

    if (!ok1 || !ok2 || !ok3 || !ok4 || !ok5) return;

    const newUser = {
      fullname: fullname.trim(),
      username: username.trim(),
      password,
      email: email.trim(),
      year,
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    window.location.href = "/login";
  };

  return (
    <div className="auth-container">
      <div className="auth-card large">
        <h1 className="auth-title">Create account</h1>

        <form onSubmit={handleSubmit} className="auth-form">

          {/* Full name */}
          <div className="auth-field">
            <label className="auth-label">Full Name</label>
            <input
              type="text"
              value={fullname}
              onBlur={validateFullname}
              onChange={(e) => setFullname(e.target.value)}
              className={`auth-input ${fullnameError ? "auth-input-error" : ""}`}
            />
            {fullnameError && <p className="auth-error-text">{fullnameError}</p>}
          </div>

          {/* Username */}
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

          {/* Password */}
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

          {/* Email */}
          <div className="auth-field">
            <label className="auth-label">College-verified Email</label>
            <input
              type="email"
              value={email}
              onBlur={validateEmail}
              onChange={(e) => setEmail(e.target.value)}
              className={`auth-input ${emailError ? "auth-input-error" : ""}`}
            />
            {emailError && <p className="auth-error-text">{emailError}</p>}
          </div>

          {/* Year */}
          <div className="auth-field">
            <label className="auth-label">College Year</label>
            <input
              type="text"
              value={year}
              onBlur={validateYear}
              onChange={(e) => setYear(e.target.value)}
              className={`auth-input ${yearError ? "auth-input-error" : ""}`}
            />
            {yearError && <p className="auth-error-text">{yearError}</p>}
          </div>

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
