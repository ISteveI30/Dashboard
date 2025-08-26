export default function Header({ title }: { title: string }) {
  return (
    <div className="bg-red-600 text-white py-4 px-6 rounded-md shadow-md flex justify-between items-center">
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  );
}
