"use client";

import { useParams } from "next/navigation";
import { ArrowLeft, Edit, Trash2, Printer, FileText } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import ClientEditModal from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/ToastContext";

export default function ClientDetails() {
  const { data: session } = useSession();
  const roles = session?.user?.roles || [];
  const isAdmin = roles.includes("Admin");
  const { showToast } = useToast();

  const { id } = useParams();

  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

  const [logoOpen, setLogoModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);


  const dropdownRef = useRef(null);

  // Fetch client
  useEffect(() => {
    async function fetchClient() {
      const res = await fetch(`/api/clients/${id}`);
      if (res.ok) {
        const data = await res.json();
        setClient(data);
      }
      setLoading(false);
    }
    if (id) fetchClient();
  }, [id]);

  // Client for update
  useEffect(() => {
  if (client) {
     console.log("Client for edit:", client);
    setForm({
      name: client.name || "",
      email: client.email || "",
      phone: client.phone || "",
      address: client.address || "",
      status: client.status || "",
      contactPerson: client.contactPerson || "",
      contactEmail: client.contactEmail || "",
    });
  }
}, [client]);

// Handle logo update
async function handleUpload() {
  if (!file) {
    showToast("Please select a file", "error");
    return;
  }

  try {
    setUploading(true);

    const formData = new FormData();
    formData.append("logo", file);

    const res = await fetch(`/api/clients/${id}/logo`, {
      method: "PUT",
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json();
      showToast(err?.error || "Failed to update logo", "error");
      return;
    }

    const data = await res.json();
    setClient((prev) => ({ ...prev, logo: data.logo }));
    setLogoModalOpen(false);

    showToast("Logo updated successfully", "success");
  } catch (err) {
    console.error("Logo upload error:", err);
    showToast("Network error. Please try again.", "error");
  } finally {
    setUploading(false);
  }
}



  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ---- Loading & Error states ----
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-gray-500 text-sm">Loading client details...</p>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-red-500 text-sm">Client not found</p>
      </div>
    );
  }

  return (
    <section className="p-6 space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <Link
          href="/portal/clients"
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft size={16} /> Back to Clients
        </Link>

        {isAdmin && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="bg-[#4458DC] text-white px-4 py-2 rounded-lg text-sm shadow hover:bg-[#3646c5] cursor-pointer"
            >
              Actions
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50 overflow-hidden">
                <ActionItem onClick={() => {
                    setEditOpen(true);
                    setShowDropdown(false);
                  }} icon={<Edit size={16} />} label="Edit Client" />
                <ActionItem icon={<Trash2 size={16} />} label="Delete Client" />
                <ActionItem icon={<Printer size={16} />} label="Print" />
                <ActionItem icon={<FileText size={16} />} label="Export Details" />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Client Profile Card */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">

        {/* Top Banner */}
        <div className="bg-[#4458DC]/10 px-6 py-5 flex items-center gap-4">
          {client.logo ? (
            <div className="relative w-16 h-16">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="w-16 h-16 rounded-full object-contain p-2 border bg-white"
                />
                {isAdmin && (
                  <button
                    onClick={() => setLogoModalOpen(true)}
                    className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                  >
                    <Edit size={16} className="text-[#4458DC] cursor-pointer" />
                  </button>
                )}
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-[#4458DC]/20 flex items-center justify-center font-bold text-[#4458DC] relative">
              {client?.name?.charAt(0) || "?"}
              {isAdmin && (
                <button
                  onClick={() => setLogoModalOpen(true)}
                  className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                >
                  <Edit size={16} className="text-[#4458DC] cursor-pointer" />
                </button>
              )}
            </div>
          )}

          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {client.name}
            </h1>
            <p className="text-sm text-gray-600">{client.email}</p>
          </div>
        </div>

        {/* Details */}
        <div className="p-6 grid md:grid-cols-2 gap-6 text-sm">
          <Info label="Phone" value={client.phone} />
          <Info label="Status" value={client.status} />
          <Info label="Created" value={client.created} />
          <Info label="Address" value={client.address} />
          <Info label="Website" value={client.website || "—"} />
          <Info label="Contact Person" value={client.contactPerson || "—"} />
          <Info label="Contact Email" value={client.contactEmail || "—"} />
        </div>
      </div>

      {/* Edit CLient Modal */}
      <ClientEditModal size="lg" open={editOpen} onClose={() => setEditOpen(false)} title="Edit Client">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Client Name</label>
            <Input
              value={form.name}
              onChange={(e)=>setForm({...form, name:e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Email</label>
            <Input
              value={form.email}
              onChange={(e)=>setForm({...form, email:e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Phone</label>
            <Input
              value={form.phone}
              onChange={(e)=>setForm({...form, phone:e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Contact Person</label>
            <Input
              value={form.contactPerson}
              onChange={(e)=>setForm({...form, contactPerson:e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Contact Email</label>
            <Input
              value={form.contactEmail}
              onChange={(e)=>setForm({...form, contactEmail:e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-sm text-gray-600">Address</label>
            <Input
              value={form.address}
              onChange={(e)=>setForm({...form, address:e.target.value})}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Status</label>
            <select
              value={form.status}
              onChange={(e)=>setForm({...form, status:e.target.value})}
              className="mt-1 border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#4458DC]/40"
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="BLOCKED">BLOCKED</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setEditOpen(false)}
            className="px-4 py-2 text-sm border rounded-lg"
          >
            Cancel
          </button>

          <button
            disabled={saving}
            onClick={async () => {
              try {
              setSaving(true);
              const res = await fetch(`/api/clients/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
              });

              if (res.ok) {
                  const updatedClient = await res.json();
                  setClient(updatedClient);
                  setEditOpen(false);
                  showToast("Client updated successfully", "success");
                  } else {
                    showToast("Failed to update client", "error");
                }
              } catch {
                showToast("Network error", "error");
              }

              setSaving(false);
            }}
            className="px-4 py-2 text-sm bg-[#4458DC] text-white rounded-lg"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </ClientEditModal>

      {/* Edit CLient Logo Modal */}
      <ClientEditModal size="md" open={logoOpen} onClose={() => setLogoModalOpen(false)} title="Edit Logo">
            <div className="flex flex-col gap-4">
              {client.logo && (
                <img
                  src={client.logo}
                  alt="Current Logo"
                  className="w-24 h-24 rounded-full object-contain border bg-white"
                />
              )}
              <input
                type="file"
                required
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="border rounded-lg p-2"
              />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setLogoModalOpen(false)}
                className="px-4 py-2 text-sm border rounded-lg"
              >
                Cancel
              </button>
              <button
                disabled={uploading || !file}
                onClick={handleUpload}
                className="px-4 py-2 text-sm bg-[#4458DC] text-white rounded-lg"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
      </ClientEditModal>


    </section>
  );
}

/* Small sub components */

function Info({ label, value }) {
  return (
    <div>
      <p className="text-gray-500 text-xs">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  );
}

function ActionItem({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 w-full text-left text-sm hover:bg-gray-100"
    >
      {icon}
      {label}
    </button>
  );
}


