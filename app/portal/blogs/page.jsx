"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Pencil, Trash2, Eye, Plus } from "lucide-react";
import { useToast } from "@/components/ui/ToastContext";
import LoadingScreen from "@/components/ui/LoadingScreen";

export default function AdminBlogsPage() {
  const { showToast } = useToast();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true);
      try {
        const res = await fetch("/api/blogs/getBlogs");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch blogs");
        setBlogs(data);
      } catch (err) {
        console.error(err);
        showToast(err.message || "Failed to load blogs", "error");
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  const filtered = blogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      setBlogs(blogs.filter((b) => b.id !== id));
      showToast("Blog deleted successfully", "success");
    } catch (err) {
      console.error(err);
      showToast(err.message || "Delete failed", "error");
    }
  };

  if (loading) return <LoadingScreen text="Loading blog posts..." />;

  return (
    <section className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Blog Posts</h1>
        <Link
          href="/portal/blogs/new"
          className="flex items-center gap-2 bg-[#4458DC] text-white px-4 py-2 rounded-lg hover:bg-[#3647b3]"
        >
          <Plus size={16} />
          New Post
        </Link>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4458DC]/40"
        />
      </div>

      <div className="overflow-x-auto bg-white border rounded-xl shadow-sm">
        <table className="w-full text-sm min-w-[600px]">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="text-left px-6 py-3">Title</th>
              <th className="text-left px-6 py-3">Author</th>
              <th className="text-left px-6 py-3">Category</th>
              <th className="text-left px-6 py-3">Published</th>
              <th className="text-left px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {paginated.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50">
                <td className="px-6 py-3 font-medium">{b.title}</td>
                <td className="px-6 py-3">{b.author || "Admin"}</td>
                <td className="px-6 py-3">{b.category || "-"}</td>
                <td className="px-6 py-3">
                  {new Date(b.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-3 flex gap-2">
                  <Link href={`/blog/${b.slug}`}>
                    <Eye size={16} className="text-blue-600" />
                  </Link>
                  <Link href={`/portal/blogs/${b.id}/edit`}>
                    <Pencil size={16} className="text-orange-500" />
                  </Link>
                  <button onClick={() => handleDelete(b.id)}>
                    <Trash2 size={16} className="text-red-500" />
                  </button>
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
