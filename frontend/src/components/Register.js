import React from 'react';
import { Link, withRouter } from 'react-router-dom'; 

function Register(props) {
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
    props.registrationUser(password, email);
    setEmail('');
    setPassword('');
  }

  return (
    <section className='sign'>
      <h1 className='sign__title'>Регистрация</h1>
      <form className='sign__form' onSubmit={handleRegisterSubmit}>
        <input type='email' id='email-input' name='email' value={email} onChange={handleEmail} required className='sign__input' placeholder='Email'></input>
        <input type='password' id='password-input' name='password' value={password} onChange={handPassword} required className='sign__input' placeholder='Пароль'></input>
        <button type='submit' className='sign__button'>Зарегистрироваться</button>
      </form>
      <a href='/sign-in' type='button' className='sign__button-sign-in'>Уже зарегистрированы? Войти</a>
    </section>
  );
}

export default withRouter(Register);