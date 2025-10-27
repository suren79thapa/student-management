export default function Modal({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md"
        onClick={(e) => e.stopPropagation()} // prevent modal close on inner click
      >
        {children}
      </div>
    </div>
  );
}
