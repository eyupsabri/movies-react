import { useEffect } from "react";
import { API_INSTANCE } from "../services/BaseService";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { setAuthentication } from "../state/authSlice/authSlice";

const useAxiosInterceptor = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    API_INSTANCE.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("accessToken");
        console.log("request interceptor" + config.url);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    API_INSTANCE.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error.response.status === 401) {
          if (error.response.data === "Refresh Token") {
            console.log("Refresh Token");
            const refreshToken = localStorage.getItem("refreshToken");
            // await axios
            //   .get<{ accessToken: string; refreshToken: string }>(
            //     "https://localhost:7209/api/Authentication/RefreshToken",
            //     {
            //       params: { token: refreshToken },
            //     }
            //   )
            //   .then((res) => {
            //     console.log(res.data);
            //     localStorage.setItem("accessToken", res.data.accessToken);
            //     localStorage.setItem("refreshToken", res.data.refreshToken);
            //     dispatch(setAuthentication({ authanticated: true }));
            //     error.config.headers["Authorization"] =
            //       "Bearer " + res.data.accessToken;
            //     return axios(error.config);
            //   })
            //   .catch((err) => {
            //     console.log(err);
            //     return Promise.reject(err);
            //   });
            try {
              const res = await axios.get<{
                accessToken: string;
                refreshToken: string;
                isAdmin: boolean;
              }>("https://localhost:7209/api/Authentication/RefreshToken", {
                params: { token: refreshToken },
              });

              console.log(res.data);
              localStorage.setItem("accessToken", res.data.accessToken);
              localStorage.setItem("refreshToken", res.data.refreshToken);
              dispatch(
                setAuthentication({
                  authanticated: true,
                  isAdmin: res.data.isAdmin,
                })
              );
              error.config.headers["Authorization"] =
                "Bearer " + res.data.accessToken;

              return await API_INSTANCE.request(error.config);
            } catch (err) {
              console.log(err);
              throw err;
            }
          } else {
            dispatch(
              setAuthentication({ authanticated: false, isAdmin: false })
            );
          }
        }
        console.log("En dışa girmemeli");
        return Promise.reject(error);
      }
    );
  }, []);
};

export default useAxiosInterceptor;
