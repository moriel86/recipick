import React from "react";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import { toast } from "react-toastify";
import * as Yup from "yup";
import "./css/signup.css";
import { Form, Formik, useField } from "formik";
import Input from "./common/input";
import { useHistory } from "react-router-dom";

const Signingup = () => {
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(6).label("Password"),
    name: Yup.string().required().min(2).label("Name"),
  });

  const MyTextField = ({ label, type, ...props }) => {
    const [field, meta] = useField(props);
    const error = meta.error && meta.touched ? meta.error : "";

    return <Input {...field} label={label} type={type} error={error} />;
  };

  // if (userService.getCurrentUser()) return <Redirect to="/" />;

  return (
    <React.Fragment>
      <div className="container signup-container">
        <div className="row content-box">
          <div className="col-lg-6 mt-5">
            <h1 className="fPrimary  txt-red title-fSize">Some text here</h1>
            <p className="fSecondary-roughThin subTitle-fSize">
              cooking your <br />
              <span className="fSecondary-rough  txt-green">favorite </span>
              recipes
            </p>
            <img className="order-img" src="/images/ordering.png" alt="" />
          </div>
          <div className="col-lg-6">
            <div className="signup-box">
              <h1 className="fPrimary mb-5 display-4">Sign up</h1>
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  setSubmitting(true);
                  const newData = { ...values };
                  newData.biz = false;

                  console.log("submitting", values);
                  try {
                    await http.post(`${apiUrl}/users`, newData);
                    toast("You signed successfully");
                    history.replace("/welcome");
                  } catch (ex) {
                    console.log(ex);
                    /*  if (ex.response && ex.response.status === 400) {
                      this.setState({ error: { email: ex.response.data } });
                    } */
                  }
                }}
              >
                {({ values, error, isSubmitting, handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <MyTextField
                        type="email"
                        name="email"
                        label="Email"
                        error={error}
                      />
                    </div>
                    <div className="form-group">
                      <MyTextField
                        type="password"
                        name="password"
                        label="Password"
                        error={error}
                      />
                    </div>
                    <div className="form-group">
                      <MyTextField
                        type="text"
                        name="name"
                        label="Name"
                        error={error}
                      />
                    </div>
                    <button
                      className="btn btn-primary fSecondary-regular"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Signup
                    </button>
                    {/*      <pre className="mt-4">{JSON.stringify(values, null, 2)}</pre>
                  <pre className="mt-4">{JSON.stringify(error, null, 2)}</pre> */}
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signingup;
