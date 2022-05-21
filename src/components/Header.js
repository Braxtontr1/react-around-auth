import React, { useState } from "react";
import { Route, Link } from "react-router-dom";
import aroundTheUS from "../images/around-the-us.svg";

function Header({ onSignout, email, isUserLoggedIn }) {
  const [isShowHeaderWrapper, setIsShowHeaderWrapper] = useState(false);

  function handleHeaderState() {
    setIsShowHeaderWrapper((visible) => !visible);
  }

  function handleSignout() {
    onSignout();
  }
  return (
    <header className={isUserLoggedIn ? "header" : "header__auth"}>
      <img className="header__image" src={aroundTheUS} alt="Around The U.S." />

      <Route exact path="/">
        <button
          className={
            isShowHeaderWrapper
              ? "header__mobile-close-button header__button button"
              : "header__mobile-icon header__button button"
          }
          onClick={handleHeaderState}
        ></button>
        <div
          className={
            isShowHeaderWrapper
              ? "header__user-wrapper_mobile"
              : "header__user-wrapper"
          }
        >
          {" "}
          <p
            className={`header__user ${
              isShowHeaderWrapper ? "header_open" : ""
            }`}
          >{`${email}`}</p>
          <button
            className={`header__logout button ${
              isShowHeaderWrapper ? "header_open" : ""
            }`}
            onClick={handleSignout}
          >
            Sign out
          </button>
        </div>
      </Route>
      <Route path="/signup">
        <Link className="header__link button" to="signin">
          {" "}
          Sign in
        </Link>
      </Route>
      <Route path="/signin">
        <Link className="header__link button" to="signup">
          {" "}
          Sign up
        </Link>
      </Route>
    </header>
  );
}

export default Header;
