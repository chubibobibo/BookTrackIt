import Navbar from "../../components/Navbar";
import Chips from "../../components/Chips.jsx";
import BookModal from "../../components/BookModal.jsx";

import ProtectRoutes from "../../utils/ProtectRoutes";
// import { navigateBorrowedBooks } from "../../utils/navigatePages.js";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";

import { toast } from "react-toastify";
import axios from "axios";

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
  const navigate = useNavigate();

  /** event handlers */
  const handleNavToBorrowed = () => {
    console.log("hello");
  };

  const userData = useLoaderData();
  /** @active state that will manage the color of the button */
  const [active, setActive] = useState(null);

  /** @handleActive function to change the state active to apply bg color */
  /** @id tracks the element */
  const handleActive = (id) => {
    setActive(id);
    navigate("/dashboard/borrowedBooks");
  };

  return (
    <main>
      <loggedUserContext.Provider value={userData}>
        <ProtectRoutes>
          <Navbar />
          <section className='flex items-center justify-center md:w-5/12 md:justify-self-center md:m-7'>
            <Typography
              variant='h3'
              className='font-customBody ml-2 my-4 md:text-4xl md:font-bold md:ml-6'
            >
              Library
            </Typography>
            <BookModal />
          </section>
          {/* CHIPS BUTTONS*/}
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
          <section className='w-11/12 h-fit mt-4 flex justify-self-center md:justify-center'>
            <Outlet />
          </section>
        </ProtectRoutes>
      </loggedUserContext.Provider>
    </main>
  );
}
export default DashboardPage;
