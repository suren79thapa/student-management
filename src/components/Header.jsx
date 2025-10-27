export default function Header() {
  return (
    <div className="w-full bg-blue-500 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Branding */}
        <div className="text-2xl font-bold">Student Management</div>

        {/* Right side (Admin text only) */}
        <div className="hidden sm:block font-medium">Admin</div>
      </div>
    </div>
  );
}
