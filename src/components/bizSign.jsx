import React from "react";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import userService from "../services/userService";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";
import { Form, Formik, useField } from "formik";
import Input from "./common/input";
import { motion } from "framer-motion";
import "./css/business.css";

const bizSign = () => {
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

  if (userService.getCurrentUser()) return <Redirect to="/" />;

  return (
    <motion.div
      className="container signup-container"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
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
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                validationSchema.validate(values).catch((err) => {
                  console.log(err.name, err.errors);
                });
                const data = { ...values };
                data.biz = true;

                console.log("submitting", values);
                try {
                  await http.post(`${apiUrl}/users`, data);
                  await userService.login(data.email, data.password);
                  window.location = "/create-recipe";
                } catch (ex) {
                  console.log(ex);
                  /*   if (ex.response && ex.response.status === 400) {
        this.setState({ errors: { email: "Email is taken" } });
      }
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
                    Next
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
  );
};

export default bizSign;
