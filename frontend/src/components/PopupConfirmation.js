import React from 'react';
import PopupWithForm from './PopupWithForm';

function PopupConfirmation(props) {
  return (
    <PopupWithForm
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={()=>{}}
    popupName='delete' popupTitle='Вы уверены?' buttonText='Да' formName ='confirmationForm' >

    </PopupWithForm>
  );
}

export default PopupConfirmation;