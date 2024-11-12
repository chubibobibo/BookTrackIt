import Navbar from "../../components/Navbar";
import Chips from "../../components/Chips.jsx";
import BookModal from "../../components/BookModal.jsx";

import { Button } from "@material-tailwind/react";
import ProtectRoutes from "../../utils/ProtectRoutes";
import { Outlet, Form, redirect } from "react-router-dom";
import { useState } from "react";

import { toast } from "react-toastify";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

import { loggedUserContext } from "../../context/context.js";
import { Typography } from "@material-tailwind/react";

/** loader function to obtain logged user */
export const loader = async () => {
  try {
    const userData = await axios.get("/api/auth/getLoggedUser");
    return userData;
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
    return err;
  }
};

function DashboardPage() {
  const userData = useLoaderData();
  /** @active state that will manage the color of the button */
  const [active, setActive] = useState(null);

  /** @handleActive function to change the state active to apply bg color */
  /** @id tracks the element */
  const handleActive = (id) => {
    setActive(id);
  };

  return (
    <loggedUserContext.Provider value={userData}>
      <ProtectRoutes>
        <Navbar />
        <section className='flex items-center'>
          <Typography variant='h3' className='font-customBody ml-2 my-4'>
            Library
          </Typography>
          <BookModal />
        </section>
        <section className='h-8 flex items-center gap-4 justify-around px-2 md:w-[50rem] md:justify-self-center md:gap-20'>
          <Chips
            title={"All books"}
            idprop={1}
            handleActive={handleActive}
            active={active}
          />
          <Chips
            title={"Borrowed"}
            idprop={2}
            handleActive={handleActive}
            active={active}
          />
          <Chips
            title={"return soon"}
            idprop={3}
            handleActive={handleActive}
            active={active}
          />
          <Chips
            title={"returned"}
            idprop={4}
            handleActive={handleActive}
            active={active}
          />
        </section>
        <Outlet />
      </ProtectRoutes>
    </loggedUserContext.Provider>
  );
}
export default DashboardPage;
