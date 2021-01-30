import swal from "sweetalert";

export const success = () => {
  return swal({
    title: "Are You Sure!",
  });
};

export const warning = () => {
  return swal({
    title: "Are You Sure!",
    icon: "warning",
    dangerMode: true,
    buttons: true,
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

export const approvedPost = () => {
  return swal("Approved!", `News Post has been approved!`, "success");
};
