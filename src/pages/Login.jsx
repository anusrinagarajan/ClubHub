import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Authorization.css";

function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const [usernameOrEmailError, setUsernameOrEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [incorrectUserOrPassError, setIncorrectUserOrPassError] = useState("");

  // Validation functions
  const validateUsernameOrEmail = () => {
    if (!usernameOrEmail.trim()) {
      setUsernameOrEmailError("Username or email is required.");
      return false;
    }
    setUsernameOrEmailError("");
    return true;
  };

  const validatePassword = () => {
    const pw = password;
    if (!pw.trim()) {
      setPasswordError("Password is required.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ok1 = validateUsernameOrEmail();
    const ok2 = validatePassword();

    if (!ok1 || !ok2) return;

    // Get account data
    const getAccountInfo = async (usernameOrEmail) => {
      const result = await fetch(`http://localhost:5174/api/auth/login`, {
        method: `POST`,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"usernameOrEmail" : usernameOrEmail})
      });
      console.log(usernameOrEmail);
      const data = await result.json();
      if (data.length === 0) {
        setIncorrectUserOrPassError("This account doesn't exist. Create an account.");
        return;
      }
      return data[0];
    }

    const storedUser = await getAccountInfo(usernameOrEmail);

    // Verify password
    if (storedUser && storedUser.password === password) {
      setIncorrectUserOrPassError("");
      localStorage.setItem("loggedInUser", JSON.stringify(storedUser));

      window.location.href = "/";
    } else {
      setIncorrectUserOrPassError("Incorrect username/email or password.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card large">
        <h1 className="auth-title">Log in to your account</h1>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label className="auth-label">Username or College Email</label>
            <input
              type="text"
              value={usernameOrEmail}
              onBlur={validateUsernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              className={`auth-input ${
                usernameOrEmailError ? "auth-input-error" : ""
              }`}
            />
            {usernameOrEmailError && (
              <p className="auth-error-text">{usernameOrEmailError}</p>
            )}
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
            {passwordError && (
              <p className="auth-error-text">{passwordError}</p>
            )}
          </div>

          <p className="auth-text">
            Don’t have an account?{" "}
            <Link to="/signup" className="auth-link">
              Create account
            </Link>
          </p>

          <button type="submit" className="auth-button">
            Log in
          </button>
          {incorrectUserOrPassError && (
            <p className="auth-error-text">{incorrectUserOrPassError}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
