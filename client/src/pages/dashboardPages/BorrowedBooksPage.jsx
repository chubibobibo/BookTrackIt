import axios from "axios";
import { toast } from "react-toastify";
import { useLoaderData, useOutlet } from "react-router-dom";

import BookCard from "../../components/BookCard";

import LazyComponentLoad from "../../hooks/LazyComponentLoad";

import { Typography } from "@material-tailwind/react";

/** loader function to obtain books with borrowed books status */
export const loader = async ({ request }) => {
  try {
    /** new URL creates a new url object using request.url */
    /** @searchParams gives access to the query paramaters in the url (request.url)*/
    /** @entries returns a key value pair for each of the query parameters (searchParams) */
    /** @params a url with  */
    const params = Object.fromEntries([
      //converts the new URL into an object
      ...new URL(request.url).searchParams.entries(),
    ]);

    const borrowedBooks = await axios.get("/api/book/allBooks", { params });
    return borrowedBooks;
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
    return err;
  }
};

function BorrowedBooksPage() {
  const data = useLoaderData();
  const allBooksData = data?.data?.allBooks;

  return (
    <section className='flex flex-col gap-3 2xl:grid 2xl:grid-cols-3 2xl:justify-center 2xl:px-6 md:m:0'>
      {!allBooksData ? (
        <Typography>No Books yet 📖</Typography>
      ) : (
        allBooksData?.map((books, idx) => {
          return (
            <div key={books._id} className='h-[21rem]'>
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
