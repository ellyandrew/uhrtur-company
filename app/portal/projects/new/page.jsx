"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { useToast } from "@/components/ui/ToastContext";

export default function NewProjectPage() {
  const { data: session, status } = useSession({ required: true });
  const { showToast } = useToast();
  const router = useRouter();
  const roles = session?.user?.roles || [];
  const isAdmin = roles.includes("Admin");

  const [form, setForm] = useState({
    name: "",
    category: "",
    client: "",
    amount: "",
    deposit: "",
    startDate: "",
    endDate: "",
    notes: "",
  });

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get clients
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

  // Categories
  const categories = ["WEB UI", "Mobile UI", "Web App", "Mobile App", "ERP", "Support", "Database & Analytics", "Custom"];

  if (status === "loading") return <LoadingScreen text="Checking session..." />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.client || !form.category) {
      showToast("Please fill required fields", "error");
      return;
    }

  setLoading(true);

  try {
    // Create project with invoice automatically
    const res = await fetch("/api/projects/addProject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        client_id: Number(form.client),
        amount: parseFloat(form.amount || 0),
        deposit: parseFloat(form.deposit || 0),
      }),
    });

    if (!res.ok) throw new Error("Failed to create project");

    showToast("Project and initial invoice created successfully", "success");
    router.push("/portal/projects");
  } catch (err) {
    console.error(err);
    showToast("Error creating project", "error");
  } finally {
    setLoading(false);
  }
};

  return (
    <section className="p-6 max-w-6xl mx-auto">
      <h1 className="text-xl font-semibold mb-6">New Project</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white border rounded-xl shadow-sm p-6">
        {/* Project Name */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Project Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4458DC]"
          />
        </div>

        {/* Category & Client */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Category *</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4458DC]"
            >
              <option value="">- select category -</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Client *</label>
            <select
              name="client"
              value={form.client}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4458DC]"
            >
              <option value="">- select client -</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Amount & Deposit */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Amount</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4458DC]"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Deposit</label>
            <input
              type="number"
              name="deposit"
              value={form.deposit}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4458DC]"
            />
          </div>
        </div>

        {/* Dates */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4458DC]"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4458DC]"
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4458DC]"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#4458DC] text-white px-6 py-2 rounded-lg text-sm disabled:opacity-50"
          >
            {loading ? "Saving..." : "Create Project"}
          </button>
        </div>
      </form>
    </section>
  );
}
