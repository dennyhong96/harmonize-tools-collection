import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useHeaderToggle = () => {
  const location = useLocation();
  const [isMainPageHeader, setMainPageNavbar] = useState(true);

  const mainPagePathname =
    process.env.NODE_ENV === "production" ? "/contract/" : "/";

  useEffect(() => {
    // When user is on mainpage route, display main page navbar
    if (location.pathname === mainPagePathname) {
      setMainPageNavbar(true);
    } else {
      setMainPageNavbar(false);
    }
  }, [location.pathname, mainPagePathname]);
  return isMainPageHeader;
};

export default useHeaderToggle;
