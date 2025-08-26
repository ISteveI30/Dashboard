export default function JobDetailTable({
  jobs,
  showLog,
}: {
  jobs: any[];
  showLog: (id: number) => void;
}) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
      <table className="min-w-full table-auto text-sm">
        <thead className="bg-gray-800 text-white sticky top-0">
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Nombre del Job</th>
            <th className="px-4 py-2">Servidor</th>
            <th className="px-4 py-2">Fecha</th>
            <th className="px-4 py-2">Hora Inicio</th>
            <th className="px-4 py-2">Hora Fin</th>
            <th className="px-4 py-2">Duración</th>
            <th className="px-4 py-2">Estado</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <tr key={job.id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border-t">{index + 1}</td>
              <td className="px-4 py-2 border-t">{job.nombre}</td>
              <td className="px-4 py-2 border-t">{job.servidor}</td>
              <td className="px-4 py-2 border-t">{job.fecha}</td>
              <td className="px-4 py-2 border-t">{job.horaInicio}</td>
              <td className="px-4 py-2 border-t">{job.horaFin}</td>
              <td className="px-4 py-2 border-t">{job.duracion}</td>
              <td className={`px-4 py-2 border-t ${job.estado}`}>
                {job.estado === "text-success" ? "OK" : job.estado === "text-danger" ? "Error" : "En Proceso"}
              </td>
              <td className="px-4 py-2 border-t text-center">
                <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600" onClick={() => showLog(job.id)}>
                  <i className="fas fa-file-alt"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
