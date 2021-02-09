import axios from "axios";

const networkRequest = async (url, method, _data) => {
  try {
    const { data } = await axios[method](url, _data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export default networkRequest;
