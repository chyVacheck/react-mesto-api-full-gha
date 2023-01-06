
import useForm from "../../hooks/useForm";

function SingForm({ onSubmit, formTitle, id, submitTitle }) {

  const { values, handleChange, setValues } = useForm({
    email: '',
    password: ''
  });

  function submit(evt) {
    evt.preventDefault();
    onSubmit(values.email, values.password);
    setValues({
      email: '',
      password: ''
    })
  }

  return (
    <form
      className='sign__form'
      onSubmit={submit}
      name='sing-form'
      id={`sing-form-${id}`}
    >
      <h3 className="sign__title">{formTitle}</h3>
      {/*todo noValidate */}
      {/* all inputs */}
      {/* email */}
      <div className='sign__field'>
        <input
          className='sign__input'
          value={values.email || ''}
          onChange={handleChange}
          name='email'
          type='email'
          minLength={2}
          maxLength={40}
          required={true}
          placeholder='Email'
        />
      </div>
      {/* password */}
      <div className='sign__field'>
        <input
          className='sign__input'
          value={values.password || ''}
          onChange={handleChange}
          name='password'
          type='password'
          minLength={2}
          maxLength={40}
          required={true}
          placeholder='Пароль'
        />
      </div>
      {/* submit */}
      <button
        //todo сделать валидацию и убрать коментрарий disabled
        type="submit"
        id={`sing-button-submit-${id}`}
        className="sign__submit-button button" //todo сделать валидацию и поставить модификатор invalid
      >
        {submitTitle}
      </button>
    </form>
  )
}

export default SingForm;
