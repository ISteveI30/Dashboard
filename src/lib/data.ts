//export const estados = ["text-success", "text-danger", "text-warning"];
//export const nombres = ["Job_CargaClientes", "Job_CargaTransacciones", "Job_ValidaPagos", "Job_ActualizaProductos", "Job_CierreDiario"];
//export const categorias = ["Malla de Produccion", "Proceso Tarjetas", "Proceso de Cierre"];
//export const mensajes: Record<string, string> = {
//  "text-success": "Completado exitosamente",
//  "text-danger": "Fallo en ejecución",
//  "text-warning": "En ejecución",
//};

//export function generateJobData() {
//  const data = [];
//  for (let i = 1; i <= 50; i++) {
//    const fecha = new Date(Date.now() - Math.random() * 10 * 86400000);
//    const estado = estados[Math.floor(Math.random() * estados.length)];
//    const nombre = nombres[Math.floor(Math.random() * nombres.length)];
//    const categoria = categorias[Math.floor(Math.random() * categorias.length)];
//    const progreso = estado === "text-warning" ? Math.floor(Math.random() * 100) : estado === "text-success" ? 100 : 0;
//
//    data.push({
//      id: i,
//      nombre,
//      servidor: "SRVSQL01",
//      fecha: fecha.toISOString().split("T")[0],
//      horaInicio: "06:00",
//      horaFin: "06:02",
//      duracion: `${Math.floor(Math.random() * 60) + 1} min ${Math.floor(Math.random() * 60)} seg`,
//      estado,
//      progreso,
//      mensaje: mensajes[estado],
//      categoria,
//    });
//  }
//  return data;
//}
export async function generateJobData() {
  let job = await fetch('http://localhost:4000/jobs');
  let data = await job.json();
  console.log(data);
  return data;
}


export function generateLogSimulado(job: any) {
  let logContent = `Log de ejecución para el job: ${job.nombre} (ID: ${job.id})\nServidor: ${job.servidor}\n\n`;
  if (job.estado === "text-danger") {
    logContent += `ERROR - [${job.fecha} 06:02] Fallo al cargar datos.\nFATAL - Proceso abortado.\n`;
  } else {
    logContent += `INFO - [${job.fecha} ${job.horaInicio}] Inicio\nINFO - [${job.fecha} ${job.horaFin}] Finalizado exitosamente\n`;
  }
  return logContent;
}

export function generateChartData(data: any[], startDate?: string, endDate?: string) {
  let filteredData = data;
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    filteredData = data.filter(job => {
      const jobDate = new Date(job.fecha);
      return jobDate >= start && jobDate <= end;
    });
  }

  const resumen: Record<string, { ok: number; error: number }> = {};
  filteredData.forEach(job => {
    const fecha = job.fecha;
    if (!resumen[fecha]) resumen[fecha] = { ok: 0, error: 0 };
    if (job.estado === "text-success") resumen[fecha].ok++;
    if (job.estado === "text-danger") resumen[fecha].error++;
  });

  const fechas = Object.keys(resumen).sort();
  return {
    labels: fechas,
    datasets: [
      { label: "Procesos Correctos", data: fechas.map(f => resumen[f].ok), borderColor: "#28a745", backgroundColor: "rgba(40,167,69,0.1)", fill: true, tension: 0.3 },
      { label: "Procesos Caídos", data: fechas.map(f => resumen[f].error), borderColor: "#dc3545", backgroundColor: "rgba(220,53,69,0.1)", fill: true, tension: 0.3 },
    ],
  };
}
