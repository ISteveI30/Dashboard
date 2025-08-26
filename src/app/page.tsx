"use client";
import { useState, useEffect } from "react";
import Sidebar from "./ui/dashboard/Sidebar";
import Header from "./ui/dashboard/Header";
import CardMetric from "./ui/dashboard/CardMetric";
import JobDetailTable from "./ui/dashboard/JobDetailTable";
import CategoryBlocks from "./ui/dashboard/CategoryBlocks";
import LogModal from "./ui/dashboard/LogModal";
import JobChart from "./ui/dashboard/JobChart"; 
import {
  generateJobData,
  generateChartData,
  generateLogSimulado,
} from "../lib/data";

export default function Home() {
  const [activeContent, setActiveContent] = useState("dashboard");
  const [jobs, setJobs] = useState<any[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const [selectedLog, setSelectedLog] = useState<any | null>(null);
  const [chartData, setChartData] = useState<any>({});

  useEffect(() => {
    const generatedJobs = generateJobData();
    setJobs(generatedJobs);
    setFilteredJobs(generatedJobs);
    setChartData(generateChartData(generatedJobs));
  }, []);

  return (
    <div className="flex">
      <Sidebar
        activeContent={activeContent}
        setActiveContent={setActiveContent}
      />
      <main className="flex-1 ml-52 p-6 bg-gray-100 min-h-screen">
        {activeContent === "dashboard" ? (
          <>
            <Header title="Dashboard Gerencial" />
            <p className="mt-4 text-gray-700">
              Bienvenido al resumen ejecutivo. Aquí se mostrarán indicadores
              clave, gráficos consolidados y estado general del ecosistema de
              datos.
            </p>
          </>
        ) : (
          <>
            <Header title="Monitoreo de Procesos" />

            {/* Cards métricas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <CardMetric
                title="Total Jobs"
                value={jobs.length}
                icon="fa-network-wired"
              />
              <CardMetric
                title="Ejecutando"
                value={jobs.filter((j) => j.estado === "text-warning").length}
                icon="fa-play-circle"
              />
              <CardMetric
                title="Finalizados OK"
                value={jobs.filter((j) => j.estado === "text-success").length}
                icon="fa-check-circle"
              />
              <CardMetric
                title="Caídos"
                value={jobs.filter((j) => j.estado === "text-danger").length}
                icon="fa-exclamation-triangle"
                isError
              />
            </div>

            {/*  Gráfico Histórico */}
            <div className="mt-6">
              <JobChart chartData={chartData} />
            </div>

            {/* Bloques de Categoría */}
            <div className="mt-6">
              <CategoryBlocks
                jobs={jobs}
                filterByCategory={(category: string) => {
                  const filtered = jobs.filter(
                    (job) => job.categoria === category
                  );
                  setFilteredJobs(filtered);
                }}
              />
            </div>

            {/* Tabla de Detalle */}
            <div className="mt-6">
              <JobDetailTable
                jobs={filteredJobs}
                showLog={(id: number) => {
                  const job = jobs.find((j) => j.id === id);
                  if (job) setSelectedLog({ content: generateLogSimulado(job) });
                }}
              />
            </div>

            {/* Modal Log */}
            <LogModal log={selectedLog} onClose={() => setSelectedLog(null)} />
          </>
        )}
      </main>
    </div>
  );
}
