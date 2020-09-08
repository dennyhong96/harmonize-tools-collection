import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useLoginSignup = () => {
  const location = useLocation();
  const [isLoginSignup, setLoginSignup] = useState(true);

  const path =
    process.env.NODE_ENV === "production"
      ? ["/contract/signup", "/contract/login"]
      : ["/signup", "/login"];

  useEffect(() => {
    // When user is on mainpage route, display main page navbar
    if (path.includes(location.pathname)) {
      setLoginSignup(true);
    } else {
      setLoginSignup(false);
    }
  }, [location.pathname, setLoginSignup, path]);
  return isLoginSignup;
};

export default useLoginSignup;
