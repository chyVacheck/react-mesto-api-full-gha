import React from "react";
import defaultAvatar from "../../images/avatar.png";

//? импорт компонентов
import Card from "./../card/Card.js";

//? импорт данных о пользователе
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function Main(props) {
  const cards = props.cards;
  const handleCardDelete = props.handleCardDelete;
  const handleCardLike = props.handleCardLike;

  const currentUser = React.useContext(CurrentUserContext);

  const handleEditAvatarClick = props.onEditAvatar;

  const handleEditProfileClick = props.onEditProfile;

  const handleAddPlaceClick = props.onAddPlace;

  return (
    <main className="content">
      {/* секция profile */}
      <section className="profile">
        <div
          onClick={handleEditAvatarClick}
          style={{
            backgroundImage: `url(${currentUser.avatar || defaultAvatar})`,
          }}
          className="profile__avatar"
        ></div>
        <div className="profile__info">
          <div className="profile__nick-and-button">
            <h1 className="profile__nickname">
              {currentUser.name || "Жак-Ив Кусто"}
            </h1>
            <button
              onClick={handleEditProfileClick}
              aria-label="open update profile"
              type="button"
              className="profile__edit-button button"
            />
          </div>
          <p className="profile__description">
            {currentUser.about || "Searcher of ocean"}
          </p>
        </div>
        <button
          onClick={handleAddPlaceClick}
          aria-label="open window to add new card"
          type="button"
          className="profile__add-button button"
        />
      </section>
      {/* секция elements */}
      <section className="elements">
        <ul className="elements__list-cards">
          {cards.map((item) => {
            return (
              <Card
                onCardDelete={handleCardDelete}
                onCardLike={handleCardLike}
                key={item._id}
                name={item.name}
                link={item.link}
                card={item}
                length={item.likes.length}
                onCardClick={props.onCardClick}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
