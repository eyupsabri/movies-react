import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navigation from "./routes/Navigation/Navigation.routes";
import Home from "./routes/Home/Home.routes";
import Movie from "./routes/Movie/Movie.routes";
import { Provider } from "react-redux";
import { store } from "./state/store";
import Login from "./routes/Login/Login.routes";
import useAxiosInterceptor from "./hooks/useAxiosInterceptor";
import useTryLogin from "./hooks/useTryLogin";
import { useEffect } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "/movies/:movieID", element: <Movie /> },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
function App() {
  useEffect(() => {
    console.log("App");
  }, []);
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
