import React from 'react';
import logo from '../images/mesto-logo.svg';
import { Link, useHistory } from 'react-router-dom'; 

function Header(props) {
  const history = useHistory();

  function signOut(){
    localStorage.removeItem('token');
    history.push('/sign-in');
    props.setLoggedIn(false);
  }

  function handleHeaderButton() {
    if (props.loggedIn) {signOut();}
    else {history.push('/sign-up');}
  }

  return (
    <header className="header">
      <a href="#"><img className="header__logo" src={logo} alt="Место" /></a>
      <p className='header__email'>{props.email}</p>
      <button type='button' className={`header__link ` + (props.loggedIn ? `color_grey` : ``)} onClick={handleHeaderButton}>{props.loggedIn ? 'Выйти' : 'Регистрация'}</button>
    </header>
  );
}

export default Header;