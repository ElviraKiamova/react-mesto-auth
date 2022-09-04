function Register() {
  return (
    <div className="login">
      <h2 className="login__title">Регистрация</h2>
      <form className="login__form">
        <input
          className="login__input"
          type="email"
          required
          placeholder="Email"
        />
        <input
          className="login__input"
          type="password"
          required
          placeholder="Пароль"
        />
        <button className="login__button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="login__text">
        Уже зарегистрированы?
      </p>
    </div>
  );
}

export default Register;
