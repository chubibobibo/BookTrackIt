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
  BorrowedBooksPage,
} from "./utils";

import { action as loginAction } from "./pages/authPages/LoginUserPage";
import { action as registerAction } from "./pages/authPages/RegisterUserPage";
import { action as updateProfileAction } from "./pages/authPages/UpdateProfile";
import { loader as getLoggedUserLoader } from "./pages/dashboardPages/DashboardPage";
import { loader as getBorrowedBooksLoader } from "./pages/dashboardPages/BorrowedBooksPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        index: true,
        element: <LoginUserPage />,
        action: loginAction,
      },
      {
        path: "register",
        element: <RegisterUserPage />,
        action: registerAction,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
        loader: getLoggedUserLoader,
        children: [
          {
            path: "updateProfile",
            element: (
              <ProtectRoutes>
                <UpdateProfile />
              </ProtectRoutes>
            ),
            action: updateProfileAction,
          },
          {
            path: "borrowedBooks",
            element: <BorrowedBooksPage />,
            loader: getBorrowedBooksLoader,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
