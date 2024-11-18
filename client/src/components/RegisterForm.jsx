import { theme } from "../utils/materialThemes";
import { ThemeProvider } from "@material-tailwind/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useLoggedUserHook } from "../hooks/useLoggedUserHook";

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

function RegisterForm({
  isHidden1,
  handleClickHidden1,
  isHidden2,
  handleClickHidden2,
  title,
}) {
  /** @userData data from context in HomepageLayout  */
  const contextData = useLoggedUserHook();
  const userData = contextData?.data?.foundUser;
  // console.log(userData);

  return (
    <ThemeProvider value={theme}>
      <section className='flex w-screen justify-center items-center h-fit py-2 bg-customBlue md:grid grid-cols-2 md:bg-white md:w-full'>
        {/* <div className='bg-customBlue w-10 h-10 border-4-customBlue'>hello</div> */}
        <Card className='w-10/12 m-2 md:w-[70%] md:h-screen md:justify-center md:justify-self-center'>
          <CardHeader className='mb-4 grid h-28 place-items-center'>
            <Typography variant='h3' color='white'>
              {title}
            </Typography>
          </CardHeader>
          {/* <Form method='POST'> */}
          <CardBody className='flex flex-col gap-4'>
            <Input
              label='username'
              size='lg'
              name='username'
              defaultValue={userData ? userData?.username : ""}
            />
            <Input
              label='First name'
              size='lg'
              name='firstName'
              defaultValue={userData ? userData?.firstName : ""}
            />

            <Input
              label='Last name'
              size='lg'
              name='lastName'
              defaultValue={userData ? userData?.lastName : ""}
            />
            <Input
              label='Email'
              size='lg'
              name='email'
              defaultValue={userData ? userData?.email : ""}
            />
            {/** Second password */}
            <Input
              label='Password'
              size='lg'
              name='password1'
              type={isHidden1 ? "password" : "text"}
              icon={
                isHidden1 ? (
                  <FaEye
                    onClick={handleClickHidden1}
                    className='cursor-pointer'
                  />
                ) : (
                  <FaEyeSlash
                    onClick={handleClickHidden1}
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
              type={isHidden2 ? "password" : "text"}
              icon={
                isHidden2 ? (
                  <FaEye
                    onClick={handleClickHidden2}
                    className='cursor-pointer'
                  />
                ) : (
                  <FaEyeSlash
                    onClick={handleClickHidden2}
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
              {title}
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
          {/* </Form> */}
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
export default RegisterForm;
