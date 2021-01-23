import React from "react";
import "../css/form.css";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label className="fSecondary-regular" htmlFor={name}>
        {label}
      </label>
      <input
        {...rest}
        name={name}
        id={name}
        className="form-control fSecondary-regular input-bgc"
      />
      {error && <span className="text-danger">{error}</span>}
    </div>
  );
};

export default Input;
