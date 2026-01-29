"use client";

import { useParams } from "next/navigation";
import { ArrowLeft, Edit, Trash2, Printer, FileText } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function ProjectDetails() {
  const { data: session } = useSession();
  const roles = session?.user?.roles || [];
  const isAdmin = roles.includes("Admin");

  const { id } = useParams();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Normally fetch from DB → using mock
  const project = {
    id,
    name: `Project ${id}`,
    client: "Green Valley School",
    status: "Active",
    startDate: "2026-01-01",
    endDate: "2026-03-01",
    description:
      "This project involves developing a school management system with modules for students, teachers, and administration.",
    notes: "Priority client. Monthly progress meetings required.",
  };

  return (
    <section className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Link
          href="/portal/projects"
          className="flex items-center gap-2 text-sm text-gray-600"
        >
          <ArrowLeft size={16} /> Back to Projects
        </Link>

        {isAdmin && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="bg-[#4458DC] text-white px-4 py-2 rounded-lg text-sm"
            >
              Actions
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                <button className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100">
                  <Edit size={16} /> Edit Project
                </button>
                <button className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100">
                  <Trash2 size={16} /> Delete Project
                </button>
                <button className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100">
                  <Printer size={16} /> Print
                </button>
                <button className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100">
                  <FileText size={16} /> Export Details
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="bg-white border rounded-xl shadow-sm p-6 max-w-3xl space-y-6">
        <h1 className="text-2xl font-semibold">{project.name}</h1>

        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <Info label="Client" value={project.client} />
          <Info label="Status" value={project.status} />
          <Info label="Start Date" value={project.startDate} />
          <Info label="End Date" value={project.endDate} />
        </div>

        <div>
          <p className="text-gray-500 text-xs">Description</p>
          <p className="text-gray-800">{project.description}</p>
        </div>

        <div>
          <p className="text-gray-500 text-xs">Notes</p>
          <p className="text-gray-800">{project.notes}</p>
        </div>
      </div>
    </section>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-gray-500 text-xs">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  );
}
