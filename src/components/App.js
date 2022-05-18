import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch, BrowserRouter } from "react-router-dom";
import * as auth from "../utils/auth";
import Login from "./Login";
import Register from "./Register";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import "../index.css";
import AddPlacePopup from "./AddPlacePopup";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(true);

  const [tooltipStatus, setToolTipStatus] = useState("");

  const [user, setUser] = useState({});

  const [email, setEmail] = useState("");

  const [cards, setCards] = useState([]);

  const [cardConfirmDelete, setCardConfirmDelete] = useState(null);

  useEffect(() => {
    api
      .getUserInfo()
      .then((userInfo) => {
        setUser(userInfo);
      })
      .catch((err) => console.log(`Error: ${err}`));
  }, []);

  useEffect(() => {
    api
      .getCards()
      .then((cardData) => {
        setCards(cardData);
      })
      .catch((err) => console.log(`Error: ${err}`));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setEmail(res.data.email);
            setIsLoggedIn(true);
            this.history.push("/");
          } else {
            localStorage.removeItem("jwt");
          }
        })
        .catch((err) => console.log(err));
    }
  });

  function handleLogin(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        if (res.token) {
          setIsLoggedIn(true);
          setEmail(email);
          localStorage.setItem("jwt", res.token);
        } else {
          setToolTipStatus("fail");
          setIsInfoTooltipOpen(true);
        }
      })
      .catch((err) => {
        setToolTipStatus("fail");
        setIsInfoTooltipOpen(true);
      });
  }

  function onRegister({ email, password }) {
    auth.register(email, password).then((res) => {
      if (res.data._id) {
        this.history.push("/signin");
        setToolTipStatus("success");
        setIsInfoTooltipOpen(true);
      } else {
        setToolTipStatus("fail");
        setIsInfoTooltipOpen(false);
      }
    });
  }

  function handleSignout() {
    localStorage.removeItem("jwt");
    this.history.push("/signin");
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleCardDeleteClick(card) {
    setIsConfirmDeleteOpen(true);
    setCardConfirmDelete(card);
  }

  function handleAddCardClick() {
    setIsAddCardPopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardImageClick(card) {
    setSelectedCard(card);
  }
  function handleCardLikeClick(card) {
    const isLiked = card.likes.some((item) => item._id === user._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((item) => (item._id === card._id ? newCard : item))
        );
      })
      .catch((err) => console.log(`Error: ${err}`));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(`Error: ${err}`));
  }

  function handleUpdateUser(user) {
    api
      .editProfile(user)
      .then((newUserInfo) => {
        setUser(newUserInfo);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error: ${err}`));
  }

  function handleUpdateAvatar(userAvatar) {
    api
      .editProfilePicture(userAvatar)
      .then((newUserAvatar) => {
        setUser(newUserAvatar);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error: ${err}`));
  }

  function handleAddNewCard(card) {
    api
      .createCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error: ${err}`));
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsConfirmDeleteOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={user}>
      <BrowserRouter>
        <div className="page">
          <Header email={email} handleSignout={handleSignout} />
          <Switch>
            <ProtectedRoute exact path="/" loggedIn={isLoggedIn}>
              <Main
                cards={cards}
                user={user}
                onEditProfileOpen={handleEditProfileClick}
                onAddCardOpen={handleAddCardClick}
                onEditAvatarOpen={handleEditAvatarClick}
                onCardClick={handleCardImageClick}
                onCardDeleteClick={handleCardDeleteClick}
                onCardLikeClick={handleCardLikeClick}
              />
            </ProtectedRoute>

            <Route path="/signup">
              <Register onRegister={onRegister} />
            </Route>
            <Route path="/signin">
              <Login onLogin={handleLogin} />
            </Route>
            <Route>
              {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
            </Route>
          </Switch>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddCardPopupOpen}
            onClose={closeAllPopups}
            onAddNewCard={handleAddNewCard}
          />

          <DeleteConfirmationPopup
            isOpen={isConfirmDeleteOpen}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
            card={cardConfirmDelete}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            status={tooltipStatus}
          />
        </div>
      </BrowserRouter>
    </CurrentUserContext.Provider>
  );
}

export default App;
