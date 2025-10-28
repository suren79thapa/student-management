// src/pages/EditStudent.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetStudentByIdQuery,
  useUpdateStudentMutation,
} from "../api/studentApi";
import StudentForm from "../components/StudentForm";
import toast from "react-hot-toast";

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetStudentByIdQuery(id);
  const [updateStudent] = useUpdateStudentMutation();

  if (isLoading) return <p className="text-center mt-10">Loading student...</p>;
  if (isError || !data?.student)
    return <p className="text-center mt-10 text-red-500">Student not found!</p>;

  const handleSubmit = async (values) => {
    try {
      await updateStudent({ id, ...values }).unwrap();
      toast.success("Student updated successfully!");
      navigate("/"); // back to dashboard
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update student");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <StudentForm
        initialValues={data.student} // prefill from API
        onSubmit={handleSubmit}
        onCancel={() => navigate("/")}
      />
    </div>
  );
}
