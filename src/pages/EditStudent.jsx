import { useNavigate, useLocation } from "react-router-dom";
import StudentForm from "../components/StudentForm";
import toast from "react-hot-toast";

export default function EditStudent() {
  const navigate = useNavigate();
  const location = useLocation();
  const student = location.state?.student; // Get student from NavLink state

  if (!student) {
    // If no student data is passed, go back to dashboard
    navigate("/");
    return null;
  }

  const handleUpdate = (updatedStudent) => {
    console.log("Updated Student:", updatedStudent);
    toast.success("Student updated successfully!");
    navigate("/"); // Go back to dashboard after editing
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <StudentForm
        initialValues={student}
        onSubmit={handleUpdate}
        onCancel={() => navigate("/")}
      />
    </div>
  );
}
