import { useEffect } from "react";
import userService from "../services/userService";

const Logout = () => {
  useEffect(() => {
    async function loggingOut() {
      userService.logout();
      window.location = "/signing";
    }
    loggingOut();
  }, []);
  return null;
};

export default Logout;
