import React from "react";
import { Route, Link } from "react-router-dom";
import aroundTheUS from "../images/around-the-us.svg";

function Header({ onSignout, email }) {
  function handleSignout() {
    onSignout();
  }
  return (
    <header className="header">
      <img className="header__image" src={aroundTheUS} alt="Around The U.S." />

      <Route exact path="/">
        <div className="header__wrapper">
          <p className="header__user">{email}</p>
          <button className="header__logout" onClick={handleSignout}>
            Sign out
          </button>
        </div>
      </Route>
      <Route path="/signup">
        <Link className="header__link" to="signin">
          {" "}
          Sign in
        </Link>
      </Route>
      <Route path="/signin">
        <Link className="header__link" to="signup">
          {" "}
          Sign up
        </Link>
      </Route>
    </header>
  );
}

export default Header;
