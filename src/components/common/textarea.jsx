import { useField } from "formik";
import React from "react";

const TextArea = ({ name, label, rows = "4", error, ...props }) => {
  const [field] = useField(name, props);

  return (
    <div className="form-group">
      <label className="fSecondary-regular">{label}</label>
      <textarea
        {...field}
        name={name}
        id={name}
        rows={rows}
        className="form-control fSecondary-regular input-bgc"
      ></textarea>
      {error && <span className="text-danger">{error}</span>}
    </div>
  );
};

export default TextArea;
