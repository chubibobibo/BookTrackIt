import { CgProfile } from "react-icons/cg";
import { GrNotes } from "react-icons/gr";

import { Link } from "react-router-dom";
import Avatar from "./Avatar";

import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

function Navbar() {
  //** handling state to open and close modal */
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <section className='h-[3rem] bg-customBlue  flex px-2 items-center gap-1 shadow-lg justify-end'>
      <Avatar handleOpen={handleOpen} size={"small"} />
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className='flex justify-center'>
          <Avatar size={"large"} />
        </DialogHeader>
        <DialogBody>
          The key to more success is to have a lot of pillows. Put it this way,
          it took me twenty five years to get these plants, twenty five years of
          blood sweat and tears, and I&apos;m never giving up, I&apos;m just
          getting started. I&apos;m up to something. Fan luv.
        </DialogBody>
        <DialogFooter>
          <Button
            variant='text'
            color='red'
            onClick={handleOpen}
            className='mr-1'
          >
            <span>Cancel</span>
          </Button>
          <Button variant='gradient' color='green' onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </section>
  );
}
export default Navbar;
