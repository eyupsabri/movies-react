import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navigation from "./routes/Navigation/Navigation.routes";
import Home from "./routes/Home/Home.routes";
import Movie from "./routes/Movie/Movie.routes";
import { Provider } from "react-redux";
import { store } from "./state/store";
import Login from "./routes/Login/Login.routes";
import { useEffect } from "react";
import AdminHome from "./routes/Admin/Home/admin.home.routes";
import ProtectedAdminRoutes from "./routes/ProtectedRoutes/protected.admin.routes";
import AdminAddMovie from "./routes/Admin/AddMovie/Admin.add.movie.routes";
import AdminDetailedMovie from "./routes/Admin/DetailedMovie/Admin.detailed.movie.routes";
import Register from "./routes/Register/Register.routes";

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
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/admin",
        element: <ProtectedAdminRoutes children={<AdminHome />} />,
        //element: <AdminHome />,
      },
      {
        path: "/admin/add-movie",
        element: <ProtectedAdminRoutes children={<AdminAddMovie />} />,
      },
      {
        path: "/admin/movies/:imdb_id",
        element: <ProtectedAdminRoutes children={<AdminDetailedMovie />} />,
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
