import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";

import { useState } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import { toast } from "react-toastify";
import axios from "axios";

import { ThemeProvider } from "@material-tailwind/react";
import { theme } from "../../utils/materialThemes";
import { Form, redirect } from "react-router-dom";

/** action function to login */
export const action = async ({ request }) => {
  const formData = await request.formData(); //obtain data from forms.
  const data = Object.fromEntries(formData); //converts data into objects
  //   console.log(data);
  try {
    await axios.post("/api/auth/login", data);
    toast.success("user logged in");
    return redirect("/");
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

function LoginUserPage() {
  /** State to manage changing of password field to text */
  const [isHidden, setIsHidden] = useState(true);

  const handleClickHidden = () => {
    setIsHidden(!isHidden);
  };

  return (
    <ThemeProvider value={theme}>
      <section className='flex justify-center items-center h-screen bg-customBlue md:grid grid-cols-2 md:bg-white'>
        {/* <div className='bg-customBlue w-10 h-10 border-4-customBlue'>hello</div> */}
        <Card className='w-10/12 md:w-[70%] md:h-screen md:justify-center md:justify-self-center'>
          <CardHeader className='mb-4 grid h-28 place-items-center'>
            <Typography variant='h3' color='white'>
              Sign In
            </Typography>
          </CardHeader>
          <Form method='POST'>
            <CardBody className='flex flex-col gap-4'>
              <Input label='username' size='lg' name='username' />
              <Input
                label='Password'
                size='lg'
                name='password'
                type={isHidden ? "password" : "text"}
                icon={
                  isHidden ? (
                    <FaEye
                      onClick={handleClickHidden}
                      className='cursor-pointer'
                    />
                  ) : (
                    <FaEyeSlash
                      onClick={handleClickHidden}
                      className='cursor-pointer'
                    />
                  )
                }
              />
              <div className='-ml-2.5'>
                <Checkbox label='Remember Me' />
              </div>
            </CardBody>
            <CardFooter className='pt-0'>
              <Button variant='gradient' fullWidth type='submit'>
                Sign In
              </Button>
              <Typography variant='small' className='mt-6 flex justify-center'>
                Don&apos;t have an account?
                <Typography
                  as='a'
                  href='/register'
                  variant='small'
                  color='blue-gray'
                  className='ml-1 font-bold'
                >
                  Sign up
                </Typography>
              </Typography>
            </CardFooter>
          </Form>
        </Card>
        <img
          src='/library.jpg'
          alt='login image'
          className='hidden md:block md:object-cover md:h-screen md:w-screen'
        />
      </section>
    </ThemeProvider>
  );
}
export default LoginUserPage;
