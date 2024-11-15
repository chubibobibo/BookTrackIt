import axios from "axios";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";

import BookCard from "../../components/BookCard";

import LazyComponentLoad from "../../hooks/LazyComponentLoad";

import { lazy } from "react";
import { Typography } from "@material-tailwind/react";

const LazyBookCard = lazy(() => import("../../components/BookCard"));

/** loader function to obtain books with borrowed books status */
export const loader = async () => {
  try {
    const borrowedBooks = await axios.get("/api/book/allBooks");
    // console.log(borrowedBooks);
    return borrowedBooks;
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
    return err;
  }
};

function BorrowedBooksPage() {
  const data = useLoaderData();
  const bookData = data?.data?.allBooks;
  return (
    <section className='flex flex-col gap-3 md:w-9/12 md:grid md:grid-cols-3 md:justify md:m:0'>
      {!bookData ? (
        <Typography>No Books yet 📖</Typography>
      ) : (
        bookData?.map((books, idx) => {
          // console.log(books);
          return (
            <div key={books._id}>
              <LazyComponentLoad>
                <BookCard bookData={books} idx={idx} />
              </LazyComponentLoad>
            </div>
          );
        })
      )}
    </section>
  );
}
export default BorrowedBooksPage;
