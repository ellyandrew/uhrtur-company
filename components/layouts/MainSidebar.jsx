"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Receipt,
  FolderKanban,
  Briefcase,
  FileText,
  BarChart3,
  Settings,
} from "lucide-react";
import { useSession } from "next-auth/react";

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const roles = session?.user?.roles || [];

  const isAdminOrUser = roles.includes("Admin") || roles.includes("User");
  const isApplicant = roles.includes("Applicant");

  return (
    <aside className="w-64 bg-white border-r min-h-screen hidden md:block">
      <div className="p-6">
        <h2 className="text-2xl font-bold">
          <span className="text-[#4458DC]">Uhrtur</span>
        </h2>
      </div>

      <nav className="px-4 space-y-2 text-sm">

        {/* Admin + User Sidebar */}
        {isAdminOrUser && (
          <>
            <NavItem href="/portal/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" pathname={pathname} />
            <NavItem href="/portal/clients" icon={<Users size={18} />} label="Clients" pathname={pathname} />
            <NavItem href="/portal/invoices" icon={<Receipt size={18} />} label="Invoices" pathname={pathname} />
            <NavItem href="/portal/projects" icon={<FolderKanban size={18} />} label="Projects" pathname={pathname} />
            <NavItem href="/portal/jobs" icon={<Briefcase size={18} />} label="Jobs" pathname={pathname} />
            <NavItem href="/portal/blogs" icon={<FileText size={18} />} label="Blog Posts" pathname={pathname} />
            <NavItem href="/portal/reports" icon={<BarChart3 size={18} />} label="Reports" pathname={pathname} />
            <NavItem href="/portal/settings" icon={<Settings size={18} />} label="Settings" pathname={pathname} />
          </>
        )}

        {/* Applicant Sidebar */}
        {isApplicant && (
          <>
            <NavItem href="/applicant/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" pathname={pathname} />
            <NavItem href="/applicant/profile" icon={<Users size={18} />} label="My Profile" pathname={pathname} />
            <NavItem href="/applicant/jobs" icon={<Briefcase size={18} />} label="Available Jobs" pathname={pathname} />
            <NavItem href="/applicant/applications" icon={<FolderKanban size={18} />} label="My Applications" pathname={pathname} />
            <NavItem href="/applicant/settings" icon={<Settings size={18} />} label="Settings" pathname={pathname} />
          </>
        )}

      </nav>
    </aside>
  );
}

function NavItem({ href, icon, label, pathname }) {
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition ${
        active
          ? "bg-[#4458DC]/10 text-[#4458DC] font-medium"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}
