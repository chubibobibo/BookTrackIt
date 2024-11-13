import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

function BookCard({ bookTitle, booksImg }) {
  return (
    <section>
      <Card className='w-full max-w-[48rem] h-[10rem] flex-row'>
        <CardHeader
          shadow={false}
          floated={false}
          className='m-0 w-2/5 shrink-0 rounded-r-none'
        >
          <img
            src='https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
            // src={booksImg }
            alt='card-image'
            className='h-full w-full object-cover'
            loading='lazy'
          />
        </CardHeader>
        <CardBody className='p-0 pt-3 flex w-full justify-center'>
          <Typography
            color='gray'
            className='mb-4 uppercase text-base font-bold'
          >
            {bookTitle}
          </Typography>
        </CardBody>
      </Card>
    </section>
  );
}
export default BookCard;
