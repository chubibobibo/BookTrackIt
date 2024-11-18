import axios from "axios";
import { toast } from "react-toastify";
import { useLoaderData, useOutlet } from "react-router-dom";

import { useSearchContext } from "../../hooks/useSearchContext.js";

import BookCard from "../../components/BookCard";

import LazyComponentLoad from "../../hooks/LazyComponentLoad";

import { Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

/** loader function to obtain books with borrowed books status */
export const loader = async ({ request }) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    // console.log(params);
    const borrowedBooks = await axios.get("/api/book/allBooks", { params });
    // console.log(request);
    return borrowedBooks;
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
    return err;
  }
};

function BorrowedBooksPage() {
  // const contextData = useOutletContext();
  // // console.log(data1);
  /** @searchContextData data from the input form in the Nav component */
  // const searchContextData = useSearchContext();

  const data = useLoaderData();
  const allBooksData = data?.data?.allBooks;

  /** useEffect to fetch data with queries */
  // const [bookData, setBookData] = useState({});
  // useEffect(() => {
  //   const fetchBookData = async (request) => {
  //     console.log(request);
  //     try {
  //       const data = await axios.get("/api/book/allBooks");
  //       console.log(data);
  //       // setBookData((prev) => {
  //       //   return { ...prev, data };
  //       // });
  //     } catch (err) {
  //       console.log(err);
  //       toast.error(err?.response?.data?.message);
  //     }
  //   };
  //   fetchBookData();
  // }, [contextData]); //dependency on context, rerender when context from search input form changes

  // console.log(bookData);
  // const allBooksData = bookData.data?.data?.allBooks;

  return (
    <section className='flex flex-col gap-3 2xl:grid 2xl:grid-cols-3 2xl:justify-center 2xl:px-6 md:m:0'>
      {!allBooksData ? (
        <Typography>No Books yet 📖</Typography>
      ) : (
        allBooksData?.map((books, idx) => {
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
