import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    onRegister(userData);
  }

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__wrapper">
          <h3 className="auth__title">Sign up</h3>
          <label className="auth__input">
            <input
              required
              className="auth__text"
              type="text"
              name="email"
              placeholder="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="auth__input">
            <input
              required
              className="auth__text"
              type="text"
              name="password"
              placeholder="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className="auth__wrapper">
            <button className="auth__button" type="submit">
              Sign up
            </button>
            <p className="auth__text">
              Already a member?{" "}
              <Link className="auth__link" to="/signin">
                Log in here!
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
