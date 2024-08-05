import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const ShinyButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine if the current location is the home or login page
  const isHome = location.pathname === "/";
  const isLogin = location.pathname === "/login";

  const handleClick = () => {
    // Navigate to login if currently on home, otherwise navigate to home
    if (isHome) {
      navigate("/login");
    } else if (isLogin) {
      navigate("/");
    }
  };

  // Do not render the button if on any route other than home or login
  if (!isHome && !isLogin) {
    return null;
  }

  // Determine the text to display based on the current route
  const buttonText = isHome ? "Login" : "Home";

  return (
    <motion.button
      onClick={handleClick}
      className="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group"
    >
      <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4">
        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
      </span>
      <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4">
        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
      </span>
      <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"></span>
      <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
        {buttonText}
      </span>
    </motion.button>
  );
};

export default ShinyButton;
