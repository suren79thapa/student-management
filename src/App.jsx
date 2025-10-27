import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />, // Dashboard page
    },
    {
      path: "/add-student",
      element: <AddStudent />, // Add student page
    },
    {
      path: "/edit-student/:id",
      element: <EditStudent />, // Edit student page
    },
  ]);

  return <RouterProvider router={router} />;
}
