export default function StudentCard({ student, onEdit, onDelete }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition transform hover:-translate-y-1">
      <div className="font-bold text-lg">{student.name}</div>
      <div className="text-gray-500 text-sm">{student.email}</div>
      <div className="mt-2 font-medium">{student.course}</div>
      <div className="mt-1 text-gray-600">Age: {student.age}</div>
      <div className="mt-4 flex space-x-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
