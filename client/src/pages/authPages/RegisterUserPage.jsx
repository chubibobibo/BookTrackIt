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

/** Action function to register*/
export const action = async ({ request }) => {
  const formData = await request.formData(); //obtains data from the inputs

  /** obtained the 2 passwords to compare if the same */
  const pwd1 = formData.get("password1");
  const pwd2 = formData.get("password2");
  console.log(pwd1, pwd2);

  if (pwd1 !== pwd2) {
    return toast.error("Passwords doesn't match");
  } else {
    /**Creates a new key-value pair in formData ("password with the value of pwd1 from input") */
    formData.set("password", pwd1);
  }

  const data = Object.fromEntries(formData);
  try {
    await axios.post("/api/auth/register", data);
    toast.success("New user registered");
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

function RegisterUserPage() {
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
              Register
            </Typography>
          </CardHeader>
          <Form method='POST'>
            <CardBody className='flex flex-col gap-4'>
              <Input label='username' size='lg' name='username' />
              <Input label='First name' size='lg' name='firstName' />
              <Input label='Last name' size='lg' name='lastName' />
              <Input label='Email' size='lg' name='email' />
              {/** Second password */}
              <Input
                label='Password'
                size='lg'
                name='password1'
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
              {/** first password */}
              <Input
                label='Password'
                size='lg'
                name='password2'
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
                  href='/'
                  variant='small'
                  color='blue-gray'
                  className='ml-1 font-bold'
                >
                  Login
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
export default RegisterUserPage;
