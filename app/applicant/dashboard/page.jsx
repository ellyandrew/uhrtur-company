"use client";

import AppCard from "@/components/ui/MainCard";
import { FilePlus2, ClipboardList, UserCheck, Clock } from "lucide-react";
import { useToast } from "@/components/ui/ToastContext";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ApplicantDashboard() {
  const { showToast } = useToast();
  const router = useRouter();

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      showToast("Please login to continue", "error");
    },
  });

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
  }, [status]);

  if (status === "loading")
    return <LoadingScreen text="Checking session..." />;

  const user = session.user;
  const roles = user.roles || [];

  // Extra safety: block non-applicants
  if (!roles.includes("Applicant")) {
    showToast("Unauthorized access", "error");
    router.push("/auth/access");
    return null;
  }

  return (
    <section className="p-6">

      {/* Welcome */}
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Welcome, {user.full_name || user.username}
      </h2>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <AppCard
          icon={<FilePlus2 />}
          title="New Application"
          value="Start"
          variant="blue"
        />
        <AppCard
          icon={<ClipboardList />}
          title="My Applications"
          value="3"
          variant="green"
        />
        <AppCard
          icon={<Clock />}
          title="Pending Reviews"
          value="1"
          variant="orange"
        />
        <AppCard
          icon={<UserCheck />}
          title="Profile Status"
          value="Complete"
          variant="purple"
        />
      </div>

      {/* Applications Table */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="font-semibold text-gray-900">
            Recent Applications
          </h3>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-6 py-3">Application</th>
              <th className="text-left px-6 py-3">Category</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-left px-6 py-3">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            <Row name="Web Developer" category="IT" status="Pending" />
            <Row name="Graphic Designer" category="Design" status="Reviewed" />
            <Row name="Account Assistant" category="Finance" status="Approved" />
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* Table Row */
function Row({ name, category, status }) {
  const statusStyle = {
    Pending: "bg-yellow-100 text-yellow-700",
    Reviewed: "bg-blue-100 text-blue-700",
    Approved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-3">{name}</td>
      <td className="px-6 py-3">{category}</td>
      <td className="px-6 py-3">
        <span className={`px-2 py-1 rounded-full text-xs ${statusStyle[status]}`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-3">Jan 2026</td>
    </tr>
  );
}
