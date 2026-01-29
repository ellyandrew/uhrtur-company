"use client";

import Sidebar from "@/components/layouts/MainSidebar";
import AdminNavbar from "@/components/layouts/MainNavbar";

export default function PortalLayout({ children }) {
  return (
    <main className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </main>
  );
}

