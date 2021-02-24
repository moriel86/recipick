import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import Input from "./common/input";
import userService from "../services/userService";
// import { Redirect } from "react-router-dom";
import "./css/signin.css";
import { motion } from "framer-motion";

const containerVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,

    transition: {
      duration: 1,
    },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};

const Signing = () => {
  // if (userService.getCurrentUser()) return <Redirect to="/" />;
  const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(6).label("Password"),
  });

  const MyTextField = ({ label, type, ...props }) => {
    const [field, meta] = useField(props);
    const error = meta.error && meta.touched ? meta.error : "";

    return <Input {...field} label={label} type={type} error={error} />;
  };
  return (
    <React.Fragment>
      <motion.div
        className="container signin-container"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="row content-box">
          <div className="col-lg-6 mt-5">
            <h1 className="fPrimary title-fSize txt-red">Some text here</h1>
            <p className="fSecondary-roughThin subTitle-fSize">
              cooking your <br />
              <span className="fSecondary-rough  txt-green">favorite </span>
              recipes
            </p>
            <img className="order-img" src="/images/ordering.svg" alt="" />
          </div>
          <div className="col-lg-6">
            <div className="form-box">
              <h1 className="fPrimary mb-5 display-4">Join in</h1>
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={async (
                  values,
                  { setSubmitting, resetForm, setErrors }
                ) => {
                  const { email, password } = values;
                  console.log("submitting", values);
                  try {
                    await userService.login(email, password);
                    setSubmitting(true);
                    resetForm();
                    setSubmitting(false);
                    window.location = "/";
                  } catch (ex) {
                    if (ex.response && ex.response.status === 400) {
                      setErrors({ email: ex.response.data });
                    }
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
                    <button
                      className="btn btn-primary fSecondary-regular"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Signin
                    </button>
                    {/*      <pre className="mt-4">{JSON.stringify(values, null, 2)}</pre>
                  <pre className="mt-4">{JSON.stringify(error, null, 2)}</pre> */}
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </motion.div>
    </React.Fragment>
  );
};

export default Signing;
