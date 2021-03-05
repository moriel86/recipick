import React from "react";
import { Link } from "react-router-dom";
import "./css/recipe.css";
import userService from "../services/userService";
import { motion } from "framer-motion";

const user = userService.getCurrentUser();

const containerVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,

    transition: {
      duration: 1,
    },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};

const Recipe = ({ recipe, onDelete, toggleFav, favIcon }) => {
  return (
    <React.Fragment>
      <motion.div
        className="col-md-6 col-lg-4 my-4"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="recipe-card">
          <div className="card-body">
            <h5 className="card-title fSecondary-rough">
              {recipe.title}
              <span onClick={toggleFav} className="fav-icon">
                <i
                  className={`far fa-heart ${
                    favIcon ? "text-success" : "text-secondary"
                  }`}
                ></i>
              </span>
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
            <div className="card-text fSecondary-thin border-bottom pb-3">
              {recipe.ingredients.map((ingredient) => {
                const { name, amount } = ingredient;

                return (
                  <>
                    <div key={Math.random().toString(36).substr(2, 9)}>
                      <p>
                        {amount} {name}
                      </p>
                    </div>
                  </>
                );
              })}
            </div>

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
      </motion.div>
    </React.Fragment>
  );
};

export default Recipe;
