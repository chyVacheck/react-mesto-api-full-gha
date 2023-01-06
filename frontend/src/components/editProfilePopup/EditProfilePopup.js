
import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PopupWithForm from "../popupWithForm/PopupWithForm";
import Input from '../input/Input.js';
import useForm from "../../hooks/useForm";

function EditProfilePopup(props) {

  const isEditProfilePopupOpen = props.isOpen;
  const closeAllPopups = props.onClose;

  const { values, handleChange, setValues } = useForm({
    name: '',
    about: ''
  });

  //? Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  //? После загрузки текущего пользователя из API
  //? его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setValues({
      name: currentUser.name,
      about: currentUser.about
    });
  }, [currentUser, isEditProfilePopupOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name='profile'
      popupTitle='Редактировать профиль'
      buttonTitle={props.isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}
    >
      {/* name */}
      <Input
        isOpen={isEditProfilePopupOpen}
        value={values.name}
        handleChange={handleChange}
        name={'name'}
        type={'text'}
        minLength={2}
        maxLength={40}
        required={true}
        placeholder={'Введите имя'}
        id_name_popup={'edit'}
        id_name={'name'}
      />

      {/* info */}
      <Input
        isOpen={isEditProfilePopupOpen}
        value={values.about}
        handleChange={handleChange}
        name={'about'}
        type={'text'}
        minLength={2}
        maxLength={200}
        required={true}
        placeholder={'Введите информацию о вас'}
        id_name_popup={'edit'}
        id_name={'info'}
      />

    </PopupWithForm >
  )
}

export default EditProfilePopup;
