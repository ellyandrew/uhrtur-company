"use client";

import { BarChart3, Users, Briefcase, FileText } from "lucide-react";

export default function ReportsPage() {
  const stats = [
    { title: "Total Clients", value: 48, icon: Users },
    { title: "Active Jobs", value: 12, icon: Briefcase },
    { title: "Blog Posts", value: 36, icon: FileText },
    { title: "Monthly Visits", value: "14.2K", icon: BarChart3 },
  ];

  return (
    <div className="p-6">
      
      {/* Page Header */}
      <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
      <p className="text-gray-500 mb-6">
        Overview of platform activity and performance
      </p>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-white border rounded-xl shadow-sm p-5 flex items-center gap-4"
          >
            <div className="bg-[#4458DC]/10 text-[#4458DC] p-3 rounded-lg">
              <item.icon size={22} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <p className="text-xl font-bold text-gray-800">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder Charts Section */}
      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white border rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-800 mb-4">
            Website Visits
          </h3>
          <div className="h-56 flex items-center justify-center text-gray-400">
            [ Chart Placeholder ]
          </div>
        </div>

        <div className="bg-white border rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-800 mb-4">
            New Contacts
          </h3>
          <div className="h-56 flex items-center justify-center text-gray-400">
            [ Chart Placeholder ]
          </div>
        </div>

      </div>
    </div>
  );
}
