import React, { createContext, Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import TextArea from "./textarea";

export const formContext = createContext();

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderTextArea = (name, label, rows = "4") => {
    const { data, errors } = this.state;

    return (
      <TextArea
        rows={rows}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        errors={errors}
      />
    );
  };
  ichange = (input) => {
    console.log(input.currentTarget);
  };

  render() {
    return (
      <formContext.Provider
        value={(this.handleSubmit, this.renderButton, this.renderInput)}
      >
        {this.props.children}
      </formContext.Provider>
    );
  }
}

export default Form;

/* const Form = ({ children }) => {
  const [data, setData] = useState({
    data: {},
    errors: {},
  });

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  const handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  const renderButton = (label) => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };

  const RenderInput = ({name, label, type = "text"}) => {
    const [value, setValue] = useState("");
    const [errors, setErrors] = useState("")

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };

  const renderTextArea = (name, label, rows = "4") => {
    const { data, errors } = this.state;

    return (
      <TextArea
        rows={rows}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        errors={errors}
      />
    );
  };
  const ichange = (input) => {
    console.log(input.currentTarget);
  };

  return (
    <formContext.Provider value={{ handleSubmit, renderButton, renderInput }}>
      {children}
    </formContext.Provider>
  );
};

export default Form; */
