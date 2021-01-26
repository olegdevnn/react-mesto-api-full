import React, { useCallback, useEffect, useState } from 'react';

import { Route, Switch } from 'react-router';
import { useHistory } from 'react-router-dom';

import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/api';
import {
  consoleDebug,
  HOME_LINK,
  safeData,
  SING_IN_LINK,
  SING_UP_LINK,
} from '../utils/utils';
import AddPlacePopup from './AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import Error404 from './Error404';
import Footer from './Footer';
import Header from './Header/Header';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Main from './Main';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import '../index.css';

export default function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isViewPlacePopupOpen, setIsViewPlacePopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const [dataMessage, setDataMessage] = useState({});
  const [email, setEmail] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({
    name: '',
    about: '',
    avatar: '',
  });
  const [cards, setCards] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const history = useHistory();

  const tokenCheck = useCallback(() => {
    try {
      api
        .userMe()
        .then((data) => {
          setEmail(safeData(data.email));
          setLoggedIn(true);
          history.push(HOME_LINK);
        })
        .catch(() => {
          setLoggedIn(false);
        });
    } catch (err) {
      setLoggedIn(false);
    }
  }, [history]);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  const getToken = useCallback(() => {
    api
      .getToken()
      .catch(() => {});
  }, []);

  useEffect(() => {
    getToken();
  }, [getToken]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.userMe(), api.getInitialCards()])
        .then(([user, items]) => {
          const { name, about, avatar } = user;

          const userSafe = Object.assign(user, {
            name: safeData(name),
            about: safeData(about),
            avatar: safeData(avatar),
          });

          setCurrentUser(userSafe);

          setCards(items.map((i) => {
            const alt = safeData(i.name.replace(/"/g, ''));
            return Object.assign(i, {
              alt,
              name: safeData(i.name),
              link: safeData(i.link),
            });
          }));
        })
        .catch(({ message }) => consoleDebug(message));
    }
  }, [loggedIn]);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setIsViewPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i.owner === currentUser._id);

    api
      .changeLikeStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((prevCards) => prevCards.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch(({ message }) => consoleDebug(message));
  }

  function handleCardClick(props) {
    setSelectedCard(props);
    setIsViewPlacePopupOpen(true);
  }

  function handleUpdateUser(data) {
    setLoading(true);

    api
      .setUserInfo(data)
      .then(setCurrentUser)
      .then(closeAllPopups)
      .catch(({ message }) => consoleDebug(message))
      .finally(() => setLoading(false));
  }

  function handleAddPlace(data) {
    setLoading(true);

    return api
      .addItem(data)
      .then((card) => {
        setCards((prevCards) => [card, ...prevCards]);
      })
      .then(closeAllPopups)
      .catch(({ message }) => consoleDebug(message))
      .finally(() => setLoading(false));
  }

  function handleDeletePlace(card) {
    setLoading(true);

    return api
      .deleteItem(card._id)
      .then(() => {
        setCards(cards.filter((item) => item._id !== card._id));
      })
      .then(closeAllPopups)
      .catch(({ message }) => consoleDebug(message))
      .finally(() => setLoading(false));
  }

  function handleUpdateAvatar(data) {
    setLoading(true);

    return api
      .setUserAvatar(data)
      .then(setCurrentUser)
      .then(closeAllPopups)
      .catch(({ message }) => consoleDebug(message))
      .finally(() => setLoading(false));
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeletePlaceClick(props) {
    setSelectedCard(props);
    setIsDeletePlacePopupOpen(true);
  }

  function handleSignOut() {
    return api
      .logout()
      .then(() => {
        setLoggedIn(false);
        setEmail('');
      })
      .catch(({ message }) => consoleDebug(message));
  }

  function handlePopupAuth(data) {
    setDataMessage(data);
    setIsInfoTooltipPopupOpen(true);
  }

  function handleLogin(data) {
    api
      .login(data)
      .then(() => {
        setLoggedIn(true);
        setEmail(data.email);
        history.push(HOME_LINK);
      })
      .catch(() => {
        handlePopupAuth({
          isOk: false,
          message: 'Что-то пошло не так!\nПопробуйте еще раз.',
        });
      });
  }

  function handleRegister(data) {
    api
      .register(data)
      .then(() => {
        handlePopupAuth({
          isOk: true,
          message: 'Вы успешно\nзарегистрировались!',
        });
        history.push(SING_IN_LINK);
      })
      .catch(() => {
        handlePopupAuth({
          isOk: false,
          message: 'Что-то пошло не так!\nПробуйте еще раз.',
        });
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header
            email={email}
            loggedIn={loggedIn}
            onSignOut={handleSignOut}
          />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              history={history}
              component={Main}
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardDelete={handleDeletePlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onDeleteCard={handleDeletePlace}
            />
            <Route exact path={SING_IN_LINK}>
              <Login
                onLogin={handleLogin}
              />
            </Route>
            <Route exact path={SING_UP_LINK}>
              <Register
                onRegister={handleRegister}
              />
            </Route>
            <Route>
              <Error404 />
            </Route>
          </Switch>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
            isLoading={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <DeletePlacePopup
            isOpen={isDeletePlacePopupOpen}
            onClose={closeAllPopups}
            onDeletePlace={handleDeletePlace}
            card={selectedCard}
            isLoading={isLoading}
          />
          <ImagePopup
            isOpen={isViewPlacePopupOpen}
            onClose={closeAllPopups}
            card={selectedCard}
          />
          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            data={dataMessage}
          />
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
