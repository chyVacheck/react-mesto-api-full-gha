import React from "react";

function BurgerMenu({ close, setClose, onClick, currentEmail, handleSignOut }) {
  function handleClick() {
    setClose(!close);
    onClick();
  }

  return (
    <section className="burgerMenu">
      <button
        id="burgerMenu-button"
        onClick={handleClick}
        className={
          close
            ? "burgerMenu__button burgerMenu__button_close button"
            : "burgerMenu__button button"
        }
      />
      <div className="burgerMenu__info">
        <p className="burgerMenu__email">{currentEmail}</p>
        <button className="burgerMenu__signout button" onClick={handleSignOut}>
          Logout
        </button>
      </div>
    </section>
  );
}

export default BurgerMenu;
