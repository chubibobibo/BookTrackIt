import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

import { customCardColor } from "../utils/customCardColor";

function BookCard({ bookData, idx }) {
  const bdate = new Date(bookData.dateBorrowed); //creates a new date based on the props
  const borrowedDate = bdate.toDateString(); //transforms tro readable text
  const rdate = new Date(bookData.dateToReturn);
  const returnDate = rdate.toDateString();

  return (
    <section>
      <Card
        className={`w-full max-w-[48rem] h-[18rem] flex-row rounded-none ${customCardColor(
          idx
        )} mb-4`}
      >
        <CardHeader
          shadow={false}
          floated={false}
          className={`m-0 w-2/5 shrink-0 rounded-r-none ${customCardColor(
            idx
          )} m-2`}
        >
          <img
            // src='https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
            src={bookData.photoUrl}
            alt='card-image'
            className='h-full w-[24rem] object-contain'
            loading='lazy'
          />
        </CardHeader>
        <CardBody className='p-0 pt-3 w-full pr-2 ml-3'>
          <section className='flex flex-col items-center mb-2 border-b-2 border-gray-300'>
            <Typography
              // color='gray'
              className='uppercase text-base font-bold text-indigo-300'
            >
              {bookData.bookTitle}
            </Typography>
          </section>
          <section className='mb-2'>
            <Typography className='text-sm font-bold text-indigo-300 capitalize'>
              Author:
            </Typography>
            <Typography className='capitalize'>
              {bookData.bookAuthor}
            </Typography>
          </section>
          <section className='mb-2'>
            <Typography className='text-sm font-bold text-indigo-300 capitalize'>
              Borrowed from:
            </Typography>
            <Typography className='capitalize'>
              {bookData.borrowedFrom}
            </Typography>
          </section>
          <section className='mb-2'>
            <Typography className='text-sm font-bold text-indigo-300 capitalize'>
              Date Borrowed:
            </Typography>
            <Typography className='capitalize'>{borrowedDate}</Typography>
          </section>
          <section className='mb-2'>
            <Typography className='text-sm font-bold text-indigo-300 capitalize'>
              Date to return:
            </Typography>
            <Typography className='capitalize'>{returnDate}</Typography>
          </section>
        </CardBody>
      </Card>
    </section>
  );
}
export default BookCard;
