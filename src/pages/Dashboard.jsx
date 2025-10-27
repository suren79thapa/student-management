import { useState } from "react";
import Header from "../components/Header";
import StudentForm from "../components/StudentForm";
import StudentCard from "../components/StudentCard";
import StatsCard from "../components/StatsCard";
import { subjects } from "../data/subject";

export default function Dashboard() {
  // 🔹 State
  const [students, setStudents] = useState([
    { name: "John Doe", email: "john@example.com", course: "Math", age: 20 },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      course: "Physics",
      age: 22,
    },
    {
      name: "Robert Brown",
      email: "robert@example.com",
      course: "Chemistry",
      age: 23,
    },
  ]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All");

  // 🔹 Stats
  const totalStudents = students.length;
  const totalCourses = new Set(students.map((s) => s.course)).size;
  const avgAge =
    students.reduce((sum, s) => sum + Number(s.age), 0) /
    (students.length || 1);
  const lastThreeStudents = students.slice(-3).map((s) => s.name);

  // 🔹 Filtered students for display
  const filteredStudents = students.filter((s) => {
    const matchesName = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse =
      selectedCourse === "All" || s.course === selectedCourse;
    return matchesName && matchesCourse;
  });

  // 🔹 CRUD handlers
  const handleAddStudent = (student) => {
    setStudents([...students, student]);
    setShowFormModal(false);
  };

  const handleEditStudent = (updatedStudent, index) => {
    const updated = [...students];
    updated[index] = updatedStudent;
    setStudents(updated);
    setShowFormModal(false);
    setEditingStudent(null);
  };

  const handleDeleteStudent = (index) => {
    const updated = [...students];
    updated.splice(index, 1);
    setStudents(updated);
  };

  // 🔹 Unique courses for filter dropdown
  const uniqueCourses = ["All", ...subjects];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* 🔹 Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <StatsCard title="Total Students" value={totalStudents} />
          <StatsCard title="Total Courses" value={totalCourses} />
          <StatsCard title="Average Age" value={avgAge.toFixed(1)} />
          <StatsCard
            title="Last 3 Students"
            value={lastThreeStudents.join(", ")}
          />
        </section>

        {/* 🔹 Search & Filter */}
        <section className="flex flex-wrap items-center gap-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded w-full sm:w-64"
          />
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="p-2 border rounded"
          >
            {uniqueCourses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              setEditingStudent(null);
              setShowFormModal(true);
            }}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add Student
          </button>
        </section>

        {/* 🔹 Student Form Modal */}
        {showFormModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
              <StudentForm
                initialValues={editingStudent}
                onSubmit={(data) => {
                  if (editingStudent) {
                    handleEditStudent(data, students.indexOf(editingStudent));
                  } else {
                    handleAddStudent(data);
                  }
                }}
                onCancel={() => setShowFormModal(false)}
              />
            </div>
          </div>
        )}

        {/* 🔹 Student Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredStudents.map((student, index) => (
            <StudentCard
              key={index}
              student={student}
              onEdit={() => {
                setEditingStudent(student);
                setShowFormModal(true);
              }}
              onDelete={() => handleDeleteStudent(index)}
            />
          ))}
        </section>
      </main>
    </div>
  );
}
