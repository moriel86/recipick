import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./components/home";
import About from "./components/about";
import Logout from "./components/logout";
import { Switch, Route } from "react-router-dom";
import Signup from "./components/signup";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signin from "./components/signin";
import userService from "./services/userService";
import bizSignup from "./components/bizSignup";
import CreatRecipe from "./components/creatRecipe";
import ProtectedRoute from "./components/common/protectedRoute";
import MyRecipes from "./components/myRecipes";
import EditRecipe from "./components/editRecipe";
import { AnimatePresence } from "framer-motion";
import AllRecipes from "./components/allRecipes";




class App extends Component {

  state = {};

  componentDidMount() {
    const user = userService.getCurrentUser();
    this.setState({ user });
  }
  render() {

    const { user } = this.state;
    return (
      <React.Fragment>
        <header>
          <ToastContainer />
          <Navbar user={user} />
        </header>
        <main style={{ minHeight: "100vh" }} >
          <AnimatePresence initial={false} exitBeforeEnter>
            <Switch>
              <ProtectedRoute path="/my-recipes/edit/:id" component={EditRecipe} biz={true} />
              <ProtectedRoute path="/my-recipes" component={MyRecipes} biz={true} />
              <ProtectedRoute path="/create-recipe" component={CreatRecipe} biz={true} />
              <Route path="/biz-signup" component={bizSignup} />
              <Route path="/all-recipes" component={AllRecipes} />
              <Route path="/logout" component={Logout} />
              <Route path="/signin" component={Signin} />
              <Route path="/signup" component={Signup} />
              <Route path="/about" component={About} />
              <Route path="/" exact component={Home} />
            </Switch>
          </AnimatePresence>
        </main>
        <footer>
          <Footer />
        </footer>
      </React.Fragment>
    );

  }
}

export default App;