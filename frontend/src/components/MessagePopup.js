import React from 'react';
import successIcon from '../images/success.svg';
import failIcon from '../images/fail.svg';

function MessagePopup({success, isOpen, onClose}) {
  return (
    <div className={`popup popup-message ` + (isOpen === true ? `popup_opened` : ``)}>
      <div className="popup__container">
        <img className='popup__icon' src={success === true ? successIcon : failIcon} alt={success === true ? 'успех' : 'провал'} />
        <h2 className="popup__title">{success === true ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
        <button type="button" className="popup__close" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default MessagePopup;