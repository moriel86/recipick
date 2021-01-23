import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import recipeService from "../services/recipeService";
import { toast } from "react-toastify";
import "./css/recipeForm.css";
import { Link } from "react-router-dom";

class EditRecipe extends Form {
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
    _id: Joi.string(),
    title: Joi.string().min(2).max(255).required(),
    instructions: Joi.string().min(2).max(1024).required(),
    ingredients: Joi.string().min(2).max(1024).required(),
    prepTime: Joi.string().min(2).max(10).required(),
    difficulty: Joi.number().min(1).max(5).required(),
    image: Joi.string().min(11).max(1024).uri().allow(""),
  };

  async componentDidMount() {
    const recipeId = this.props.match.params.id;
    const { data } = await recipeService.getRecipe(recipeId);
    this.setState({ data: this.mapToViewModel(data) });
  }
  mapToViewModel(recipe) {
    return {
      _id: recipe._id,
      title: recipe.title,
      instructions: recipe.instructions,
      ingredients: recipe.ingredients,
      prepTime: recipe.prepTime,
      difficulty: recipe.difficulty,
      image: recipe.image,
    };
  }

  doSubmit = async () => {
    const { data } = this.state;
    await recipeService.editRecipe(data);
    toast("Thank you for sharing");
    this.props.history.replace("/my-recipes");
  };

  render() {
    return (
      <div className="container signup-container">
        <div className="row content-box">
          <div className="col-lg-6 mt-5">
            <p className="fSecondary-roughThin subTitle-fSize">
              <span className="fSecondary-rough  txt-green">Edit </span>
              recipe
              <img className="order-img" src="/images/logo-full.svg" alt="" />
            </p>
          </div>
          <div className="col-lg-4">
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
                {this.renderButton("Done")}
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

export default EditRecipe;
