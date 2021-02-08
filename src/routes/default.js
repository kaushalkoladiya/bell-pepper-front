import { Navigate } from "react-router";
// Views
import NotFoundView from "../views/errors/NotFoundView";
import LoginView from "../views/auth/LoginView";
const routes = [
  { path: "login", element: <LoginView /> },
  { path: "404", element: <NotFoundView /> },
  { path: "/", element: <Navigate to="/login" /> },
  { path: "*", element: <Navigate to="/404" /> },
];

export default routes;
