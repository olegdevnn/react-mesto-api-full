import React, { memo, useContext } from 'react';

import PropTypes from 'prop-types';

import CurrentUserContext from '../contexts/CurrentUserContext';
import Card from './Card';

const Main = ({
  onCardClick,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardLike,
  onCardDelete,
}) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image">
          <div
            className="profile__avatar"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          >
            <button
              type="button"
              aria-label="Редактировать аватар"
              className="profile__edit-button-avatar"
              onClick={onEditAvatar}
            />
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__title">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              aria-label="Редактировать профиль"
              className="profile__edit-button"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button
          type="button"
          aria-label="Добавить новое место"
          className="profile__add-button"
          onClick={onAddPlace}
        />
      </section>
      <section className="photos">
        <ul className="photos__list">
          {cards.map(({ ...card }) => (
            <Card
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              card={card}
            />
          ))}
        </ul>
      </section>
    </main>
  );
};

Main.propTypes = {
  onCardClick: PropTypes.func.isRequired,
  onAddPlace: PropTypes.func.isRequired,
  onEditProfile: PropTypes.func.isRequired,
  onEditAvatar: PropTypes.func.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCardDelete: PropTypes.func.isRequired,
  onCardLike: PropTypes.func.isRequired,
};

function areEqual(prevProps, nextProps) {
  return JSON.stringify(nextProps.cards) === JSON.stringify(prevProps.cards);
}

export default memo(Main, areEqual);
