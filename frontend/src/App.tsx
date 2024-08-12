import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Login } from "./pages/Login";
import { HomePage, loader as UsersLoader } from "./pages/HomePage";
import { UserProvider, loader as userLoader } from "./provider/UserProvider";
import ErrorBoundary from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "",
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Navigate to="HomePage" /> },
      { path: "Login", element: <Login /> },
      {
        path: "",
        loader: userLoader,
        element: <UserProvider />,
        children: [
          { path: "HomePage", loader: UsersLoader, element: <HomePage /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
