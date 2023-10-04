import { AxiosError } from 'axios';
import { IError } from '../store/blogAppSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const handlingError = (error: AxiosError | IError) => {
  let errors = {
    errors: [{ key: 'fetch', message: error.message }],
    status: error.response?.status,
  }
  if (typeof error.response?.data?.errors === 'object') {
    errors = {
      ...errors,
      errors: [
        ...errors.errors,
        ...Object.keys(error.response.data.errors).map((key) => ({
          key: key,
          message: error.response?.data?.errors[key] as string,
        })),
      ],
    }
  }
  console.log(errors);
  
  return errors.errors.forEach(error => {
    toast.error(`${error.key} ${error.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      })
  });
};

export default handlingError;
