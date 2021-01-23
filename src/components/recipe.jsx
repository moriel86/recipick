import React from "react";
import { Link } from "react-router-dom";
import "./css/recipe.css";
import userService from "../services/userService";

const user = userService.getCurrentUser();
console.log("users list: ", user);

const Recipe = ({ recipe, onDelete, toggleFav }) => {
  console.log(recipe);
  return (
    <React.Fragment>
      <div className="col-md-6 col-lg-4 my-4">
        <div className="recipe-card">
          <div className="card-body">
            <h5 className="card-title fSecondary-rough">
              {recipe.title}{" "}
              <span onClick={toggleFav} className="fav-icon">
                <i className="far fa-heart"></i>
              </span>{" "}
            </h5>
          </div>
          <img
            className="img"
            width="300px"
            height="300px"
            src={recipe.image}
            alt={recipe.title}
          />
          <div className="card-body">
            <p className="card-text fSecondary-thin border-bottom pb-3">
              {recipe.ingredients}
            </p>
            <p className="card-text fSecondary-thin  ">{recipe.instructions}</p>
            {user._id === recipe.user_id && (
              <React.Fragment>
                <Link
                  className="fSecondary-rough text-secondary"
                  to={`/my-recipes/edit/${recipe._id}`}
                >
                  Edit
                </Link>

                <div
                  className="fSecondary-thin ml-2 txt-red delete-btn"
                  onClick={onDelete}
                >
                  Delete
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Recipe;
