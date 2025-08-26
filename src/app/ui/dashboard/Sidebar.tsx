"use client";
import Link from "next/link";

export default function Sidebar({ activeContent, setActiveContent }: any) {
  const linkClass = (isActive: boolean) =>
    `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
      isActive ? "bg-red-600 text-white" : "hover:bg-red-600"
    }`;

  return (
    <aside className="fixed top-0 left-0 w-52 h-full bg-gray-900 text-white p-4 flex flex-col justify-between">
      <div>
        <h4 className="text-xl font-bold text-red-600 text-center mb-8">Scotiabank</h4>
        <nav className="flex flex-col gap-2">
          <button
            className={linkClass(activeContent === "dashboard")}
            onClick={() => setActiveContent("dashboard")}
          >
            <i className="fas fa-chart-line"></i>
            <span>Dashboard</span>
          </button>

          <button
            className={linkClass(activeContent === "procesos")}
            onClick={() => setActiveContent("procesos")}
          >
            <i className="fas fa-cogs"></i>
            <span>Procesos</span>
          </button>

          <Link href="#" className={linkClass(false)}>
            <i className="fas fa-database"></i>
            <span>Storage</span>
          </Link>

          <Link href="#" className={linkClass(false)}>
            <i className="fas fa-project-diagram"></i>
            <span>Linaje</span>
          </Link>

          <Link href="#" className={linkClass(false)}>
            <i className="fas fa-code"></i>
            <span>SP Monitor</span>
          </Link>
        </nav>
      </div>

      <button className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-red-600">
        <i className="fas fa-sign-out-alt"></i>
        <span>Cerrar sesión</span>
      </button>
    </aside>
  );
}
