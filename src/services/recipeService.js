import http from "./httpService";
import { apiUrl } from "../config.json";

export function getRecipes() {
  return http.get(`${apiUrl}/recipes/all-recipes`)
}

export function deleteRecipe(recipeId) {
  return http.delete(`${apiUrl}/recipes/${recipeId}`);
};

export function getRecipe(recipeId) {
  return http.get(`${apiUrl}/recipes/${recipeId}`);
}

export function editRecipe(recipe) {
  const recipeId = recipe._id;
  delete recipe._id;

  return http.put(`${apiUrl}/recipes/${recipeId}`, recipe);
}

export function getMyRecipes() {
  return http.get(`${apiUrl}/recipes/my-recipes`)
}

export function creatRecipe(recipe) {

  return http.post(`${apiUrl}/recipes`, recipe);
}

const service = {
  creatRecipe,
  getMyRecipes,
  editRecipe,
  getRecipe,
  deleteRecipe,
  getRecipes
};

export default service;
