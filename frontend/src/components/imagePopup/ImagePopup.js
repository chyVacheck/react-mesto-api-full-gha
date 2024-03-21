function ImagePopup({ card, onClose, isOpen }) {
  return (
    <section
      id="popup-card"
      className={
        isOpen
          ? "popup popup_background_darkness popup_opened"
          : "popup popup_background_darkness"
      }
    >
      <article id="popup-card-container" className="popup__card">
        <img
          className="popup__card-image"
          alt={card && card.name}
          src={card && card.link}
        />
        <h2 className="popup__card-title">{card && card.name}</h2>
        <button
          onClick={onClose}
          aria-label="Close window pop-up"
          type="button"
          id="card-button-close"
          className="popup__close-button button"
        />
      </article>
    </section>
  );
}

export default ImagePopup;
