import toast from "react-hot-toast";

const promiseToast = (promise = new Promise()) => {
  toast.promise(promise, {
    loading: "Loading data",
    success: "Got the data!",
    error: "An error occur!",
  });
};

export default promiseToast;
