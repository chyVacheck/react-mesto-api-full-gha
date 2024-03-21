import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PopupWithForm from "../popupWithForm/PopupWithForm";
import Input from "../input/Input.js";
import useForm from "../../hooks/useForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    about: "",
  });

  //? Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  //? После загрузки текущего пользователя из API
  //? его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setValues({
      name: currentUser.name,
      about: currentUser.about,
    });
  }, [currentUser, isOpen, setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="profile"
      popupTitle="Update profile"
      buttonTitle={isLoading ? "Saving..." : "Save"}
      isOpen={isOpen}
      onClose={onClose}
    >
      {/* name */}
      <Input
        isOpen={isOpen}
        value={values.name}
        handleChange={handleChange}
        name={"name"}
        type={"text"}
        minLength={2}
        maxLength={40}
        required={true}
        placeholder={"Enter name"}
        id_name_popup={"edit"}
        id_name={"name"}
      />

      {/* info */}
      <Input
        isOpen={isOpen}
        value={values.about}
        handleChange={handleChange}
        name={"about"}
        type={"text"}
        minLength={2}
        maxLength={200}
        required={true}
        placeholder={"Enter info about you"}
        id_name_popup={"edit"}
        id_name={"info"}
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
