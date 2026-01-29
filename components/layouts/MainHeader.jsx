"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Briefcase, Compass, GraduationCap, ShoppingCart, Package, CircleUser, Users } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
 
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Partners", path: "/partners" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo Image */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logos/logo.png"
            alt="Uhrtur Logo"
            width={140}
            height={40}
            priority
          />
        </Link>

        {/* Nav Links */}
        <ul className="flex items-center space-x-8 font-semibold text-[15px]">

          {navLinks.slice(0, 3).map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className={`hover:text-[#4458DC] transition ${
                  pathname === link.path ? "text-[#4458DC]" : "text-gray-800"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}

          {/* Explore Mega Dropdown */}
          <li className="relative group">
            <button
              className={`hover:text-[#4458DC] transition font-semibold cursor-pointer ${
                pathname.startsWith("/explore")
                  ? "text-[#4458DC]"
                  : "text-gray-800"
              }`}
            >
              Explore ▾
            </button>

            <div className="
              absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl border border-gray-100 
              overflow-hidden opacity-0 invisible 
              group-hover:opacity-100 group-hover:visible 
              transition-all duration-200
            ">

              <div className="px-4 py-3 border-b bg-gray-50 flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">Explore</h3>
                <span className="text-xs text-[#4458DC]">Discover</span>
              </div>
              <div className="max-h-80 overflow-y-auto">

                {/* Careers */}
                <Link
                  href="/explore/careers"
                  className="flex items-start gap-3 px-4 py-3 border-b hover:bg-gray-50 transition"
                >
                  <Briefcase className="text-[#4458DC] mt-1" size={18} />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Careers
                    </p>
                    <p className="text-xs text-gray-500">
                      Join our growing team
                    </p>
                  </div>
                </Link>

                {/* Client Area */}
                <Link
                  href="/explore/clientArea"
                  className="flex items-start gap-3 px-4 py-3 border-b hover:bg-gray-50 transition"
                >
                  <Compass className="text-[#4458DC] mt-1" size={18} />

                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Client Area
                    </p>
                    <p className="text-xs text-gray-500">
                      Access your applications
                    </p>
                  </div>
                </Link>

                {/* Portal */}
                <Link
                  href="/auth/login"
                  className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition"
                >
                  <CircleUser className="text-[#4458DC] mt-1" size={18} />

                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      User Portal
                    </p>
                    <p className="text-xs text-gray-500">
                      Access My Account
                    </p>
                  </div>
                </Link>

              </div>
            </div>
          </li>

          {/* Products Mega Dropdown */}
          <li className="relative group">
            <button
              className={`hover:text-[#4458DC] transition font-semibold cursor-pointer ${
                pathname.startsWith("/products")
                  ? "text-[#4458DC]"
                  : "text-gray-800"
              }`}
            >
              Products ▾
            </button>

            <div className="
              absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl border border-gray-100 
              overflow-hidden opacity-0 invisible 
              group-hover:opacity-100 group-hover:visible 
              transition-all duration-200
            ">

              {/* Header */}
              <div className="px-4 py-3 border-b bg-gray-50 flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">Our Products</h3>
                <span className="text-xs text-[#4458DC]">Solutions</span>
              </div>

              {/* Content */}
              <div className="max-h-80 overflow-y-auto">

                {/* Education Platform */}
                <Link
                  href="/products/school-system"
                  className="flex items-start gap-3 px-4 py-3 border-b hover:bg-gray-50 transition"
                >
                  <GraduationCap className="text-[#4458DC] mt-1" size={18} />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      DeskPlas
                    </p>
                    <p className="text-xs text-gray-500">
                      Complete School ERP Solution
                    </p>
                  </div>
                </Link>

                {/* E-Commerce Platform */}
                <Link
                  href="/products/ecommerce"
                  className="flex items-start gap-3 border-b px-4 py-3 hover:bg-gray-50 transition"
                >
                  <ShoppingCart className="text-[#4458DC] mt-1" size={18} />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Dukarite
                    </p>
                    <p className="text-xs text-gray-500">
                      Online store & marketplace solution
                    </p>
                  </div>
                </Link>

                {/* HR Platform */}
                <Link
                  href="/products/hr-portal"
                  className="flex items-start gap-3 border-b px-4 py-3 hover:bg-gray-50 transition"
                >
                  <Users className="text-[#4458DC] mt-1" size={18} />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      HR & Payroll System
                    </p>
                    <p className="text-xs text-gray-500">
                      Employee management & payroll automation
                    </p>
                  </div>
                </Link>

                {/* Custom Software */}
                <Link
                  href="/products/custom-software"
                  className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition"
                >
                  <Package className="text-[#4458DC] mt-1" size={18} />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Custom Software
                    </p>
                    <p className="text-xs text-gray-500">
                      Tailored digital solutions
                    </p>
                  </div>
                </Link>

              </div>
            </div>
          </li>

          {navLinks.slice(3).map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className={`hover:text-[#4458DC] transition ${
                  pathname === link.path ? "text-[#4458DC]" : "text-gray-800"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}

        </ul>
      </nav>
    </header>
  );
}
