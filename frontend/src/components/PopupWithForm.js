import React from 'react';

function PopupWithForm({isOpen, onClose, onSubmit, popupName, popupTitle, formName, buttonText, children}) {
  return (
    <div className={`popup popup-${popupName} ` + (isOpen === true ? `popup_opened` : ``)}>
      <div className="popup__container">
        <h2 className="popup__title">{popupTitle}</h2>
          <form className="popup__form" name={formName} onSubmit={onSubmit}>
            {children}
            <button type="submit" className="popup__submit-button">{buttonText}</button>
          </form>
        <button type="button" className="popup__close" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default PopupWithForm;