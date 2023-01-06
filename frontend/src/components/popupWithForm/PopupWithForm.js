function PopupWithForm({
  isOpen, onClose, name, popupTitle, buttonTitle, children, onSubmit
}) {

  return (
    <section id={`popup-${name}`} className={isOpen ? 'popup popup_opened' : 'popup'}>
      <article id={`popup-${name}-container`} className="popup__container">
        <h2 className="popup__title">{popupTitle}</h2>
        <form onSubmit={onSubmit} name={`${name}-form`} id={`${name}-popup-form`}> {/*todo noValidate */}
          {/* all inputs */}
          {children}
          {/* submit */}
          <button
            //todo сделать валидацию и убрать коментрарий disabled
            type="submit"
            id={`${name}-button-submit`}
            className="popup__submit-button button popup__submit-button_valid" //todo сделать валидацию и поставить модификатор invalid
          >
            {buttonTitle}
          </button>
        </form>

        <button
          aria-label="закрыть окно pop-up"
          type="button"
          id={`${name}-button-close`}
          className="popup__close-button button"
          onClick={onClose}
        ></button>
      </article>
    </section>

  )
}

export default PopupWithForm;
