import SingForm from '../signForm/SignForm.js';
import { NavLink } from 'react-router-dom';

function Register({ handleRegistration }) {

  return (
    <section className="sign">
      <article className="sign__container">
        <SingForm
          onSubmit={handleRegistration}
          formTitle={'Регистрация'}
          submitTitle={'Зарегистрироваться'}
          id={'register'}
        />
        <h3 className="sign__already-registered">
          Уже зарегистрированы ? <NavLink className='link' to='/signin'>Войти</NavLink>
        </h3>
      </article>
    </section>
  )
}

export default Register;
