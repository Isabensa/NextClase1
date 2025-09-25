import type { ReactNode } from "react";
import SideNav from "../ui/dashboard/sidenav"; // 👈 import RELATIVO

// Layout para todas las rutas /dashboard/*
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <aside className="w-full flex-none md:w-64">
        <SideNav />
      </aside>

      {/* Aquí Next inserta la page.tsx de cada subruta */}
      <main className="flex-grow p-6 md:overflow-y-auto md:p-12">
        {children}
      </main>
    </div>
  );
}
