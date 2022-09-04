import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import api from "../utils/Api";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
// import ProtectedRoute from "./ProtectedRoute";
// import InfoTooltip from "./InfoTooltip";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isSelectedCard, setIsSelectedCard] = useState(false);
  const [cards, setCards] = useState([]);

  const searchCardsApiResult = () => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    searchCardsApiResult();
  }, []);

  const searchUserApiResult = () => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    searchUserApiResult();
  }, []);

  function handleUpdateUser(data) {
    api
      .editProfile(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAvatarUpdate(data) {
    api
      .handleUserAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .createCardApi(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard;

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
    }
    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, [isOpen]);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsSelectedCard(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsSelectedCard(false);
    setSelectedCard(null);
  };

  function handleCardLike(id, isLiked) {
    api
      .toggleLike(id, isLiked)
      .then((res) => {
        setCards(cards.map((card) => (card._id === res._id ? res : card)));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(cardId) {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards(cards.filter((card) => card._id !== cardId));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handlePopupCloseClick(evt) {
    if (evt.target.classList.contains("popup")) {
      closeAllPopups();
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Switch>
            <Route path="/sign-up">
              <Login />
            </Route>
            <Route path="/sign-in">
              <Register />
            </Route>
          </Switch>

          <Header />
          <Main
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />

          <ImagePopup
            isOpen={isSelectedCard}
            onClose={closeAllPopups}
            name="big-picture"
            card={selectedCard}
            onCloseClick={handlePopupCloseClick}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleUpdateUser}
            buttonText="Сохранить"
            onCloseClick={handlePopupCloseClick}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleAvatarUpdate}
            buttonText="Сохранить"
            onCloseClick={handlePopupCloseClick}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleAddPlaceSubmit}
            buttonText="Сохранить"
            onCloseClick={handlePopupCloseClick}
          />

          <PopupWithForm
            onClose={closeAllPopups}
            name="card-delete"
            title="Вы уверены?"
            buttonText="Да"
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
