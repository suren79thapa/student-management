import { NavLink } from "react-router-dom";

export default function StudentCard({ student, onDelete }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow space-y-2">
      <h3 className="font-semibold">{student.name}</h3>
      <p>Email: {student.email}</p>
      <p>Course: {student.course}</p>
      <p>Age: {student.age}</p>

      <div className="flex justify-end gap-2 mt-2">
        <NavLink
          to={`/edit-student/${student.id}`}
          state={{ student }}
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Edit
        </NavLink>
        <button
          onClick={onDelete}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
