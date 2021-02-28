import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import recipeService from "../services/recipeService";
import { toast } from "react-toastify";
import "./css/recipeForm.css";
import { Link, useHistory, useParams } from "react-router-dom";
import { Field, FieldArray, Form, Formik, useField } from "formik";
import TextArea from "./common/textarea";
import Input from "./common/input";
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

const RecipeEdit = () => {
  const history = useHistory();
  const params = useParams();
  const [formValues, setFormValues] = useState(null);

  const [initialValues] = useState({
    title: "",
    instructions: "",
    ingredients: [
      {
        name: "",
        amount: "",
      },
    ],
    prepTime: "",
    difficulty: "",
    image: "",
  });

  useEffect(() => {
    async function recipesService() {
      const recipeId = params.id;
      console.log(recipeId);
      let { data } = await recipeService.getRecipe(recipeId);
      console.log(data);
      data = mapToViewModel(data);
      setFormValues(data);

      console.log("This is data", data);
      console.log("This is initialValues", initialValues);
      console.log("this is form Values", formValues);
    }
    recipesService();
  }, []);

  const mapToViewModel = (recipe) => {
    return {
      title: recipe.title,
      instructions: recipe.instructions,
      ingredients: [
        {
          name: recipe.ingredients.name,
          amount: recipe.ingredients.amount,
        },
      ],
      prepTime: recipe.prepTime,
      difficulty: recipe.difficulty,
      image: recipe.image,
    };
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().min(2).max(255).required(),
    instructions: Yup.string().min(2).max(1024).required(),
    ingredients: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().min(2).max(255).required(),
        amount: Yup.number().min(2).max(50).required(),
      })
    ),
    prepTime: Yup.string().min(2).max(10).required(),
    difficulty: Yup.number().min(1).max(5).required(),
    image: Yup.string().min(11).max(1024).url(),
  });

  const MyTextField = ({ label, type, ...props }) => {
    const [field, meta] = useField(props);
    const error = meta.error && meta.touched ? meta.error : "";

    return <Input {...field} label={label} type={type} error={error} />;
  };

  const MyTextArea = ({ label, type, ...props }) => {
    const [field, meta] = useField(props);
    const error = meta.error && meta.touched ? meta.error : "";

    return <TextArea {...field} label={label} type={type} error={error} />;
  };
  const MyArrInput = ({ field, type, label }) => {
    return (
      <>
        <Input {...field} type={type} label={label} />
      </>
    );
  };

  return (
    <motion.div
      className="container createRecipe-container"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="row content-box my-5">
        <div className="col-lg-5 mt-5">
          <h1 className="fPrimary title-fSize txt-red">New recipe</h1>
          <p className="fSecondary-roughThin subTitle-fSize">
            Share your <br />
            <span className="fSecondary-rough  txt-green">best </span>
            recipes
          </p>
          <img className="chef" src="/images/Professional-chef.svg" alt="" />
        </div>
        <div className="col-lg-7">
          <div className="create-recipe-box ">
            <h1 className="fPrimary mb-5 display-4">Join in</h1>
            <Formik
              initialValues={formValues || initialValues}
              validationSchema={validationSchema}
              enableReinitialize
              onSubmit={async (
                values,
                { setSubmitting, resetForm, setErrors }
              ) => {
                const data = { ...values };
                console.log("submitting", data);
                setSubmitting(true);
                try {
                  if (!data.image) delete data.image;
                  await recipeService.editRecipe(data);
                  toast("Thank you for sharing");
                  history.replace("/my-recipes");
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
                    {<MyTextField name="title" label="Title" error={error} />}
                  </div>
                  <div className="form-group">
                    <MyTextArea
                      name="instructions"
                      label="Instructions"
                      error={error}
                    />
                  </div>
                  <div className="form-group">
                    <FieldArray name="ingredients">
                      {({ push, remove }) => (
                        <div>
                          {values.ingredients &&
                            values.ingredients.length > 0 &&
                            values.ingredients.map((ingredient, index) => {
                              return (
                                <div key={index}>
                                  <div className="row">
                                    <div className="col-5">
                                      <Field
                                        name={`{ingredients[${index}].name}`}
                                        label="Ingredient"
                                        component={MyArrInput}
                                        value={ingredient.name}
                                      />
                                    </div>
                                    <div className="col-2">
                                      <Field
                                        name={`ingredients[${index}].amount`}
                                        label="Amount"
                                        type="number"
                                        component={MyArrInput}
                                        value={ingredient.amount}
                                      />
                                    </div>
                                    <div className="col-5 my-auto">
                                      <button
                                        className="btn btn-secondary fSecondary-regular mt-3"
                                        type="button"
                                        onClick={() => remove(index)}
                                      >
                                        remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          <div className="col-4 my-auto">
                            <button
                              className="btn btn-primary fSecondary-regular"
                              type="button"
                              onClick={() => push({ name: "", amount: "" })}
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      )}
                    </FieldArray>
                  </div>

                  <div className="form-group">
                    <MyTextField
                      name="prepTime"
                      label="Prepare time"
                      error={error}
                    />
                  </div>
                  <div className="form-group">
                    <MyTextField
                      type="number"
                      name="difficulty"
                      label="Difficulty"
                      error={error}
                    />
                  </div>
                  <div className="form-group">
                    <MyTextField name="image" label="Image" error={error} />
                  </div>
                  <button
                    className="btn btn-primary fSecondary-regular"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Create
                  </button>
                  <Link
                    className="btn btn-secondary ml-2 fSecondary-thin"
                    to="/my-recipes"
                  >
                    Cancel
                  </Link>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeEdit;
