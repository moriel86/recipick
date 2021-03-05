import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./css/home.css";
import Rellax from "rellax";

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
  useEffect(() => {
    new Rellax(".text-rellax", {
      // <---- Via class name
      speed: 2,
      center: true,
      wrapper: null,
      round: true,
      vertical: true,
      horizontal: false,
    });
    new Rellax(".img-rellax", {
      // <---- Via class name
      speed: 3,
      center: true,
      wrapper: null,
      round: false,
      vertical: true,
      horizontal: false,
    });
  }, []);

  const leafS = `url(${process.env.PUBLIC_URL + "/images/leaf-bgc.svg"})`;

  return (
    <React.Fragment>
      <motion.div
        className="home-container "
        style={{ backgroundImage: leafS }}
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="container main-container">
          <div className="row mx-auto">
            <div className="col-sm-7">
              <motion.h1
                variants={titleVariants}
                className="fPrimary title-fSize txt-red"
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
            <div className="recipe-img col-sm-5">
              <img
                src="/images/recipe-book.svg"
                className="recipe-book"
                alt=""
              />
            </div>
          </div>
          <div className="row txt-row mt-5">
            <div className="col-md-10 txt-wrap">
              <p className="fSecondary-roughThin subTitle-fSize text-rellax">
                In this web-app we created a <br /> way for businesses to create
                their
              </p>
            </div>
          </div>
          <div className="row txt-row">
            <div className="col-md-10 txt-wrap">
              <p className="fSecondary-roughThin subTitle-fSize float-right text-rellax">
                online business cards to <br /> keep in touch with their <br />{" "}
                costumers.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <p className="fSecondary-roughThin subTitle-fSize txt-row txt-wrap text-rellax">
                Give yourself a <br /> lifetime of{" "}
                <span className="fPrimary txt-red title-secondary txt-mark">
                  cooking confidence
                </span>
              </p>
            </div>
            <div className="col-md-4 mt-5">
              <img
                className="couple-cook-home img-rellax"
                src="/images/couple-cook.svg"
                alt=""
              />
            </div>
          </div>
          <div className="row mt-5">
            <div className="col mt-5">
              <h2 className="fPrimary title-fSize txt-red text-right mt-5 text-capitalize text-rellax">
                And try new recipes
              </h2>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col mt-5">
              <p className="fSecondary-roughThin subTitle-fSize txt-row txt-wrap text-center mt-5 text-rellax">
                Cards are created by businesses <br /> and can be saved by
                potential <br /> costumers.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <img
                className="img-fluid img-rellax"
                src="/images/recipes.svg"
                alt=""
              />
            </div>
            <div className="col mt-5 ml-3 text-rellax">
              <h2 className="fPrimary title-fSize txt-red mt-5">Great Ideas</h2>
              <h2 className="fPrimary title-fSize txt-red text-right mt-5">
                You’ll Love
              </h2>
            </div>
          </div>
          <div className="row mt-5 text-rellax">
            <div className="col mt-5 ">
              <p className="fSecondary-roughThin subTitle-fSize txt-row txt-wrap text-center mt-5">
                Users can browse for cards created by businesses and save their
                favorite cards.
              </p>
            </div>
            <div className="col mt-5">
              <p className="fSecondary-roughThin subTitle-fSize txt-row txt-wrap text-center mt-5">
                Businesses create their digital business cards online.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </React.Fragment>
  );
};

export default Home;
