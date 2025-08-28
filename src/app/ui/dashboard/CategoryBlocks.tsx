"use client";
import { useState } from "react";

export default function CategoryBlocks({
  jobs,
  filterByCategory,
}: {
  jobs: any[];
  filterByCategory: (category: string) => void;
}) {
  const categories = jobs.reduce((acc: any, job: any) => {
    acc[job.categoria] = acc[job.categoria] || [];
    acc[job.categoria].push(job);
    return acc;
  }, {});
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(categories).map(([category, jobList]: any) => (
        <div key={category} className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div
            className="flex justify-between items-center p-4 border-b cursor-pointer"
            onClick={() => {
              setOpenCategory(openCategory === category ? null : category);
              filterByCategory(category);
            }}
          >
            <h6 className="font-semibold text-gray-800 text-lg">
              {category} ({jobList.length})
            </h6>
            <i className={`fas fa-chevron-down ${openCategory === category ? "rotate-180" : ""}`}></i>
          </div>
          {openCategory === category && (
            <div className="p-4">
              {jobList.map((job: any) => (
                <div
                  key={job.id}//cambiar la logica a En proceso, Finalizado, Error
                  className={`p-2 my-1 rounded-md text-sm border-l-4 ${
                    job.estado === "Finalizado"
                      ? "bg-green-100 border-green-500"
                      : job.estado === "Error"
                      ? "bg-red-100 border-red-500"
                      : "bg-yellow-100 border-yellow-500"
                  }`}
                >
                  {job.nombre}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
