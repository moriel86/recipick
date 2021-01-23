import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";


const tokenKey = "token";
const favTokenKey = "favorite_recipes";

export async function toggleFavs(recipeId) {
    try {
        const result = await http.patch(`${apiUrl}/users/toggleFavs/${recipeId}`);
        let favorites = JSON.parse(localStorage.getItem(favTokenKey));
        if (favorites.includes(recipeId)) {
            favorites = favorites.filter(id => id !== recipeId);
        } else {
            favorites.push(recipeId);
        }

        localStorage.setItem(favTokenKey, JSON.stringify(favorites));

        return result;

    } catch (ex) {
        console.table(ex);
    }

};

export function getJwt() {
    return localStorage.getItem(tokenKey);
}
export function getFavs() {
    return localStorage.getItem(favTokenKey);
}

export function logout() {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(favTokenKey);
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    } catch (ex) {
        return null;
    }
}
export async function login(email, password) {
    const { data } = await http.post(`${apiUrl}/auth`, { email, password });
    console.log(data);
    localStorage.setItem(tokenKey, data.token);
    localStorage.setItem(favTokenKey, data.favorite_recipes);
}

const user = {
    login,
    getCurrentUser,
    logout,
    getJwt,
    toggleFavs,
    getFavs
};

export default user;