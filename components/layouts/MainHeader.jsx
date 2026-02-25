"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Briefcase, Compass, CircleUser, Users, GraduationCap, ShoppingCart, Package } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState({ explore: false, products: false });

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Partners", path: "/partners" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleDropdown = (name) => {
    setMobileDropdowns((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logos/logo.png"
            alt="Uhrtur Logo"
            width={140}
            height={40}
            className="md:w-[140px] w-[110px] object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-6 font-semibold text-[15px]">
          <ul className="flex items-center space-x-8">
            {navLinks.map((link) => (
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

            {/* Explore Dropdown */}
            <li className="relative group">
              <button className={`hover:text-[#4458DC] transition font-semibold cursor-pointer`}>
                Explore ▾
              </button>
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl border border-gray-100 
                              opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                              transition-all duration-200">
                <div className="px-4 py-3 border-b bg-gray-50 flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">Explore</h3>
                  <span className="text-xs text-[#4458DC]">Discover</span>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  <Link href="/explore/careers" className="flex items-start gap-3 px-4 py-3 border-b hover:bg-gray-50 transition">
                    <Briefcase className="text-[#4458DC] mt-1" size={18} />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Careers</p>
                      <p className="text-xs text-gray-500">Join our growing team</p>
                    </div>
                  </Link>
                  <Link href="/explore/clientArea" className="flex items-start gap-3 px-4 py-3 border-b hover:bg-gray-50 transition">
                    <Compass className="text-[#4458DC] mt-1" size={18} />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Client Area</p>
                      <p className="text-xs text-gray-500">Access your applications</p>
                    </div>
                  </Link>
                  <Link href="/auth/login" className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition">
                    <CircleUser className="text-[#4458DC] mt-1" size={18} />
                    <div>
                      <p className="text-sm font-medium text-gray-700">User Portal</p>
                      <p className="text-xs text-gray-500">Access My Account</p>
                    </div>
                  </Link>
                </div>
              </div>
            </li>

            {/* Products Dropdown */}
            <li className="relative group">
              <button className={`hover:text-[#4458DC] transition font-semibold cursor-pointer`}>
                Products ▾
              </button>
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl border border-gray-100 
                              opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                              transition-all duration-200">
                <div className="px-4 py-3 border-b bg-gray-50 flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">Our Products</h3>
                  <span className="text-xs text-[#4458DC]">Solutions</span>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  <Link href="/products/school-system" className="flex items-start gap-3 px-4 py-3 border-b hover:bg-gray-50 transition">
                    <GraduationCap className="text-[#4458DC] mt-1" size={18} />
                    <div>
                      <p className="text-sm font-medium text-gray-700">DeskPlas</p>
                      <p className="text-xs text-gray-500">Complete School ERP Solution</p>
                    </div>
                  </Link>
                  <Link href="/products/ecommerce" className="flex items-start gap-3 border-b px-4 py-3 hover:bg-gray-50 transition">
                    <ShoppingCart className="text-[#4458DC] mt-1" size={18} />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Dukarite</p>
                      <p className="text-xs text-gray-500">Online store & marketplace solution</p>
                    </div>
                  </Link>
                  <Link href="/products/hr-portal" className="flex items-start gap-3 border-b px-4 py-3 hover:bg-gray-50 transition">
                    <Users className="text-[#4458DC] mt-1" size={18} />
                    <div>
                      <p className="text-sm font-medium text-gray-700">HR & Payroll System</p>
                      <p className="text-xs text-gray-500">Employee management & payroll automation</p>
                    </div>
                  </Link>
                  <Link href="/products/custom-software" className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition">
                    <Package className="text-[#4458DC] mt-1" size={18} />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Custom Software</p>
                      <p className="text-xs text-gray-500">Tailored digital solutions</p>
                    </div>
                  </Link>
                </div>
              </div>
            </li>
          </ul>

          {/* Get a Quote Button */}
          <Link href="/contact">
            <button className="ml-4 px-5 py-2 bg-[#4458DC] text-white rounded-lg hover:bg-[#3346b0] transition">
              Get a Quote
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Links */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <ul className="flex flex-col space-y-4 px-6 py-6 font-semibold">

            {/* Regular Links */}
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`block hover:text-[#4458DC] transition ${
                    pathname === link.path ? "text-[#4458DC]" : "text-gray-800"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            {/* Explore Mobile Dropdown */}
            <li>
              <button
                className="flex justify-between items-center w-full hover:text-[#4458DC] transition"
                onClick={() => toggleDropdown("explore")}
              >
                Explore ▾
              </button>
              {mobileDropdowns.explore && (
                <ul className="flex flex-col mt-2 pl-4 space-y-2 text-sm">
                  <Link href="/explore/careers" onClick={() => setMobileOpen(false)} className="hover:text-[#4458DC] block">Careers</Link>
                  <Link href="/explore/clientArea" onClick={() => setMobileOpen(false)} className="hover:text-[#4458DC] block">Client Area</Link>
                  <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="hover:text-[#4458DC] block">User Portal</Link>
                </ul>
              )}
            </li>

            {/* Products Mobile Dropdown */}
            <li>
              <button
                className="flex justify-between items-center w-full hover:text-[#4458DC] transition"
                onClick={() => toggleDropdown("products")}
              >
                Products ▾
              </button>
              {mobileDropdowns.products && (
                <ul className="flex flex-col mt-2 pl-4 space-y-2 text-sm">
                  <Link href="/products/school-system" onClick={() => setMobileOpen(false)} className="hover:text-[#4458DC] block">DeskPlas</Link>
                  <Link href="/products/ecommerce" onClick={() => setMobileOpen(false)} className="hover:text-[#4458DC] block">Dukarite</Link>
                  <Link href="/products/hr-portal" onClick={() => setMobileOpen(false)} className="hover:text-[#4458DC] block">HR & Payroll</Link>
                  <Link href="/products/custom-software" onClick={() => setMobileOpen(false)} className="hover:text-[#4458DC] block">Custom Software</Link>
                </ul>
              )}
            </li>

            {/* Get a Quote Button */}
            <li>
              <Link href="/contact">
                <button className="w-full px-5 py-2 bg-[#4458DC] text-white rounded-lg hover:bg-[#3346b0] transition" onClick={() => setMobileOpen(false)}>
                  Get a Quote
                </button>
              </Link>
            </li>

          </ul>
        </div>
      )}
    </header>
  );
}