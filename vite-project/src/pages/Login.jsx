import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigator = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState("");
  const [message, setMessage] = useState("");
  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/auth/login", { email, password })
      .then((res) => {
        console.log(res);
        if (res.data.status) {
          setMessage("Login successful! Redirecting to home");
          setError("");
          setTimeout(() => {
            navigator("/");
          }, 2000);
        } else {
          setError(res.data.message || "Login failed");
          setMessage("");
        }
      })
      .catch((err) => {
        console.log(err);
        setError("An error occurred during login");
        setMessage("");
      });
  };

  return (
    <div className="form-container">
      <form className="form-main" onSubmit={handleSubmit}>
        <p>Register Page</p>

        <label htmlFor="email">Email: </label>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password: </label>
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

        <p>New User</p>
        <Link to="/register">Register</Link>

        {err && <p className="error-message">{err}</p>}
        {message && <p className="success-message">{message}</p>}
      </form>
    </div>
  );
}

export default Login;
