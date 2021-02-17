import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const setDateFromNow = (date) => dayjs(date).fromNow();

export default setDateFromNow;
