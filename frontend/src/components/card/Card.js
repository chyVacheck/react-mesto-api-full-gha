
import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";


function Card(props) {
  const name = props.name;
  const link = props.link;
  const length = props.length;

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;

  //? Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `button elements__card-trash${isOwn ? '' : ' elements__card-trash_invisible'}`;

  //? Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id)

  //? Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `elements__card-like button${isLiked ? ' elements__card-like_active' : ''}`;

  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="elements__card">
      <button
        id="button-trash"
        onClick={handleDeleteClick}
        aria-label="удалить карточку"
        type="button"
        className={`${cardDeleteButtonClassName}`}
      />
      <button className="elements__card-image-button" onClick={handleClick}>
        <img className="elements__card-image" alt={name} src={link} />
      </button>
      <div className="elements__card-title-and-like">
        <h2 className="elements__card-title">{name}</h2>
        <div>
          <button
            onClick={handleLikeClick}
            id="button-like"
            aria-label="поставить или убрать лайк"
            type="button"
            className={`${cardLikeButtonClassName}`}
          />
          <p className="elements__card-like-number">{length}</p>
        </div>
      </div>
    </li>)
}

export default Card;
