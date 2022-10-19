import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';
import { useForm } from '../hooks/useForm';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleName(e) {
    setName(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  React.useEffect(() => {
    if (currentUser.name !== undefined) {
      setName(currentUser.name);
      setDescription(currentUser.about);}
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleEditSubmit}
        popupName='edit' popupTitle='Редактировать профиль' buttonText='Сохранить' formName ='nameForm' >

        <input type="text" minLength="2" maxLength="40" required name="name" value={name} onChange={handleName} className="popup__input popup__input_field_name" id="name-input" />
        <span className="popup__error name-input-error"></span>
        <input type="text" minLength="2" maxLength="200" required name="job" value={description} onChange={handleDescription} className="popup__input popup__input_field_job" id="description-input" />
        <span className="popup__error description-input-error"></span>

    </PopupWithForm>
  );
}

export default EditProfilePopup;