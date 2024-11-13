import axios from "axios";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";

import BookCard from "../../components/BookCard";

import LazyComponentLoad from "../../hooks/LazyComponentLoad";

import { lazy } from "react";

const LazyBookCard = lazy(() => import("../../components/BookCard"));

/** loader function to obtain books with borrowed books status */
export const loader = async () => {
  try {
    const borrowedBooks = await axios.get("/api/book/borrowedBooks");
    console.log(borrowedBooks);
    return borrowedBooks;
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
    return err;
  }
};

function BorrowedBooksPage() {
  const data = useLoaderData();
  const bookData = data?.data?.borrowedBooks;
  return (
    <section className='flex flex-col gap-3'>
      {bookData?.map((books) => {
        console.log(books);
        return (
          <div key={books._id}>
            <LazyComponentLoad>
              <BookCard
                bookTitle={books?.bookTitle}
                keyProp={books?._id}
                booksImg={books?.photoUrl}
              />
            </LazyComponentLoad>
          </div>
        );
      })}
    </section>
  );
}
export default BorrowedBooksPage;
