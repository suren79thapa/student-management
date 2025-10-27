import { useNavigate } from "react-router-dom";
import StudentForm from "../components/StudentForm";

export default function AddStudent() {
  const navigate = useNavigate();

  const handleAdd = (student) => {
    console.log("New Student:", student);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <StudentForm
        initialValues={null}
        onSubmit={handleAdd}
        onCancel={() => navigate("/")}
      />
    </div>
  );
}
