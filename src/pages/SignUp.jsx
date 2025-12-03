import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Authorization.css";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [yearError, setYearError] = useState("");

  const storedUser = JSON.parse(localStorage.getItem("user"));

  // Helper: check if username/email already exists
  const checkExists = async ({ username, email }) => {
    try {
      const params = new URLSearchParams();
      if (username) params.append("username", username);
      if (email) params.append("email", email);

      const url = `http://localhost:5174/api/auth/check-exists?${params.toString()}`;

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();

      return Array.isArray(data) && data.length > 0;
    } catch (err) {
      console.error("Error calling /check-exists:", err);
      return false;
    }
  };

  // Validation functions
  const validateFirstName = () => {
    if (!firstName.trim()) {
      setFirstNameError("First name is required.");
      return false;
    }
    setFirstNameError("");
    return true;
  };

  const validateLastName = () => {
    if (!lastName.trim()) {
      setLastNameError("Last name is required.");
      return false;
    }
    setLastNameError("");
    return true;
  };

  const validateUsername = async () => {
    const trimmed = username.trim();
    if (!trimmed) {
      setUsernameError("Username is required.");
      return false;
    }
    if (trimmed.includes("@")) {
      setUsernameError("Username cannot contain special character @.");
      return false;
    }
    const exists = await checkExists({ username: trimmed, email: null });
    if (exists) {
      setUsernameError(`The username "${trimmed}" already exists.`);
      return false;
    }

    setUsernameError("");
    return true;
  };

  const validatePassword = () => {
    const pw = password;
    if (!pw.trim()) {
      setPasswordError("Password is required.");
      return false;
    }
    if (pw.includes(" ")) {
      setPasswordError("Password cannot contain spaces.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateEmail = async () => {
    const trimmed = email.trim();
    if (!trimmed) {
      setEmailError("Email is required.");
      return false;
    }
    if (!trimmed.includes("@") || !trimmed.endsWith(".edu")) {
      setEmailError("Please use a valid .edu email address.");
      return false;
    }

    const exists = await checkExists({ username: null, email: trimmed });
    if (exists) {
      setEmailError("This email is already being used.");
      return false;
    }

    setEmailError("");
    return true;
  };

  const validateYear = () => {
    const trimmed = year.trim();
    if (!trimmed) {
      setYearError("College year is required.");
      return false;
    }
    const num = Number(trimmed);
    if (Number.isNaN(num) || !Number.isInteger(num)) {
      setYearError("College year must be a whole number.");
      return false;
    }
    if (![1, 2, 3, 4].includes(num)) {
      setYearError("College year must be 1, 2, 3, or 4.");
      return false;
    }
    setYearError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const okFirst = validateFirstName();
    const okLast = validateLastName();
    const okPass = validatePassword();
    const okYear = validateYear();
    const okUser = await validateUsername();
    const okEmail = await validateEmail();

    if (!okFirst || !okLast || !okUser || !okPass || !okEmail || !okYear) return;

    const newUser = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      college_year: Number(year.trim()),
      email: email.trim(),
      username: username.trim(),
      password: password.trim(),
      is_Club_Officer: false,
      is_Admin: false,
    };

    const signUp = async (newUser) => {
      const result = await fetch(`http://localhost:5174/api/auth/signup`, {
        method: `POST`,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      })
      const data = await result.json();
      console.log(data);
    }

    // POST new account to /api/auth/signup
    signUp(newUser);

    window.location.href = "/login";
  };

  return (
    <div className="auth-container">
      <div className="auth-card large">
        <h1 className="auth-title">Create account</h1>

        <form onSubmit={handleSubmit} className="auth-form">
          {/* First name */}
          <div className="auth-field">
            <label className="auth-label">First Name</label>
            <input
              type="text"
              value={firstName}
              onBlur={validateFirstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`auth-input ${firstNameError ? "auth-input-error" : ""}`}
            />
            {firstNameError && (
              <p className="auth-error-text">{firstNameError}</p>
            )}
          </div>

          {/* Last name */}
          <div className="auth-field">
            <label className="auth-label">Last Name</label>
            <input
              type="text"
              value={lastName}
              onBlur={validateLastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`auth-input ${lastNameError ? "auth-input-error" : ""}`}
            />
            {lastNameError && (
              <p className="auth-error-text">{lastNameError}</p>
            )}
          </div>

          {/* Username */}
          <div className="auth-field">
            <label className="auth-label">Username</label>
            <input
              type="text"
              value={username}
              onBlur={validateUsername} // async is fine here
              onChange={(e) => setUsername(e.target.value)}
              className={`auth-input ${usernameError ? "auth-input-error" : ""}`}
            />
            {usernameError && (
              <p className="auth-error-text">{usernameError}</p>
            )}
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
            {passwordError && (
              <p className="auth-error-text">{passwordError}</p>
            )}
          </div>

          {/* Email */}
          <div className="auth-field">
            <label className="auth-label">College-verified Email</label>
            <input
              type="email"
              value={email}
              onBlur={validateEmail} // async
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
            <Link to="/login" className="auth-link">
              Log in
            </Link>
          </p>

          <button type="submit" className="auth-button">
            Create account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
