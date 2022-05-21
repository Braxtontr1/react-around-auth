import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    onLogin(userData);
  }

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__wrapper">
          <h3 className="auth__title">Log in</h3>
          <div className="auth__input">
            <input
              required
              className="auth__text"
              type="text"
              name="email"
              placeholder="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="auth__input">
            <input
              required
              className="auth__text"
              type="password"
              name="password"
              placeholder="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="auth__wrapper">
            <button className="auth__button button" type="submit">
              Log in
            </button>
            <p className="auth__link-text">
              Not a member yet?{" "}
              <Link className="auth__link" to="/signup">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
