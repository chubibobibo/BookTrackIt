import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ProtectRoutes from "./utils/ProtectRoutes";

/** paths */
import {
  RegisterUserPage,
  LoginUserPage,
  HomeLayout,
  ErrorPage,
  DashboardPage,
  UpdateProfile,
} from "./utils";

import { action as loginAction } from "./pages/authPages/LoginUserPage";
import { action as registerAction } from "./pages/authPages/RegisterUserPage";
import { action as updateProfileAction } from "./pages/authPages/UpdateProfile";
import { loader as getLoggedUserLoader } from "./pages/HomeLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    loader: getLoggedUserLoader,
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
        path: "/updateProfile",
        element: (
          <ProtectRoutes>
            <UpdateProfile />
          </ProtectRoutes>
        ),
        action: updateProfileAction,
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
