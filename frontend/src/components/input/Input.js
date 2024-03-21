
import React from "react";

function Input(props) {


  return (
    <div className="popup__field">
      {/* <!-- name --> */}
      <input
        value={props.value || ''}
        onChange={props.handleChange}
        minLength={props.minLength}
        maxLength={props.maxLength}
        name={props.name}
        type={props.type}
        required={props.required}
        placeholder={props.placeholder}
        className="popup__input"
        id={`${props.id_name_popup}-input-${props.id_name}`}
      />
      {/* <!-- error-mesage --> */}
      <span
        className="popup__error-mesage"
        id={`${props.id_name_popup}-${props.id_name}-error-mesage`}
      ></span>
    </div>
  );
}

export default Input;
