function ImagePopup(props) {
  const selectedCard = props.card;
  const closeAllPopups = props.onClose;
  const isOpen = props.isOpen;

  return (
    <section id="popup-card" className={isOpen ? 'popup popup_background_darknes popup_opened' : 'popup popup_background_darknes'} >
      <article id="popup-card-container" className="popup__card">
        <img
          className="popup__card-image"
          alt={selectedCard === null ? null : selectedCard.name}
          src={selectedCard === null ? null : selectedCard.link}

        />
        <h2 className="popup__card-title">
          {selectedCard === null ? null : selectedCard.name}
        </h2>
        <button
          onClick={closeAllPopups}
          aria-label="закрыть окно pop-up"
          type="button"
          id="card-button-close"
          className="popup__close-button button"
        />
      </article>
    </section >
  )
}

export default ImagePopup;
