import { Spinner } from "@material-tailwind/react";

function ComponentLoading() {
  return (
    <section className='text-2xl h-fit flex items-center text-indigo-500'>
      LOADING BOOKS...📖📖📖
      <Spinner className='h-12 w-12' />
    </section>
  );
}
export default ComponentLoading;
