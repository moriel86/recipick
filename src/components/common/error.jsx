import { useField } from "formik";
import React from "react";
import "../css/form.css";

const Error = ({ touched, message }) => {
  if (touched === false) return <div className="form-message invalid"></div>;

  if (message) return <div className="form-message invalid"> {message} </div>;
  return <div className="form-message invalid">All good</div>;
};

export default Error;
