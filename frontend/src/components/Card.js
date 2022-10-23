import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, imageWatchOpen, onCardLike, onDeleteCard}) {
  const currentUser = React.useContext(CurrentUserContext);
  const userId = currentUser._id;

  return (
    <div className="card">
      <button type="button" className={`card__delete ` + (card.owner._id !== userId && `card__delete_hidden`)} onClick={() => onDeleteCard(card)}></button>
      <img className="card__photo" src={card.link} alt={card.name} onClick={() => imageWatchOpen(card.link, card.name)} />
      <div className="card__caption-block">
        <h2 className="card__caption">{card.name}</h2>
        <div className="card__like-block">
          <button type="button" className={`card__like ` + (card.likes.some((like)=>{return userId === like}) && `card__like_active`)} onClick={() => onCardLike(card)}></button>
          <p className="card__number-of-likes">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;