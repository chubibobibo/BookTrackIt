import { useState } from "react";

import { toast } from "react-toastify";
import axios from "axios";

import { Form, redirect } from "react-router-dom";
import RegisterForm from "../../components/RegisterForm";

/** action function to submit */

export const action = async ({ request }) => {
  const formData = await request.formData(); // obtains data from forms
  const pwd1 = formData.get("password1");
  const pwd2 = formData.get("password2");

  if (pwd1 !== pwd2) {
    return toast.error("passwords doesn't match");
  }

  formData.set("password", pwd1);

  const data = Object.fromEntries(formData);

  try {
    await axios.patch("/api/auth/updateProfile", data);
    toast.success("User successfully updated");
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

function UpdateProfile() {
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
    <section className='m-0'>
      <Form method='POST'>
        <RegisterForm
          title={"Update Profile"}
          isHidden1={isHidden1}
          handleClickHidden1={handleClickHidden1}
          isHidden2={isHidden2}
          handleClickHidden2={handleClickHidden2}
        />
      </Form>
    </section>
  );
}
export default UpdateProfile;
