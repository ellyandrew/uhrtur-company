"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { useToast } from "@/components/ui/ToastContext";

export default function InvoicesPage() {
  const { data: session, status } = useSession({ required: true });
  const { showToast } = useToast();
  const roles = session?.user?.roles || [];
  const isAdmin = roles.includes("Admin");

  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [page, setPage] = useState(1);

  const PER_PAGE = 10;

  useEffect(() => {
    async function fetchInvoices() {
      setLoading(true);
      try {
        const res = await fetch("/api/invoices/getInvoices");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setInvoices(data);
      } catch (err) {
        console.error(err);
        showToast("Failed to load invoices", "error");
      } finally {
        setLoading(false);
      }
    }
    fetchInvoices();
  }, []);

  if (status === "loading" || loading) {
    return <LoadingScreen text="Loading Invoices..." />;
  }

  // ---- Filtering ----
  let filtered = invoices.filter((inv) =>
    inv.projectName.toLowerCase().includes(search.toLowerCase())
  );

  if (filterStatus) {
    filtered = filtered.filter((inv) => inv.status === filterStatus);
  }

  // ---- Pagination ----
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const paginated = filtered.slice(start, start + PER_PAGE);

  return (
    <section className="p-6">

      {/* Header */}
      <div className="flex justify-between mb-6">
        <input
          placeholder="Search project..."
          className="border px-3 py-2 rounded text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {isAdmin && (
          <Link
            href="/portal/invoices/new"
            className="bg-[#4458DC] text-white px-4 py-2 rounded-lg text-sm"
          >
            + New Invoice
          </Link>
        )}
      </div>

      {/* Table */}
      <div className="bg-white border rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm min-w-[900px]">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="text-left px-6 py-3">Invoice #</th>
              <th className="text-left px-6 py-3">Project</th>
              <th className="text-left px-6 py-3">Amount</th>
              <th className="text-left px-6 py-3">Paid</th>
              <th className="text-left px-6 py-3">Balance</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-left px-6 py-3">Date</th>
              <th className="text-left px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {paginated.map((inv) => (
              <tr key={inv.id} className="hover:bg-gray-50">

                <td className="px-6 py-3 font-medium">INV-{inv.id}</td>
                <td className="px-6 py-3">{inv.projectName}</td>
                <td className="px-6 py-3">Ksh {inv.amount.toLocaleString()}</td>
                <td className="px-6 py-3">Ksh {inv.paid.toLocaleString()}</td>
                <td className="px-6 py-3">
                  Ksh {inv.balance.toLocaleString()}
                </td>

                <td className="px-6 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      inv.status === "PAID"
                        ? "bg-green-100 text-green-700"
                        : inv.status === "PARTIAL"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {inv.status}
                  </span>
                </td>

                <td className="px-6 py-3">{inv.date}</td>

                <td className="px-6 py-3 flex gap-3">
                  <Link href={`/portal/invoices/${inv.id}`}>
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
