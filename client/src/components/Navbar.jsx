import Avatar from "./Avatar";
import { useLoggedUserHook } from "../hooks/useLoggedUserHook";
import { toCapitalize } from "../hooks/toCapitalize.js";

import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";

function Navbar() {
  const navigate = useNavigate();

  //** handling state to open and close modal */
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  /** @userData contains data of user from the context @data */
  const data = useLoggedUserHook();
  const userData = data?.data?.foundUser;

  /** @handleLogout function to set the state to close and to logout user */
  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      setOpen(() => setOpen(!open));
      toast.success("User successfully logged out");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast(err?.response?.data?.message);
    }
  };

  return (
    <section className='h-[3rem] bg-customBlue flex px-2 items-center gap-1 shadow-lg justify-end lg:h-[4rem]'>
      <Avatar
        handleOpen={handleOpen}
        size={"small"}
        userData={userData}
        className='mr-12'
      />
      <Dialog open={open} handler={handleOpen}>
        {/** modal  */}
        <DialogHeader className='flex justify-center border-b-2 border-gray-300'>
          <Avatar size={"large"} textSize={"large"} userData={userData} />
        </DialogHeader>
        <DialogBody className='flex justify-center items-center flex-col'>
          <Typography variant='h3'>
            {toCapitalize(userData.username)}
          </Typography>
          <Typography className='text-base'>{userData.role}</Typography>
        </DialogBody>
        <DialogFooter className='flex justify-center md:justify-end'>
          <Button
            variant='filled'
            onClick={handleOpen}
            className='mr-1 bg-customBlue'
          >
            <span>update profile</span>
          </Button>
          <Button variant='gradient' color='red' onClick={handleLogout}>
            <span>LogOut</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </section>
  );
}
export default Navbar;
