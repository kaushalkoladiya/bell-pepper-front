import dayjs from "dayjs";
const setDate = (date, fullDate = false) =>
  fullDate
    ? dayjs(date).format("DD/MM/YYYY HH:MM A, dddd")
    : dayjs(date).format("DD/MM/YYYY");

export default setDate;
