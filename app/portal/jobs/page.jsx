"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { useToast } from "@/components/ui/ToastContext";

export default function JobsPage() {
  const { data: session, status } = useSession({ required: true });
  const { showToast } = useToast();
  const roles = session?.user?.roles || [];
  const isAdmin = roles.includes("Admin");

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      try {
        const res = await fetch("/api/jobs/getJobs");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch jobs");
        setJobs(data);
      } catch (err) {
        console.error(err);
        showToast("Failed to load jobs", "error");
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  let filtered = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.department?.toLowerCase().includes(search.toLowerCase())
  );

  if (filterStatus) filtered = filtered.filter((j) => j.status === filterStatus);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const paginated = filtered.slice(start, start + PAGE_SIZE);

  if (status === "loading" || loading) return <LoadingScreen text="Loading jobs..." />;

  return (
    <section className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-900">Company Vacancies</h1>
        {isAdmin && (
          <Link
            href="/portal/jobs/new"
            className="bg-[#4458DC] text-white px-4 py-2 rounded-lg text-sm"
          >
            + New Job
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by title or department"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-1/2"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="">All Status</option>
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
          <option value="Paused">Paused</option>
        </select>
      </div>

      {/* Jobs Table */}
      <div className="bg-white border rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="text-left px-6 py-3">Title</th>
              <th className="text-left px-6 py-3">Department</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-left px-6 py-3">Posted Date</th>
              <th className="text-left px-6 py-3">Closing Date</th>
              <th className="text-left px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {paginated.map((j) => (
              <tr key={j.id} className="hover:bg-gray-50">
                <td className="px-6 py-3 font-medium">{j.title}</td>
                <td className="px-6 py-3">{j.department || "—"}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      j.status === "Open"
                        ? "bg-green-100 text-green-700"
                        : j.status === "Closed"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {j.status}
                  </span>
                </td>
                <td className="px-6 py-3">{j.postedDate || "—"}</td>
                <td className="px-6 py-3">{j.closingDate || "—"}</td>
                <td className="px-6 py-3 flex gap-2">
                  <Link href={`/portal/jobs/${j.id}`}>
                    <Eye size={16} className="text-blue-600" />
                  </Link>
                  {isAdmin && (
                    <>
                      <Link href={`/portal/jobs/edit/${j.id}`}>
                        <Pencil size={16} className="text-orange-500" />
                      </Link>
                      <button
                        onClick={() => showToast("Delete job clicked", "info")}
                      >
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
            Page {page} of {totalPages}
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
              disabled={page === totalPages}
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
