import { Navigate } from "react-router";
import LoginView from "../views/auth/LoginView";
const routes = [
  { path: "login", element: <LoginView /> },
  { path: "*", element: <Navigate to="/login" /> },
];

export default routes;
