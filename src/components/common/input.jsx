import { useField } from "formik";
import React from "react";
import "../css/form.css";

const Input = ({ label, value, type = "text", error, ...props }) => {
  const [field] = useField(props);

  return (
    <div className="form-group">
      <label className="fSecondary-regular">{label}</label>
      <input
        {...field}
        type={type}
        className="form-control fSecondary-regular input-bgc"
      />
      {error && <span className="text-danger">{error}</span>}
    </div>
  );
};

export default Input;
