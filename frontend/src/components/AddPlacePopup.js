import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [title, setTitle] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  function handleLink(e) {
    setLink(e.target.value);
  }

  function handleAddSubmit(e) {
    e.preventDefault();
    props.onPostNewCard({
      name: title,
      link: link,
    });
  }

  React.useEffect(() => {
    setTitle('');
    setLink('');
  }, [props.isOpen]);

  return (
    <PopupWithForm
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleAddSubmit}
        popupName='add' popupTitle='Новое место' buttonText='Создать' formName ='cardForm' >

        <input type="text" minLength="2" maxLength="30" required name="name" value={title} onChange={handleTitle} placeholder="Название" className="popup__input popup__input_field_title" id="title-input" />
        <span className="popup__error title-input-error"></span>
        <input type="url" required name="link" value={link} onChange={handleLink} placeholder="Ссылка на картинку" className="popup__input popup__input_field_link" id="link-input" />
        <span className="popup__error link-input-error"></span>

    </PopupWithForm>
  );
}

export default AddPlacePopup;