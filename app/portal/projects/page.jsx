"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Pencil, Trash2, Eye } from "lucide-react";
import { useSession } from "next-auth/react";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { useToast } from "@/components/ui/ToastContext";

export default function ProjectsPage() {
  const { data: session, status } = useSession({ required: true });
  const { showToast } = useToast();
  const roles = session?.user?.roles || [];
  const isAdmin = roles.includes("Admin");

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [page, setPage] = useState(1);

  const PER_PAGE = 10;

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      try {
        const res = await fetch("/api/projects/getProjects");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch projects");
        setProjects(data);
      } catch (err) {
        console.error(err);
        showToast("Failed to load projects", "error");
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  // ---- Loading ----
  if (status === "loading" || loading) {
    return <LoadingScreen text="Loading Projects..." />;
  }

  // ---- Filtering ----
  let filtered = projects.filter((p) =>
    (p.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (p.client?.name || "").toLowerCase().includes(search.toLowerCase())
  );

  if (filterStatus) {
    filtered = filtered.filter((p) => p.status === filterStatus);
  }

  // ---- Pagination ----
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const paginated = filtered.slice(start, start + PER_PAGE);

  return (
    <section className="p-6">
      
      {/* Header */}
      <div className="flex justify-end mb-6">
       
        {isAdmin && (
          <Link
            href="/portal/projects/new"
            className="bg-[#4458DC] text-white px-4 py-2 rounded-lg text-sm"
          >
            + New Project
          </Link>
        )}
      </div>

      {/* Table */}
      <div className="bg-white border rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="text-left px-6 py-3">Project</th>
              <th className="text-left px-6 py-3">Client</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-left px-6 py-3">Start Date</th>
              <th className="text-left px-6 py-3">End Date</th>
              <th className="text-left px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {paginated.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                
                {/* Project */}
                <td className="px-6 py-3 font-medium">{p.name}</td>

                {/* Client */}
                <td className="px-6 py-3 flex items-center gap-3">
                  {p.client?.logo ? (
                    <img
                      src={p.client.logo}
                      className="w-8 h-8 rounded-full object-contain border bg-white"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#4458DC]/20 flex items-center justify-center text-xs font-bold text-[#4458DC]">
                      {p.client?.name?.charAt(0) || "?"}
                    </div>
                  )}
                  <span>{p.client?.name}</span>
                </td>

                {/* Status */}
                <td className="px-6 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      p.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : p.status === "Completed"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>

                <td className="px-6 py-3">{p.startDate}</td>
                <td className="px-6 py-3">{p.endDate || "—"}</td>

                {/* Actions */}
                <td className="px-6 py-3 flex gap-3">
                  <Link href={`/portal/projects/${p.id}`}>
                    <Eye size={16} className="text-blue-600" />
                  </Link>

                  {isAdmin && (
                    <>
                      <button>
                        <Pencil size={16} className="text-orange-500" />
                      </button>
                      <button>
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center px-6 py-3 border-t text-sm">
          <span>
            Page {page} of {totalPages || 1}
          </span>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <button
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
