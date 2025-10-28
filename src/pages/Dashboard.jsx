// src/pages/Dashboard.jsx
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  useGetStudentsQuery,
  useDeleteStudentMutation,
} from "../api/studentApi";

// ✅ StatsCard Component
const StatsCard = ({ title, value }) => (
  <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center hover:shadow-xl transition">
    <h3 className="text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </div>
);

// ✅ StudentCard Component
const StudentCard = ({ student, onEdit, onDelete }) => {
  const colors = {
    Math: "bg-purple-200 text-purple-800",
    Physics: "bg-red-200 text-red-800",
    Chemistry: "bg-yellow-200 text-yellow-800",
    Biology: "bg-green-200 text-green-800",
    MERN: "bg-blue-200 text-blue-800",
    MEAN: "bg-indigo-200 text-indigo-800",
    "Data Science": "bg-pink-200 text-pink-800",
    Java: "bg-orange-200 text-orange-800",
    Python: "bg-green-300 text-green-900",
    React: "bg-teal-200 text-teal-900",
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition space-y-2">
      <h3 className="font-bold text-lg">{student.name}</h3>
      <p>Email: {student.email}</p>
      <p>Age: {student.age}</p>
      <span
        className={`px-2 py-1 rounded-full text-sm font-semibold ${
          colors[student.course] || "bg-gray-200 text-gray-800"
        }`}
      >
        {student.course}
      </span>

      <div className="flex justify-end gap-2 mt-3">
        <button
          onClick={() => onEdit(student._id)}
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(student._id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 6; // students per page

  const { data, isLoading, isError } = useGetStudentsQuery({ page, limit });
  const [deleteStudent] = useDeleteStudentMutation();

  const [searchText, setSearchText] = useState("");
  const [filterCourse, setFilterCourse] = useState("");

  // ✅ Handle delete
  const handleDelete = async (id) => {
    try {
      await deleteStudent(id).unwrap();
      toast.success("Student deleted successfully!");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete student");
    }
  };

  // ✅ Filter students by search & course
  const filteredStudents = useMemo(() => {
    if (!data?.students) return [];
    return data.students.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(searchText.toLowerCase()) ||
        s.email.toLowerCase().includes(searchText.toLowerCase());
      const matchesCourse = filterCourse ? s.course === filterCourse : true;
      return matchesSearch && matchesCourse;
    });
  }, [data, searchText, filterCourse]);

  if (isLoading)
    return <p className="text-center mt-10">Loading students...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Error loading students!</p>
    );

  // ✅ Pagination and Stats
  const totalPages = data?.pagination?.totalPages || 1;
  const totalStudents = data?.pagination?.totalStudents || 0;
  const totalCourses = data?.stats?.totalCourses || 0;
  const averageAge = data?.stats?.averageAge
    ? Math.round(data.stats.averageAge)
    : "-";

  // ✅ Courses for dropdown (all courses, not just current page)
  const courses = data?.stats?.allCourses || [];

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <Toaster position="top-right" />

      {/* Stats Cards */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <StatsCard title="Total Students" value={totalStudents} />
        <StatsCard title="Courses Offered" value={totalCourses} />
        <StatsCard title="Average Age" value={averageAge} />
      </div>

      {/* Search, Filter & Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 p-4 bg-gray-50 rounded shadow-md">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full md:w-1/2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
          className="w-full md:w-1/4 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Courses</option>
          {courses.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>

        <button
          onClick={() => navigate("/add-student")}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:from-green-600 hover:to-green-700"
        >
          + Add Student
        </button>
      </div>

      {/* Student Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.length === 0 ? (
          <p className="col-span-full text-center py-10 text-gray-500">
            No students found.
          </p>
        ) : (
          filteredStudents.map((student) => (
            <StudentCard
              key={student._id}
              student={student}
              onEdit={(id) => navigate(`/edit-student/${id}`)}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8 gap-3">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded-lg font-semibold ${
            page === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          ← Previous
        </button>

        <span className="font-semibold text-gray-700">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded-lg font-semibold ${
            page === totalPages
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
