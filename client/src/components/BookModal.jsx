import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import { ThemeProvider } from "@material-tailwind/react";
import { theme } from "../utils/materialcomponentTheme/buttonTheme.js";
import { inputTheme } from "../utils/materialcomponentTheme/inputTheme.js";

import { Input } from "@material-tailwind/react";
// import DatePicker from "./DatePicker.jsx";
import { FaBook } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";

function BookModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  return (
    <ThemeProvider value={theme}>
      <Button
        onClick={handleOpen}
        variant='gradient'
        color='indigo'
        className='ml-auto mr-2 bg-indigo-400'
      >
        Add a Book
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className='text-xl'>Let's add some books🤩</DialogHeader>
        <DialogBody className='flex flex-col gap-4'>
          {/* The key to more success is to have a lot of pillows. Put it this way,
          it took me twenty five years to get these plants, twenty five years of
          blood sweat and tears, and I&apos;m never giving up, I&apos;m just
          getting started. I&apos;m up to something. Fan luv. */}
          <ThemeProvider value={inputTheme}>
            <Input label='Book Title' icon={<FaBook />} color='indigo' />
            <Input
              label='Author of Book'
              icon={<IoPersonSharp />}
              color='indigo'
            />
            <label htmlFor='start'>Date Borrowed:</label>
            <input type='date' la />
            {/* <DatePicker /> */}
          </ThemeProvider>
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
    </ThemeProvider>
  );
}
export default BookModal;
