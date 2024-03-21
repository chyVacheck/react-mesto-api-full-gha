import SingForm from "../signForm/SignForm.js";
import { NavLink } from "react-router-dom";

function Register({ handleRegistration }) {
  return (
    <section className="sign">
      <article className="sign__container">
        <SingForm
          onSubmit={handleRegistration}
          formTitle={"Register"}
          submitTitle={"Register"}
          id={"register"}
        />
        <h3 className="sign__already-registered">
          Already Register ?{" "}
          <NavLink className="link" to="/signin">
            Login
          </NavLink>
        </h3>
      </article>
    </section>
  );
}

export default Register;
