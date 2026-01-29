"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Bell, UserCircle, LogOut, Settings, User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useToast } from "@/components/ui/ToastContext";
import { usePathname } from "next/navigation";

export default function AdminNavbar() {
  const pathname = usePathname();
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const profileRef = useRef();
  const notifRef = useRef();

  const { data: session } = useSession();
  const { showToast } = useToast();

  const user = session?.user;

  // Map routes to page titles
  const pageTitles = {
    "/portal/dashboard": "Dashboard",
    "/portal/clients": "Clients",
    "/portal/invoices": "Invoices",
    "/portal/clients/[id]": "Client Details",
    "/portal/projects": "Projects",
    "/portal/jobs": "Jobs",
    "/portal/blogs": "Blog Posts",
    "/portal/reports": "Reports",
    "/portal/settings": "Settings",
    "/portal/profile": "Profile",

    "/applicant/dashboard": "Applicant Dashboard",
    "/applicant/profile": "My Profile",
    "/applicant/jobs": "Available Jobs",
    "/applicant/applications": "My Applications",
    "/applicant/settings": "My Settings",
  };

  const pageTitle = pageTitles[pathname] || '';

  // Close dropdowns if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    showToast("Logging out...", "success");
    signOut({ callbackUrl: "/auth/login?reason=logout" });
  }

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h1 className="font-semibold text-gray-800">{pageTitle}</h1>

      <div className="flex items-center gap-5">

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative"
          >
            <Bell size={20} className="text-gray-600 cursor-pointer" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                <div className="px-4 py-3 border-b bg-gray-50 flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">Notifications</h3>
                <button className="text-xs text-blue-600 hover:underline">
                  Mark all as read
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                <div className="px-4 py-3 border-b hover:bg-gray-50 cursor-pointer transition">
                  <p className="text-sm font-medium text-gray-700">New school registered</p>
                  <p className="text-xs text-gray-500">Westwood Academy • 5 mins ago</p>
                </div>
                <div className="px-4 py-3 border-b hover:bg-gray-50 cursor-pointer transition">
                  <p className="text-sm font-medium text-gray-700">Payment received</p>
                  <p className="text-xs text-gray-500">KSh 13,500 • 20 mins ago</p>
                </div>
                <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition">
                  <p className="text-sm font-medium text-gray-700">3 pending approvals</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <UserCircle
            size={25}
            className="text-gray-600 cursor-pointer"
            onClick={() => setShowProfile(!showProfile)}
          />

          {showProfile && (
            <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-50">

              {/* Logged in username */}
              <div className="px-4 py-3 border-b text-sm text-gray-700">
                Signed in as
                <p className="font-semibold text-gray-900 truncate">
                  {user?.username || user?.email}
                </p>
              </div>

              <Link
                href="/portal/profile"
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition text-sm text-gray-700"
              >
                <User size={16} /> Profile
              </Link>

              <Link
                href="/portal/settings"
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition text-sm text-gray-700"
              >
                <Settings size={16} /> Settings
              </Link>

              <div className="border-t">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-sm text-red-600 transition cursor-pointer"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </header>
  );
}

