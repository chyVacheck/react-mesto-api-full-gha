
import SingForm from '../signForm/SignForm.js';

function Login({ handleAuthorization }) {
  return (
    <section className="sign">
      <article className="sign__container">
        <SingForm
          onSubmit={handleAuthorization}
          formTitle={'Вход'}
          submitTitle={'Войти'}
          id={'login'}
        />
      </article>
    </section>
  )
}

export default Login;
