import Joi from "joi-browser";
import React from "react";
import Form from "./common/form";
import userService from "../services/userService";
import { Redirect } from "react-router-dom";
import "./css/signin.css";

class Signin extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };
  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
  };

  doSubmit = async () => {
    const { email, password } = this.state.data;

    try {
      await userService.login(email, password);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ errors: { email: ex.response.data } });
      }
    }
  };

  render() {
    if (userService.getCurrentUser()) return <Redirect to="/" />;
    return (
      <React.Fragment>
        <div className="container signin-container">
          <div className="row content-box">
            <div className="col-lg-6 mt-5">
              <h1 className="fPrimary title-fSize txt-red">Some text here</h1>
              <p className="fSecondary-roughThin subTitle-fSize">
                cooking your <br />
                <span className="fSecondary-rough  txt-green">favorite </span>
                recipes
              </p>
              <img className="order-img" src="/images/ordering.png" alt="" />
            </div>
            <div className="col-lg-6">
              <div className="form-box ">
                <h1 className="fPrimary mb-5 display-4">Join in</h1>
                <form onSubmit={this.handleSubmit}>
                  {this.renderInput("email", "Email", "email")}
                  {this.renderInput("password", "Password", "password")}
                  {this.renderButton("Signin")}
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Signin;

/* const Signin = () => {

  const [data, setData] = useState({
    data: { email: "", password: "" },
    errors: {},
  });

  const { handleSubmit, renderButton, renderInput } = useContext(formContext);

  if (userService.getCurrentUser()) return <Redirect to="/" />;

  const schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
  };

  const doSubmit = async () => {
    const { email, password } = data;

    try {
      await userService.login(email, password);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setData({ errors: { email: ex.response.data } });
      }
    }
  };

  return (
    <React.Fragment>
      <div className="container signin-container">
        <div className="row content-box">
          <div className="col-lg-6 mt-5">
            <h1 className="fPrimary title-fSize txt-red">Some text here</h1>
            <p className="fSecondary-roughThin subTitle-fSize">
              cooking your <br />
              <span className="fSecondary-rough  txt-green">favorite </span>
              recipes
            </p>
            <img className="order-img" src="/images/ordering.png" alt="" />
          </div>
          <div className="col-lg-6">
            <div className="form-box ">
              <h1 className="fPrimary mb-5 display-4">Join in</h1>
              <form onSubmit={handleSubmit}>
                {renderInput("email", "Email", "email")}
                {renderInput("password", "Password", "password")}
                {renderButton("Signin")}
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signin; */
