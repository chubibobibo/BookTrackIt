import { ThemeProvider, Input } from "@material-tailwind/react";
import { useState } from "react";

import { inputTheme } from "../utils/materialcomponentTheme/inputTheme.js";

import { FaBook } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { FaCalendarDays, FaLocationDot, FaImage } from "react-icons/fa6";

function NewBookForm({ bookData, setBookData }) {
  /** @handleChange obtains input from forms */
  /** @handleImageChange separate handler to set the state photoUrl with the file from the input of uploading image */
  /** @file file obtain from the uppload image input */

  const handleChange = (e) => {
    setBookData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBookData((prev) => {
      return { ...prev, photoUrl: file };
    });
  };

  return (
    <section className='flex flex-col gap-3'>
      <ThemeProvider value={inputTheme}>
        <Input
          label='Book Image'
          icon={<FaImage />}
          color='indigo'
          name='photoUrl'
          onChange={handleImageChange}
          type='file'
        />
        <Input
          label='Book Title'
          icon={<FaBook />}
          color='indigo'
          name='bookTitle'
          value={bookData.bookTitle}
          onChange={handleChange}
        />
        <Input
          label='Author of Book'
          icon={<IoPersonSharp />}
          color='indigo'
          name='bookAuthor'
          value={bookData.bookAuthor}
          onChange={handleChange}
        />
        <Input
          label='Library Borrowed From'
          icon={<FaLocationDot />}
          color='indigo'
          name='borrowedFrom'
          value={bookData.borrowedFrom}
          onChange={handleChange}
        />
        <Input
          label='Date Borrowed'
          icon={<FaCalendarDays />}
          color='indigo'
          name='dateBorrowed'
          value={bookData.dateBorrowed}
          onChange={handleChange}
          type='date'
        />
        <Input
          label='Date to Return'
          icon={<FaCalendarDays />}
          color='indigo'
          name='dateToReturn'
          value={bookData.dateToReturn}
          onChange={handleChange}
          type='date'
        />
      </ThemeProvider>
    </section>
  );
}
export default NewBookForm;
