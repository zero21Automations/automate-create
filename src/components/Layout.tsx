import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="ml-16 lg:ml-64">
        <div className="h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}