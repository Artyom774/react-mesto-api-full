import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup photo-popup ` + (props.isOpen === true ? `popup_opened` : ``)}>
        <div className="popup__photo-container">
            <img className="popup__photo" src={props.imageInfo.link} alt={props.imageInfo.title} />
            <h2 className="popup__caption">{props.imageInfo.title}</h2>
            <button type="button" className="popup__close" onClick={props.onClose}></button>
        </div>
    </div>
  );
}

export default ImagePopup; 