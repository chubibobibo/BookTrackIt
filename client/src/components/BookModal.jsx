import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import { useState } from "react";

import { ThemeProvider } from "@material-tailwind/react";
import { theme } from "../utils/materialcomponentTheme/buttonTheme.js";

import { Form, redirect } from "react-router-dom";

import NewBookForm from "./NewBookForm.jsx";
import axios from "axios";
import { toast } from "react-toastify";

function BookModal() {
  const [bookData, setBookData] = useState({
    bookTitle: "",
    bookAuthor: "",
    borrowedFrom: "",
    dateBorrowed: "",
    dateToReturn: "",
    photoUrl: null,
  });

  /** @handleSubmit submit the add book form */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photoUrl", bookData.photoUrl); // Append the file
    formData.append("bookTitle", bookData.bookTitle);
    formData.append("bookAuthor", bookData.bookAuthor);
    formData.append("borrowedFrom", bookData.borrowedFrom);
    formData.append("dateBorrowed", bookData.dateBorrowed);
    formData.append("dateToReturn", bookData.dateToReturn);
    try {
      await axios.post("/api/book/newBook", formData);
      toast.success("New book added");
      setBookData({
        bookTitle: "",
        bookAuthor: "",
        borrowedFrom: "",
        dateBorrowed: "",
        dateToReturn: "",
        photoUrl: "",
      });
      redirect("/");
    } catch (err) {
      console.log(err);
      toast.error(
        Array.isArray(err?.response?.data?.message)
          ? err?.response?.data?.message[0]
          : err?.response?.data?.message
      );
      return err;
    }
  };

  /** @startDate date for react date picker */
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <ThemeProvider value={theme}>
      <Button
        onClick={handleOpen}
        variant='gradient'
        color='indigo'
        className='ml-auto mr-2 bg-indigo-400 '
      >
        Add a Book
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className='text-xl'>Let's add some books🤩</DialogHeader>
        <Form
          method='POST'
          onSubmit={handleSubmit}
          encType='multipart/form-data'
        >
          <DialogBody className='flex flex-col gap-4'>
            <NewBookForm bookData={bookData} setBookData={setBookData} />
          </DialogBody>
          <DialogFooter>
            <Button
              variant='text'
              color='red'
              onClick={handleOpen}
              className='mr-1'
              type='button'
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant='gradient'
              color='indigo'
              onClick={handleOpen}
              type='submit'
            >
              <span>Add book</span>
            </Button>
          </DialogFooter>
        </Form>
      </Dialog>
    </ThemeProvider>
  );
}
export default BookModal;
