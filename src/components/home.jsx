import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./css/home.css";

const buttonVariants = {
  initial: {
    opacity: 0,
    scale: 0.6,
    translateY: -8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    translateY: 1,
    transition: {
      duration: 1.2,
    },
  },
};

const titleVariants = {
  initial: {
    opacity: 0,
    translateY: -120,
  },
  animate: {
    opacity: 1,
    translateY: 0,
    transition: {
      duration: 1.5,
      delay: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: { ease: "easeInOut" },
  },
};

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

const Home = () => {
  return (
    <React.Fragment>
      <motion.div
        className="container-fluid home-container d-flex align-items-center hero-1"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="row mx-auto">
          <div className="col-lg-7">
            <motion.h1
              variants={titleVariants}
              className="fPrimary display-2 txt-red"
            >
              Search, Pick,
              <br /> Cook
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="fSecondary-roughThin subTitle-fSize"
            >
              Special recipes <br /> from special <br /> People
            </motion.p>
            <Link to={"/all-recipes"}>
              <motion.button
                variants={buttonVariants}
                className="btn btn-success"
              >
                <span className="fSecondary-regular"> Pick recipe</span>
              </motion.button>
            </Link>
          </div>
          <div className="col-lg-5">
            <img src="/images/recipe-book.svg" className="recipe-book" alt="" />
          </div>
        </div>
      </motion.div>
    </React.Fragment>
  );
};

export default Home;
