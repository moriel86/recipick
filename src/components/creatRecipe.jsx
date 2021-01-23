import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import recipeService from "../services/recipeService";
import { toast } from "react-toastify";
import "./css/recipeForm.css";
import { Link } from "react-router-dom";

class CreatRecipe extends Form {
  state = {
    data: {
      title: "",
      instructions: "",
      ingredients: "",
      prepTime: "",
      difficulty: "",
      image: "",
    },
    errors: {},
  };

  schema = {
    title: Joi.string().min(2).max(255).required(),
    instructions: Joi.string().min(2).max(1024).required(),
    ingredients: Joi.string().min(2).max(1024).required(),
    prepTime: Joi.string().min(2).max(10).required(),
    difficulty: Joi.number().min(1).max(5).required(),
    image: Joi.string().min(11).max(1024).uri().allow(""),
  };

  doSubmit = async () => {
    const data = { ...this.state.data };

    if (!data.image) delete data.image;
    await recipeService.creatRecipe(data);
    toast("Your recipe created successfully");
    this.props.history.replace("/my-recipes");
  };

  render() {
    return (
      <div className="container signup-container">
        <div className="row content-box">
          <div className="col-lg-5 mt-5">
            <h1 className="fPrimary title-fSize txt-red">New recipe</h1>
            <p className="fSecondary-roughThin subTitle-fSize">
              Share your <br />
              <span className="fSecondary-rough  txt-green">best </span>
              recipes
            </p>
            <img
              className="order-img"
              src="/images/Professional-chef.png"
              alt=""
            />
          </div>
          <div className="col-lg-7">
            <div className="create-recipe-box ">
              <form
                onSubmit={this.handleSubmit}
                autoComplete="off"
                method="POST"
              >
                {this.renderInput("title", "Title")}
                {this.renderTextArea("instructions", "Instructions")}
                {this.renderTextArea("ingredients", "Ingredients")}
                {this.renderInput("prepTime", "Prepare time")}
                {this.renderInput("difficulty", "Difficulty", "number")}
                {this.renderInput("image", "Image")}
                {this.renderButton("Create")}
                <Link
                  className="btn btn-secondary ml-2 fSecondary-thin"
                  to="/my-recipes"
                >
                  Cancel
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatRecipe;
