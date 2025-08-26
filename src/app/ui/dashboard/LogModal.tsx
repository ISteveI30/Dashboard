export default function LogModal({
  log,
  onClose,
}: {
  log: any | null;
  onClose: () => void;
}) {
  if (!log) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 p-6">
        <div className="flex justify-between items-center border-b pb-4">
          <h5 className="font-bold text-lg">Log de Ejecución</h5>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="mt-4">
          <pre className="bg-gray-100 p-4 rounded-md overflow-y-scroll max-h-96 text-sm">{log.content}</pre>
        </div>
      </div>
    </div>
  );
}
