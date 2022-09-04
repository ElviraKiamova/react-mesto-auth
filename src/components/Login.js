
function Login() {

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
