"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, Pencil, Trash2, Search } from "lucide-react";
import { useSession } from "next-auth/react";
import LoadingScreen from "@/components/ui/LoadingScreen";

const PAGE_SIZE = 5;

export default function ClientsPage() {
  const { data: session, status } = useSession();
  const roles = session?.user?.roles || [];
  const isAdmin = roles.includes("Admin");

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchClients() {
      setLoading(true);
      try {
        const res = await fetch("/api/clients/getClients");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch clients");
        setClients(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchClients();
  }, []);

  if (status === "loading" || loading) return <LoadingScreen text="Loading clients..." />;

  // Filtering
  let filtered = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );
  if (filterStatus)
    filtered = filtered.filter((c) => c.status === filterStatus);

  // Pagination
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const paginated = filtered.slice(start, start + PAGE_SIZE);

  return (
    <section className="p-6">

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-3 text-gray-400" />
          <input
            className="pl-9 pr-3 py-2 border rounded-lg text-sm"
            placeholder="Search client..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <select
          className="border rounded-lg px-3 py-2 text-sm"
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
          <option value="BLOCKED">Blocked</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-xl shadow-sm overflow-x-auto">

        {/* Table Actions */}
        <div className="flex justify-between items-center px-6 py-3 border-b bg-gray-100">
          <h2 className="text-sm font-semibold text-gray-700">Clients</h2>

          <div className="flex gap-2">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition">
              Print
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition">
              Export CSV
            </button>
            {isAdmin && (
              <Link
                href="/portal/clients/new"
                className="bg-[#4458DC] text-white px-4 py-2 rounded-lg text-sm"
              >
                + New Client
              </Link>
            )}
          </div>
        </div>

        {/* Table */}
        <table className="min-w-full text-sm">
          <thead className="bg-[#4458DC]/10 text-gray-700 uppercase text-xs">
            <tr>
              <th className="text-left px-6 py-3">Client</th>
              <th className="text-left px-6 py-3">Email</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-left px-6 py-3">Created</th>
              <th className="text-left px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {paginated.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-6 py-3 font-medium">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                    {c.logo ? (
                        <img
                        src={c.logo}
                        alt={c.name}
                        width={18}
                        height={18}
                        className="w-full h-full object-contain p-2"
                        />
                    ) : (
                        <span className="text-xs text-gray-400">
                        {c.name.charAt(0)}
                        </span>
                    )}
                    </div>

                    {/* Name */}
                    <span className="text-gray-800">{c.name}</span>
                </div>
                </td>
                <td className="px-6 py-3">{c.email}</td>
                <td className="px-6 py-3">
                  <span
                        className={`px-2 py-1 rounded-full text-xs ${
                            c.status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : c.status === "INACTIVE"
                            ? "bg-gray-200 text-gray-600"
                            : c.status === "BLOCKED"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                        >
                        {c.status}
                    </span>

                </td>
                <td className="px-6 py-3">{c.createdAt}</td>
                <td className="px-6 py-3 flex gap-3">
                  <Link href={`/portal/clients/${c.id}`}>
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

          <tfoot className="bg-gray-100 text-gray-700 text-sm font-medium">
            <tr>
              <td className="px-6 py-3" colSpan={5}>
                Total Clients: {filtered.length}
              </td>
            </tr>
          </tfoot>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center px-6 py-3 border-t text-sm bg-gray-50">
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
