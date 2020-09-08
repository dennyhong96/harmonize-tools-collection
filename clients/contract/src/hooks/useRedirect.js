import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

import { REDIRECT_MAP } from "../utils/path";

const useRedirect = () => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (Object.keys(REDIRECT_MAP).includes(location.pathname)) {
      if (process.env.NODE_ENV === "production") {
        history.replace(REDIRECT_MAP[location.pathname]);
      }
    }
  }, [location.pathname, history]);
  return null;
};

export default useRedirect;
