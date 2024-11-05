import { useState } from "react";

import { toast } from "react-toastify";
import axios from "axios";

import { Form, redirect } from "react-router-dom";

import RegisterForm from "../../components/RegisterForm";

/** Action function to register*/
export const action = async ({ request }) => {
  const formData = await request.formData(); //obtains data from the inputs

  /** obtained the 2 passwords to compare if the same */
  const pwd1 = formData.get("password1");
  const pwd2 = formData.get("password2");

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
  const [isHidden1, setIsHidden1] = useState(true);
  const [isHidden2, setIsHidden2] = useState(true);

  const handleClickHidden1 = () => {
    setIsHidden1(!isHidden1);
  };
  const handleClickHidden2 = () => {
    setIsHidden2(!isHidden2);
  };

  return (
    <Form method='POST'>
      <RegisterForm
        isHidden1={isHidden1}
        handleClickHidden1={handleClickHidden1}
        isHidden2={isHidden2}
        handleClickHidden2={handleClickHidden2}
        title={"Register"}
      />
    </Form>
  );
}
export default RegisterUserPage;
