export default function StatsCard({ title, value }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center">
      <h3 className="text-gray-500 font-medium">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
