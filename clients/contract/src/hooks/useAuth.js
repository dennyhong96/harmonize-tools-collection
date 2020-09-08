import { useEffect, useState } from "react";
import axios from "axios";

import setTokenHeaders from "../utils/setTokenHeaders";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      setTokenHeaders(localStorage.getItem("JWT_TOKEN"));
      try {
        const res = await axios.get(
          process.env.NODE_ENV === "production"
            ? "/api/v1/auth"
            : "http://localhost:5000/api/v1/auth"
        );
        setUser(res.data.user);
        console.log(res.data);
      } catch (error) {
        console.error(error.response);
      }
    })();
  }, []);

  return [user, setUser];
};

export default useAuth;
