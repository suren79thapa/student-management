import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div>
      <Toaster position="top-right" />
      <Dashboard />
    </div>
  );
}
