import { useState, useEffect } from "react";
import ProtectedRoute from "./protectedRouter/ProtectedRouter.js";

//? компоненты
import Header from "./header/Header.js";
import Login from "./login/Login.js";
import Register from "./register/Register.js";
import Main from "./main/Main.js";
import Footer from "./footer/Footer.js";
import PopupWithForm from "./popupWithForm/PopupWithForm.js";
import ImagePopup from "./imagePopup/ImagePopup.js";
import InfoTooltip from "./infoTooltip/InfoTooltip.js";
import BurgerMenu from "./burgerMenu/burgerMenu.js";

import { api } from "../utils/Api.js";
import { auth } from "../utils/Auth.js";

import successfulIcon from "../images/InfoTooltip/successful-icon.svg";
import unsuccessfulIcon from "../images/InfoTooltip/unsuccessful-icon.svg";

import {
  Routes,
  useNavigate,
  Navigate,
  Route,
  NavLink,
} from "react-router-dom";
import { CurrentUserContext } from "./../contexts/CurrentUserContext.js";

//? импорт всех поп-ап`ов
import EditProfilePopup from "./editProfilePopup/EditProfilePopup.js";
import EditAvatarPopup from "./editAvatarPopup/EditAvatarPopup.js";
import AddPlacePopup from "./addPlacePopup/AddPlacePopup.js";

function App() {
  const navigate = useNavigate();

  //? хуки открытия поп-апов
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

  const [isInfoOpen, setIsInfoOpen] = useState(false);

  //? хук модификатора фона в бургерном меню
  const [isIconCloseBurgerMenu, setIsIconCloseBurgerMenu] = useState(false);

  //? авторизованость
  const [loggedIn, setLoggedIn] = useState(false);

  //? infoTooltip, сообщение и иконка
  const [infoTooltipMessage, setInfoTooltipMessage] = useState("");
  const [infoTooltipImage, setInfoTooltipImage] = useState(unsuccessfulIcon);

  //? пользователь данные и аватар
  const [currentUser, setCurrentUser] = useState({});
  const [currentEmail, setCurrentEmail] = useState("");

  //? выбранная карточка
  const [selectedCard, setSelectedCard] = useState(null);

  //? массив всех карточек
  const [cards, setCards] = useState([]);

  //? Открыт хоть один поп-ап
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard;

  //? Ожидание ответа с сервера
  const [isLoading, setIsLoading] = useState(false);

  //? запрос token
  useEffect(() => {
    handleToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  //? проверяем авторизацию и делаем запрос на сервер
  useEffect(() => {
    if (loggedIn) {
      //? запрос данных о пользователе
      api
        .getUserInfo()
        .then((result) => {
          setCurrentUser(result.data); //* устанавливаем данные пользователя получаенные с сервера
        })
        .catch((error) => {
          //* Выводим сообщение для быстрого понимания, где конкретно была ошибка
          console.log("Error while getting info about user");
          console.log(error);
        });

      //? запрос на карточки
      api
        .getCardArray()
        .then((res) => {
          setCards(res); //* устанавливаем карточки получаенные с сервера
        })
        .catch((error) => {
          //* Выводим сообщение для быстрого понимания, где конкретно была ошибка
          console.log("Error while getting cards");
          console.log(error);
        });
    }
  }, [loggedIn]);

  //? вешаем слушатель нажатия кнопки Escape
  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }

    if (isOpen) {
      //? навешиваем только при открытии
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsCardPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard(null);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsCardPopupOpen(true);
  }

  function handleUpdateUser(newUserInfo) {
    setIsLoading(true);
    api
      .setUserInfo(newUserInfo)
      .then((result) => {
        setCurrentUser(result.data);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error: ${err}`))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(newAvatar) {
    setIsLoading(true);
    api
      .setUserAvatar(newAvatar)
      .then((result) => {
        setCurrentUser(result.data);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error: ${err}`))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api
      .addNewCard(card)
      .then((Card) => {
        let newCard = Card;
        newCard.data.owner = currentUser;
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error: ${err}`))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    //? Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLike(card, currentUser._id)
      .then((newCard) => {
        setCards((state) =>
          state.map((item) => (item._id === card._id ? newCard : item))
        );
      })
      .catch((error) => {
        //? Выводим сообщение для быстрого понимания, где конкретно была ошибка
        console.log("Error while liking card");
        console.log("Id: ", card._id);
        console.log(error);
      });
  }

  function handleCardDelete(card) {
    //? Отправляем запрос в API на удаление карточки
    api
      .deleteCard(card)
      .then(() => {
        setCards((state) =>
          state.filter((c) => (c._id === card._id ? false : true))
        );
      })
      .catch((error) => {
        //? Выводим сообщение для быстрого понимания, где конкретно была ошибка
        console.log("Error while deleting card");
        console.log("Id: ", card._id);
        console.log(error);
      });
  }

  function setInfoTooltip(
    error = false,
    message = "Something was wrong ! Try one more time."
  ) {
    if (error) {
      setInfoTooltipMessage(message);
      setInfoTooltipImage(unsuccessfulIcon);
    } else {
      setInfoTooltipMessage(message);
      setInfoTooltipImage(successfulIcon);
    }
    setIsInfoTooltipPopupOpen(true);
  }

  function handleRegistration(email, password) {
    auth
      .registration(email, password)
      .then((res) => {
        if (res.status !== 400) {
          setInfoTooltip(false, "You have been successful registered!");
          navigate("/");
        }
      })
      .catch((err) => {
        setInfoTooltip(true); //todo передавать разные значения ответов
        return console.log(err);
      });
  }

  function handleAuthorization(email, password) {
    auth
      .authorization(email, password)
      .then((res) => {
        setLoggedIn(true);
        setCurrentEmail(email);
        navigate("/");
      })
      .catch((err) => {
        setLoggedIn(false);
        setInfoTooltip(true); //todo передавать разные значения ответов
        return console.log(err);
      });
  }

  function handleToken() {
    auth
      .validationJWT("check token")
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setCurrentEmail(res.data.email);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(`Request to server to check token return: ${err}`);
      });
  }

  function handleSignOut() {
    auth.logOut().then((res) => {
      setLoggedIn(false);
      navigate("/signin");
    });
    setLoggedIn(false);
    setCurrentEmail("");
  }

  function openCloseBugrer() {
    setIsInfoOpen(!isInfoOpen);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {/* контент сайта, блок content */}
      <Routes>
        {/* основной контент */}
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              {/* шапка сайта, блок header */}
              <article
                id="info"
                className={isInfoOpen ? "info info_active" : "info"}
              >
                <p className="info__email">{currentEmail}</p>
                <button className="info__button button" onClick={handleSignOut}>
                  Logout
                </button>
              </article>

              <Header>
                <BurgerMenu
                  close={isIconCloseBurgerMenu}
                  setClose={setIsIconCloseBurgerMenu}
                  onClick={openCloseBugrer}
                  currentEmail={currentEmail}
                  handleSignOut={handleSignOut}
                />
              </Header>
              {/* основная часть сайта, блок main */}
              <Main
                cards={cards}
                handleCardLike={handleCardLike}
                handleCardDelete={handleCardDelete}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
              />
              {/*//? подвал сайта, блок footer */}
              <Footer />

              {/*//* pop-up`ы сайта */}
              {/*//* avatar pop-up */}
              <EditAvatarPopup
                isLoading={isLoading}
                onUpdateAvatar={handleUpdateAvatar}
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
              />

              {/*//* edit pop-up */}
              <EditProfilePopup
                isLoading={isLoading}
                onUpdateUser={handleUpdateUser}
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
              />

              {/*//* add pop-up */}
              <AddPlacePopup
                isLoading={isLoading}
                onAddPlace={handleAddPlaceSubmit}
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
              />

              {/*//* Card pop-up */}
              <ImagePopup
                isOpen={isCardPopupOpen}
                card={selectedCard}
                onClose={closeAllPopups}
              />

              {/*//* delete pop-up */}
              <PopupWithForm
                name="delete"
                popupTitle="Are you sure ?"
                buttonTitle="Yes"
                isOpen={false}
                onClose={closeAllPopups}
              />
            </ProtectedRoute>
          }
        ></Route>

        {/* регистрация */}
        <Route
          path="/signup"
          element={
            <>
              <Header>
                <NavLink className="header__link link" to="/signin">
                  Login
                </NavLink>
              </Header>
              <Register handleRegistration={handleRegistration} />
            </>
          }
        ></Route>

        {/* авторизация */}
        <Route
          path="/signin"
          element={
            <>
              <Header>
                <NavLink className="header__link link" to="/signup">
                  Register
                </NavLink>
              </Header>
              <Login handleAuthorization={handleAuthorization} />
            </>
          }
        ></Route>

        {/* все остальное */}
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>

      <InfoTooltip
        isOpen={isInfoTooltipPopupOpen}
        img={infoTooltipImage}
        message={infoTooltipMessage}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
