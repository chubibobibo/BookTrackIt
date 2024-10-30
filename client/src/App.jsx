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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
