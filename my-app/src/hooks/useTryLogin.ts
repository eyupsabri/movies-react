import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { setAuthentication } from "../state/authSlice/authSlice";

const useTryLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const tryLogin = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        axios
          .get("https://localhost:7209/api/Authentication/IsLoggedIn", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            dispatch(setAuthentication({ authanticated: true }));
          })
          .catch((err) => {
            console.log("Buraya niye gelmiyor");
            console.error(err.response.data === "Refresh Token");
          });
      } catch (error) {
        console.error(error);
      }
    };

    tryLogin();
  }, []);
};

export default useTryLogin;
