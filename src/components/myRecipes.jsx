import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import recipeService from "../services/recipeService";
import Swal from "sweetalert2";
import Recipe from "./recipe";
import { toast } from "react-toastify";
import "sweetalert2/dist/sweetalert2.css";
import "./css/myRecipes.css";
import { motion } from "framer-motion";

const containerVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,

    transition: {
      duration: 1.5,
    },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function recipesService() {
      const { data } = await recipeService.getMyRecipes();

      if (data.length > 0) setRecipes(data);
    }
    recipesService();
  }, []);

  const onDelete = (recipeId) => {
    let { recipes } = this.state;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#55ac3d",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        try {
          await recipeService.deleteRecipe(recipeId);

          recipes = recipes.filter((recipe) => recipe._id !== recipeId);
          setRecipes({ recipes });
          toast.success("Your recipe has been deleted.");
        } catch (ex) {
          console.log(ex);
        }
      }
    });
  };

  return (
    <React.Fragment>
      <motion.div
        className="container"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="row border-bottom pb-4">
          <div className="col mt-5">
            <h1 className="fPrimary title-fSize txt-red">My recipes</h1>
            <p className="fSecondary-roughThin subTitle-secondary mt-4">
              Manage your{" "}
              <span className="fSecondary-rough  txt-green">recipes </span>
            </p>
            <Link
              className="btn btn-success fSecondary-roughThin"
              to="/create-recipe"
            >
              Add recipe
            </Link>
          </div>
        </div>
        <div className="row">
          {recipes.length > 0 &&
            recipes.map((recipe) => (
              <Recipe
                key={recipe._id}
                recipe={recipe}
                onDelete={() => onDelete(recipe._id)}
              />
            ))}
        </div>
      </motion.div>
    </React.Fragment>
  );
};

export default MyRecipes;
