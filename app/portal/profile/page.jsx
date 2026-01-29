"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Mail, Phone, MapPin, Edit } from "lucide-react";

export default function UserProfilePage() {
  const user = {
    name: "John Doe",
    role: "Administrator",
    email: "john.doe@uhrtur.com",
    phone: "+254 700 000 000",
    location: "Nairobi, Kenya",
    avatar: "/avatars/user.png",
  };

  return (
    <main className="relative min-h-screen bg-gray-50 pb-20">
      {/* Glow Background */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#4458DC]/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 -left-20 w-72 h-72 bg-[#4458DC]/20 blur-3xl rounded-full"></div>

      <section className="max-w-6xl mx-auto px-6 pt-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 bg-white rounded-2xl shadow-xl p-6 md:p-10 relative z-10">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-[#4458DC]/20">
              <Image
                src={user.avatar}
                alt={user.name}
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-500 mt-1">{user.role}</p>

            <div className="mt-4 flex gap-4 flex-wrap">
              <Button
                className="flex items-center gap-2"
                variant="primary"
                size="md"
              >
                <Edit size={16} /> Edit Profile
              </Button>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-center gap-3">
                <Mail className="text-[#4458DC]" size={20} /> {user.email}
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-[#4458DC]" size={20} /> {user.phone}
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="text-[#4458DC]" size={20} /> {user.location}
              </li>
            </ul>
          </div>

          {/* Security Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Security</h2>
            <p className="text-gray-700 mb-4">
              You can change your password or manage 2FA settings here.
            </p>
            <Button variant="secondary" size="md">
              Change Password
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
