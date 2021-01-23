import React from "react";

const TextArea = ({ name, label, rows, error, ...rest }) => {
  return (
    <div className="form-group">
      <label className="fSecondary-regular" htmlFor={name}>
        {label}
      </label>
      <textarea
        {...rest}
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
