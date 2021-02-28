import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./components/home";

import Logout from "./components/logout";
import userService from "./services/userService";
import ProtectedRoute from "./components/common/protectedRoute";
import MyRecipes from "./components/myRecipes";
import AllRecipes from "./components/allRecipes";
import Signing from "./components/signing";
import Signingup from "./components/signingup";
import bizSign from "./components/bizSign";
import CreatNewRecipe from "./components/creatNewRecipe";
import RecipeEdit from "./components/recipeEdit";

import { ToastContainer } from 'react-toastify';
import { Switch, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';




const App = () => {

  const location = useLocation()
  const [user, setUser] = useState()


  useEffect(() => {
    async function recipesService() {
      const user = userService.getCurrentUser();
      console.log(user, "user");
      setUser(user);
    }
    recipesService();
  }, []);


  return (
    <React.Fragment>
      <header>
        <ToastContainer />
        <Navbar user={user} />
      </header>
      <main style={{ minHeight: "100vh" }} >
        <AnimatePresence exitBeforeEnter >
          <Switch location={location} key={location.key} >
            <ProtectedRoute path="/my-recipes/edit/:id" component={RecipeEdit} biz={true} />
            <ProtectedRoute path="/my-recipes" component={MyRecipes} biz={true} />
            <ProtectedRoute path="/create-recipe" component={CreatNewRecipe} biz={true} />
            <Route path="/biz-signup" component={bizSign} />
            <Route path="/all-recipes" component={AllRecipes} />
            <Route path="/logout" component={Logout} />
            <Route path="/signin" component={Signing} />
            <Route path="/Signup" component={Signingup} />

            <Route path="/" exact component={Home} />
          </Switch>
        </AnimatePresence>
      </main>
      <footer>
        <Footer />
      </footer>
    </React.Fragment>);
}

export default App;