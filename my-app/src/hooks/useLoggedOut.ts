import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useLoggedOut = () => {
  const navigate = useNavigate();
  const authenticated = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (!authenticated.authanticated) {
      navigate("/");
    }
  }, [authenticated]);
};

export default useLoggedOut;
