import { useField } from "formik";
import React from "react";
import "../css/form.css";

const InputArray = ({ label, type = "text", error, ...props }) => {
  const [field] = useField(props);

  return (
    <div className="form-group">
      <label className="fSecondary-regular">{label}</label>
      <div className="col">
        <input
          {...field}
          type={type}
          className="form-control fSecondary-regular input-bgc"
        />
      </div>
      <div className="col">
        <input
          placeholder="0"
          name="amount"
          type="number"
          className="form-control fSecondary-regular input-bgc"
        />
      </div>

      {error && <span className="text-danger">{error}</span>}
    </div>
  );
};

export default InputArray;
