import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { SING_IN_LINK } from '../../utils/utils';

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    onRegister({
      email,
      password,
    });
  }

  const handleSetEmail = (e) => setEmail(e.target.value);

  const handleSetPassword = (e) => setPassword(e.target.value);

  return (
    <main className="content">
      <section className="auth">
        <p className="auth__title">Регистрация</p>
        <form onSubmit={handleSubmit} className="auth__form">
          <div>
            <div className="auth__inner">
              <label htmlFor="auth-email-input">
                <input
                  id="auth-email-input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="auth__input"
                  required
                  autoComplete="email"
                  minLength="2"
                  maxLength="40"
                  onChange={handleSetEmail}
                />
                <span
                  id="auth-email-input-error"
                  className="auth__input-error"
                />
              </label>
            </div>
            <div className="auth__inner">
              <label htmlFor="auth-password-input">
                <input
                  id="auth-password-input"
                  type="password"
                  name="new-password"
                  placeholder="Пароль"
                  className="auth__input"
                  required
                  autoComplete="new-password"
                  minLength="2"
                  maxLength="200"
                  onChange={handleSetPassword}
                />
                <span id="auth-password-input-error" className="auth__input-error" />
              </label>
            </div>
          </div>
          <button className="auth__save-button" type="submit" aria-label="Зарегистрироваться">
            Зарегистрироваться
          </button>
        </form>
        <Link to={SING_IN_LINK} className="auth__login-link">Уже зарегистрированы? Войти</Link>
      </section>
    </main>
  );
};

Register.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

export default Register;
