import Avatar from "./Avatar";
import { useLoggedUserHook } from "../hooks/useLoggedUserHook";
import { toCapitalize } from "../hooks/toCapitalize.js";
import { Input } from "@material-tailwind/react";
import { FaMagnifyingGlass } from "react-icons/fa6";

import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
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
  const handleOpen = () => {
    setOpen(!open);
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
    <section className='h-[4rem] bg-customBlue flex px-2 items-center gap-1 shadow-lg justify-end lg:h-[4rem]'>
      <section className='w-full md:flex md:w-2/12 md:ml-auto'>
        <Input
          label='Search a book'
          icon={<FaMagnifyingGlass color='white' />}
          color='white'
          type='search'
        />
      </section>
      <Avatar
        handleOpen={handleOpen}
        size={"small"}
        userData={userData}
        className='mr-12'
      />
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
