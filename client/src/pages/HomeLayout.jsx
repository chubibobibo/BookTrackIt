import { Outlet } from "react-router-dom";

// import { toast } from "react-toastify";
// import axios from "axios";
// import { useLoaderData } from "react-router-dom";

// import { loggedUserContext } from "../context/context.js";

// /** loader function to obtain logged user */
// export const loader = async () => {
//   try {
//     const userData = await axios.get("/api/auth/getLoggedUser");
//     return userData;
//   } catch (err) {
//     console.log(err);
//     toast.error(err?.response?.data?.message);
//     return err;
//   }
// };

function HomeLayout() {
  // const userData = useLoaderData();
  return (
    <>
      <Outlet />
    </>
  );
}
export default HomeLayout;
