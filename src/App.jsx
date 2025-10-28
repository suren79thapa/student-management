import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import Header from "./components/Header";

export default function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Dashboard /> },
    { path: "/add-student", element: <AddStudent /> },
    { path: "/edit-student/:id", element: <EditStudent /> },
  ]);

  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  );
}
