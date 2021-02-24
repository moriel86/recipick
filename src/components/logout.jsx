import { motion } from "framer-motion";
import { useEffect } from "react";
import userService from "../services/userService";

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

const Logout = () => {
  useEffect(() => {
    async function loggingOut() {
      userService.logout();
      window.location = "/signing";
    }
    loggingOut();
  }, []);
  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      ></motion.div>
    </>
  );
};

export default Logout;
