import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import userService from "../services/userService";
import { Redirect } from "react-router-dom";
import "./css/business.css";

class bizSignup extends Form {
  state = {
    data: {
      email: "",
      password: "",
      name: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
    name: Joi.string().required().min(2).label("Name"),
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    data.biz = true;

    try {
      await http.post(`${apiUrl}/users`, data);
      await userService.login(data.email, data.password);
      window.location = "/create-recipe";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ errors: { email: "Email is taken" } });
      }
    }
  };

  render() {
    if (userService.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div className="container signup-container">
        <div className="row content-box">
          <div className="col-lg-7 mt-5">
            <h1 className="fPrimary title-fSize txt-red">
              Your business account
            </h1>
            <p className="fSecondary-roughThin subTitle-fSize">
              cooking your <br />
              <span className="fSecondary-rough  txt-green">favorite </span>
              recipes
            </p>
            <img className="order-img" src="/images/ordering.png" alt="" />
          </div>
          <div className="col-lg-5">
            <div className="biz-signup-box ">
              <h1 className="fPrimary mb-5 display-4">Join in</h1>
              <form
                onSubmit={this.handleSubmit}
                autoComplete="off"
                method="POST"
              >
                {this.renderInput("email", "Email", "email")}
                {this.renderInput("password", "Password", "password")}
                {this.renderInput("name", "Name")}
                {this.renderButton("Next")}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default bizSignup;
