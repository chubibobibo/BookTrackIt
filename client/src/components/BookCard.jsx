import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

import { customCardColor, customCardTextColor } from "../utils/customCardColor";

import useUpdateStatus from "../hooks/useUpdateStatus.jsx";

function BookCard({ bookData, idx }) {
  /** transform date from forms to readable dates */
  const bdate = new Date(bookData.dateBorrowed); //creates a new date based on the props
  const borrowedDate = bdate.toDateString(); //transforms to readable text
  const rdate = new Date(bookData.dateToReturn);
  const returnDate = rdate.toDateString();

  // console.log(bookData);

  /** @update instantiates the customHook */
  /** @handleUpdateClick event handler that implements the custom hook to update the status*/
  const update = useUpdateStatus();
  const handleUpdateClick = async (id) => {
    try {
      await update(id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    /** @customCardColor util function accepts iterated idx to apply dynamic classNames */
    <section>
      <Card
        className={`w-full max-w-screen-[48rem] h-[22rem] flex-row rounded-none ${customCardColor(
          idx
        )} md:h-[22rem]`}
      >
        <CardHeader
          shadow={false}
          floated={false}
          className={`m-0 w-2/5 shrink-0 rounded-r-none ${customCardColor(
            idx
          )} m-2 sm:flex sm:flex-col sm:items-center`}
        >
          <img
            src={
              bookData?.photoUrl === "null"
                ? "/bookCover.png"
                : bookData.photoUrl
            }
            alt='card-image'
            className='h-[15rem] w-[24rem] object-contain sm:mb-2'
            loading='lazy'
          />
          <Button
            color='red'
            className='sm:w-32'
            onClick={() => {
              handleUpdateClick(bookData._id);
            }}
          >
            Mark as returned
          </Button>
        </CardHeader>
        <CardBody className='p-0 pt-3 w-full pr-2 ml-3'>
          <section className='flex flex-col items-center mb-2 border-b-2 border-gray-300'>
            <Typography className='uppercase text-sm mt-2 font-bold text-gray-700 md:text-lg'>
              {bookData.bookTitle}
            </Typography>
          </section>
          <section className='mb-2'>
            <Typography className='text-sm font-bold text-indigo-300 capitalize'>
              Author:
            </Typography>
            <Typography className='capitalize text-sm'>
              {bookData.bookAuthor}
            </Typography>
          </section>
          <section className='mb-2'>
            <Typography className='text-sm font-bold text-indigo-300 capitalize'>
              Borrowed from:
            </Typography>
            <Typography className='capitalize text-sm'>
              {bookData.borrowedFrom}
            </Typography>
          </section>
          <section className='mb-2'>
            <Typography className='text-sm font-bold text-indigo-300 capitalize'>
              Borrowed by:
            </Typography>
            <Typography className='capitalize text-sm'>
              {bookData.owner.username}
            </Typography>
          </section>
          <section className='mb-2'>
            <Typography className='text-sm font-bold text-indigo-300 capitalize'>
              Status:
            </Typography>
            <Typography
              className={`capitalize ${customCardTextColor(
                bookData.status
              )} text-sm`}
            >
              {bookData.status}
            </Typography>
          </section>
          <section className='mb-2'>
            <Typography className='text-sm font-bold text-indigo-300 capitalize'>
              Date Borrowed:
            </Typography>
            <Typography className='capitalize text-sm'>
              {borrowedDate}
            </Typography>
          </section>
          <section className='mb-2'>
            <Typography className='text-sm font-bold text-indigo-300 capitalize'>
              Date to return:
            </Typography>
            <Typography className='capitalize text-sm'>{returnDate}</Typography>
          </section>
        </CardBody>
      </Card>
    </section>
  );
}
export default BookCard;
