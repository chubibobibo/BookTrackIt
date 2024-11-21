import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useUpdateStatus = () => {
  const navigate = useNavigate();
  /** @id parameter that will accept the argument of book id */
  const update = async (id) => {
    try {
      await axios.patch(`/api/book/updateStatus/${id}`);
      toast.success("Updated the status successfully");
      navigate("/dashboard/borrowedBooks");
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
      return err;
    }
  };
  return update; //returns the update function to be used by components;
};

export default useUpdateStatus;
