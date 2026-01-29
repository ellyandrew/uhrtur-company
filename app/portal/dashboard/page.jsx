"use client";

import AppCard from "@/components/ui/MainCard";
import { Users, FolderKanban, Briefcase, FileText } from "lucide-react";
import { useToast } from "@/components/ui/ToastContext";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { formatNumber } from "@/lib/scripts/formatNumber";

export default function Dashboard() {

 const { showToast } = useToast();
const router = useRouter();
const [stats, setStats] = useState(null);

const { data: session, status } = useSession({
  required: true,
  onUnauthenticated() {
    showToast("Please login to continue", "error");
  },
});

// Redirect if unauthenticated
useEffect(() => {
  if (status === "unauthenticated") {
    router.push("/auth/login");
  }
}, [status, router]);

// Fetch stats
useEffect(() => {
  if (status === "authenticated") {
    fetch("/api/stats/adminDashboard")
      .then(res => res.json())
      .then(data => setStats(data));
  }
}, [status]);


if (status === "loading") {
  return <LoadingScreen text="Checking session..." />;
}

const user = session?.user;

  return (
    <section className="p-6">

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <AppCard
          icon={<Users />}
          title="Total Clients"
          value={formatNumber(stats?.totalClients || 0)}
          variant="blue"
        />
        <AppCard
          icon={<FolderKanban />}
          title="Active Projects"
          value={formatNumber(stats?.activeProjects || 0)}
          variant="green"
        />
        <AppCard
          icon={<Briefcase />}
          title="Open Jobs"
          value={formatNumber(stats?.openJobs || 0)}
          variant="orange"
        />
        <AppCard
          icon={<FileText />}
          title="Blog Posts"
          value={formatNumber(stats?.totalBlogs || 0)}
          variant="purple"
        />
      </div>

      {/* Table */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="font-semibold text-gray-900">
            Recent Projects
          </h3>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-6 py-3">Client</th>
              <th className="text-left px-6 py-3">Project</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-left px-6 py-3">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            <Row client="Green Valley School" project="School System" status="Active" />
            <Row client="Urban Mart" project="E-Commerce Platform" status="Completed" />
            <Row client="Nova Logistics" project="ERP System" status="Pending" />
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Row({ client, project, status }) {
  const statusStyle = {
    Active: "bg-green-100 text-green-700",
    Completed: "bg-blue-100 text-blue-700",
    Pending: "bg-yellow-100 text-yellow-700",
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-3">{client}</td>
      <td className="px-6 py-3">{project}</td>
      <td className="px-6 py-3">
        <span className={`px-2 py-1 rounded-full text-xs ${statusStyle[status]}`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-3">Jan 2026</td>
    </tr>
  );
}
