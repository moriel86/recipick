import { motion } from "framer-motion";
import React from "react";

const About = () => {
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
  return (
    <motion.div
      className="container"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="row">
        <div className="col-12">
          <p>This realApp</p>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
