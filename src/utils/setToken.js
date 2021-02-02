import axios from "axios";

export default function setToken(token) {
  if (token) {
    localStorage.setItem("token", token);
    return (axios.defaults.headers.common["Authorization"] = `Bearer ${token}`);
  } else {
    localStorage.removeItem("token");
    return delete axios.defaults.headers.common["Authorization"];
  }
}
