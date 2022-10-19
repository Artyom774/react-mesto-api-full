import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const inputAvatarRef = React.useRef();

  function handleAvatarSubmit(e) {
    e.preventDefault();  
    props.onUpdateAvatar({
      avatar: inputAvatarRef.current.value
    });
  }

  React.useEffect(() => {
    inputAvatarRef.current.value = '';
  }, [props.isOpen]);

  return (
    <PopupWithForm
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={handleAvatarSubmit}
    popupName='avatar' popupTitle='Обновить аватар' buttonText='Сохранить' formName ='avatarForm' >

    <input type="url" required name="avatar" ref={inputAvatarRef} placeholder="Ссылка на аватар" className="popup__input popup__input_field_avatar" id="avatar-input" />
    <span className="popup__error avatar-input-error"></span>

    </PopupWithForm>
  );
}

export default EditAvatarPopup;