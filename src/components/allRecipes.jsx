import React, { useState, useEffect } from "react";
import recipeService from "../services/recipeService";
import userService from "../services/userService";
import Recipe from "./recipe";
import "./css/allRecipes.css";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function recipesService() {
      const { data } = await recipeService.getRecipes();
      if (data.length > 0) setRecipes(data);
    }
    recipesService();
  }, []);

  const toggleFav = async (recipeId) => {
    await userService.toggleFavs(recipeId);
  };

  return (
    <React.Fragment>
      <div className="container main-container">
        <div className="row">
          <div className="col mt-5">
            <h1 className="fPrimary title-fSize txt-red">Search for</h1>
            <p className="fSecondary-roughThin subTitle-secondary mt-4">
              Your next{" "}
              <span className="fSecondary-rough  txt-green">meal </span>
            </p>
          </div>
        </div>
        <div className="row border-bottom pb-4">
          <div className="col-lg-4">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control fSecondary-regular"
                placeholder="Recipick.."
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary fSecondary-thin"
                  type="button"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {recipes.length > 0 &&
            recipes.map((recipe) => (
              <Recipe
                key={recipe._id}
                recipe={recipe}
                toggleFav={() => {
                  toggleFav(recipe._id);
                }}
              />
            ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default AllRecipes;
