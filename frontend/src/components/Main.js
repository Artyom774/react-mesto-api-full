import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import {CardContext} from '../contexts/CardContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const cards = React.useContext(CardContext);

  return (
    <main className="main">
      <section className="profile">
        <img className="profile__avatar" src={currentUser.avatar} alt="аватарка" />
        <div className="profile__avatar-change-icon" onClick={props.onEditAvatar}></div>
        <div className="profile__info">
          <div className="profile__name-box">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
      </section>
      <section className="cards">
        {cards.map((card) => (<Card card={card} key={card._id} imageWatchOpen={props.imageWatch} onCardLike={props.onCardLike} onDeleteCard={props.onDeleteCard} />))}
      </section>
    </main>
  );
}

export default Main;