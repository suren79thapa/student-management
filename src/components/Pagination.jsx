export default function Pagination({ currentPage, totalPages }) {
  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      <button className="px-4 py-2 bg-blue-500 text-white rounded-l hover:bg-blue-600 transition">
        Prev
      </button>
      <span className="px-4 py-2 bg-blue-500 text-white">{currentPage}</span>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 transition">
        Next
      </button>
    </div>
  );
}
