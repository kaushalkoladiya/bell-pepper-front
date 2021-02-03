import swal from "sweetalert";

export const warning = (text) => {
  return swal({
    title: "I hope sure what you are doing!",
    icon: "warning",
    dangerMode: true,
    buttons: true,
    text,
  });
};

export const networkError = () => {
  return swal({
    title: "Opps! Connection lost.",
    icon: "warning",
  });
};

export const permissionError = () => {
  return swal({
    title: "Opps! You don't have Permission.",
    icon: "error",
  });
};

export const alert = (title, data, type) => {
  return swal(title, data, type);
};
