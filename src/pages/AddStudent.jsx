import React from "react";
import { useAddStudentMutation } from "../api/studentApi";
import { useNavigate } from "react-router-dom";
import StudentForm from "../components/StudentForm";

export default function AddStudent() {
  const [addStudent] = useAddStudentMutation();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    await addStudent(values).unwrap();
    navigate("/"); // go back to dashboard
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <StudentForm
        initialValues={null} // null for adding
        onSubmit={handleSubmit}
        onCancel={() => navigate("/")}
      />
    </div>
  );
}
