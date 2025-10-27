import { useState } from "react";
import { NavLink } from "react-router-dom";
import StudentCard from "../components/StudentCard";
import StatsCard from "../components/StatsCard";
import { subjects } from "../data/subject";

export default function Dashboard() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      course: "Math",
      age: 20,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      course: "Physics",
      age: 22,
    },
    {
      id: 3,
      name: "Robert Brown",
      email: "robert@example.com",
      course: "Chemistry",
      age: 23,
    },
  ]);

  const totalStudents = students.length;
  const totalCourses = subjects.length;
  const avgAge = (
    students.reduce((sum, s) => sum + s.age, 0) / students.length || 0
  ).toFixed(1);
  const lastThreeStudents = students
    .slice(-3)
    .map((s) => s.name)
    .join(", ");

  const handleDelete = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Student Dashboard</h1>
        <NavLink
          to="/add-student"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Student
        </NavLink>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatsCard title="Total Students" value={totalStudents} />
        <StatsCard title="Total Courses" value={totalCourses} />
        <StatsCard title="Average Age" value={avgAge} />
        <StatsCard title="Last 3 Students" value={lastThreeStudents} />
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {students.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onDelete={() => handleDelete(student.id)}
          />
        ))}
      </section>
    </div>
  );
}
