import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { closeLoading } from "../actions/loadingActions";

const useSetGuide = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("CANCEL_GUIDE")) {
      dispatch(closeLoading());
    }
  }, []);
  return null;
};

export default useSetGuide;
