import React, { Component } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./css/home.css";

class Home extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <motion.div
          className="container-fluid home-container d-flex align-items-center hero-1"
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
        >
          <div className="row mx-auto">
            <div className="col-lg-7">
              <motion.h1
                initial={{ opacity: 0, translateY: -120 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 1.5 }}
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
              <Link to={"/recipes"}>
                <motion.button
                  initial={{ opacity: 0, scale: 0.6, translateY: -8 }}
                  animate={{ opacity: 1, scale: 1, translateY: 1 }}
                  transition={{ duration: 1.4 }}
                  className="btn btn-success"
                >
                  <span className="fSecondary-regular"> Pick recipe</span>
                </motion.button>
              </Link>
            </div>
            <div className="col-lg-5">
              <img
                src="/images/recipe-book.png"
                className="recipe-book"
                alt=""
              />
            </div>
          </div>
        </motion.div>
      </React.Fragment>
    );
  }
}

export default Home;
