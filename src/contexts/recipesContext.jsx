import React, { createContext, useEffect, useState } from "react";
import recipeService from "../services/recipeService";

export const recipesContext = createContext();

const RecipeContextProvider = (props) => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [myRecipes, setMyRecipes] = useState([]);

  // all recipes
  useEffect(() => {
    async function recipesService() {
      const { data } = await recipeService.getRecipes();
      if (data.length > 0) setAllRecipes({ recipes: data });
    }
    recipesService();
  }, [allRecipes]);

  //my recipes
  useEffect(() => {
    async function recipesService() {
      const { data } = await recipeService.getMyRecipes();
      if (data.length > 0) setMyRecipes({ recipes: data });
    }
    recipesService();
  }, [myRecipes]);

  return (
    <recipesContext.Provider value={{ allRecipes, myRecipes }}>
      {props.children}
    </recipesContext.Provider>
  );
};

export default RecipeContextProvider;
