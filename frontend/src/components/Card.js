import React, { memo, useContext } from 'react';

import PropTypes from 'prop-types';

import CurrentUserContext from '../contexts/CurrentUserContext';

/**
 * Создание карточки <Card /> компонента
 * @component
 * @param  props
 * @param  {function} props.onCardClick - Функция, которая вызывается при клике
 * @param  {function} props.onCardLike - Функция добавления/удаления лайка
 * @param  {function} props.onCardDelete - Функция удаления карточки
 * @param  {object} props.card - Данные карточки
 */
const Card = ({
  onCardClick,
  onCardLike,
  onCardDelete,
  card,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i.owner === currentUser._id);

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="photos__item">
      <button type="button" onClick={handleClick} className="photos__button" aria-label={card.alt}>
        <img
          src={card.link}
          alt={card.alt}
          className="photos__image"
        />
      </button>
      <h2 className="photos__title">{card.name}</h2>
      {isOwn && (
        <button
          type="button"
          aria-label="Удалить"
          className="photos__delete"
          onClick={handleDeleteClick}
        />
      )}
      <button
        type="button"
        aria-label="Избранное"
        className={`photos__favorite ${
          isLiked ? 'photos__favorite_active' : ''
        }`}
        onClick={handleLikeClick}
      />
      <span className="photos__likes">{card.likes.length}</span>
    </li>
  );
};

Card.propTypes = {
  /**
   * Данные карточки
   * */
  card: PropTypes.shape({
    /**
     * Название карточки
     * */
    name: PropTypes.string.isRequired,
    /**
     * Alt (название карточки) для изображения
     * */
    alt: PropTypes.string,
    /**
     * Ссылка на картинку
     * */
    link: PropTypes.string.isRequired,
    /**
     * Массив лайков карточки (с данными владельца)
     * */
    likes: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
    })).isRequired,
    /**
     * Данные владельца карточки
     * */
    owner: PropTypes.shape({
      _id: PropTypes.string,
    }).isRequired,
  }),
  onCardClick: PropTypes.func.isRequired,
  onCardLike: PropTypes.func.isRequired,
  onCardDelete: PropTypes.func.isRequired,
};

Card.defaultProps = {
  card: {
    _id: '',
    name: '',
    link: '',
    alt: '',
    likes: [],
    owner: [],
  },
};

function areEqual(prevProps, nextProps) {
  return JSON.stringify(nextProps) === JSON.stringify(prevProps);
}

export default memo(Card, areEqual);
