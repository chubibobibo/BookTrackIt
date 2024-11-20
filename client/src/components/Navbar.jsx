import Avatar from "./Avatar";
import { useLoggedUserHook } from "../hooks/useLoggedUserHook";
import { toCapitalize } from "../hooks/toCapitalize.js";
import { Input } from "@material-tailwind/react";
import { FaMagnifyingGlass } from "react-icons/fa6";

import { ThemeProvider } from "@material-tailwind/react";
import { inputTheme } from "../utils/materialcomponentTheme/inputTheme.js";

import axios from "axios";
import { useNavigate, Link, Form } from "react-router-dom";
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

function Navbar({ setInputSearchQuery }) {
  const navigate = useNavigate();

  //** handling state to open and close modal */
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleChange = (e) => {
    setInputSearchQuery((prev) => {
      return { ...prev, search: e.target.value };
    });
  };

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
    <section className='h-[4rem] bg-customBlue flex px-4 items-center gap-1 shadow-lg lg:h-[4rem]'>
      <section className='flex w-full md:flex md:ml-auto gap-2'>
        <ThemeProvider value={inputTheme}>
          <Form action='/dashboard/borrowedBooks'>
            <Input
              label='Search book title or author'
              icon={<FaMagnifyingGlass color='white' />}
              color='white'
              type='search'
              variant='outlined'
              name='search'
              onChange={handleChange}
            />
          </Form>
        </ThemeProvider>
      </section>
      <Avatar handleOpen={handleOpen} size={"small"} userData={userData} />
      {/** profile card modal  */}
      <Dialog open={open} handler={handleOpen} size='sm'>
        <DialogHeader className='flex justify-center border-b-2 border-gray-300'>
          <Avatar size={"large"} textSize={"large"} userData={userData} />
        </DialogHeader>
        <DialogBody className='flex justify-center items-center flex-col'>
          <Typography variant='h5' className='md:text-xl'>
            {toCapitalize(userData.username)}
          </Typography>
          <Typography className='text-base'>{userData.role}</Typography>
        </DialogBody>
        <DialogFooter className='flex justify-center md:justify-end gap-1'>
          <Link to='/dashboard/updateProfile'>
            <Button
              variant='filled'
              onClick={handleOpen}
              className='mr-1 bg-customBlue'
            >
              <span>update profile</span>
            </Button>
          </Link>
          <Button variant='gradient' color='red' onClick={handleLogout}>
            <span>LogOut</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </section>
  );
}
export default Navbar;
