import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="min-h-screen" style={{ marginLeft: 'var(--sidebar-offset, 16rem)' }}>
        <div className="h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}