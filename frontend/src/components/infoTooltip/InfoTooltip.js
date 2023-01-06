
function InfoTooltip({ isOpen, img, alt, message, onClose }) {
  return (
    <section id={`popup-InfoTooltip`} className={isOpen ? 'popup popup_opened' : 'popup'}>
      <article id={`popup-InfoTooltip-container`} className="popup__container popup__container_biger">
        <img
          src={img}
          className="popup__infoTooltip-img"
          alt={alt}
        />
        <p className="popup__infoTooltip-message">
          {message}
        </p>
        <button
          aria-label="закрыть окно pop-up"
          type="button"
          id={`InfoTooltip-button-close`}
          className="popup__close-button button"
          onClick={onClose}
        ></button>
      </article>
    </section>
  );
}

export default InfoTooltip;