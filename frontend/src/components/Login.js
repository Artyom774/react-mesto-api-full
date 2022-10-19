import React from 'react';
import { Link, withRouter } from 'react-router-dom'; 

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handPassword(e) {
    setPassword(e.target.value);
  }

  function handleRegisterSubmit(e) {
    e.preventDefault();
    props.authorizateUser(password, email);
    setEmail('');
    setPassword('');
  }

  return (
    <section className='sign'>
      <h1 className='sign__title'>Вход</h1>
      <form className='sign__form' onSubmit={handleRegisterSubmit}>
        <input type='email' id='email-input' name='email' value={email} onChange={handleEmail} required className='sign__input' placeholder='Email'></input>
        <input type='password' id='password-input' name='password' value={password} onChange={handPassword} required className='sign__input' placeholder='Пароль'></input>
        <button type='submit' className='sign__button'>Войти</button>
      </form>
    </section>
  );
}

export default withRouter(Login);