import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/** paths */
import {
  RegisterUserPage,
  LoginUserPage,
  HomeLayout,
  ErrorPage,
} from "./utils";

import { action as loginAction } from "./pages/authPages/LoginUserPage";
import { action as registerAction } from "./pages/authPages/RegisterUserPage";
import DashboardPage from "./pages/dashboardPages/DashboardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "/",
        element: <LoginUserPage />,
        action: loginAction,
      },
      {
        path: "/register",
        element: <RegisterUserPage />,
        action: registerAction,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
