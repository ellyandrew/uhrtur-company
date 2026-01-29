"use client";

import { MapPin, Mail, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export default function Footer() {
  return (
    <footer className="relative bg-white border-t border-[#4458DC]/30 mt-24 overflow-hidden">

      {/* Glow Background */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#4458DC]/10 blur-3xl rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-5 gap-10">

        {/* Brand */}
        <div className="md:col-span-2">
          <h2 className="text-3xl font-bold">
            <span className="text-[#4458DC]">Uhrtur</span> Group
          </h2>
          <p className="text-gray-600 mt-4 max-w-sm leading-relaxed">
            Building modern web and mobile solutions that empower businesses to
            thrive in the digital era.
          </p>

          {/* Socials */}
          <div className="flex gap-4 mt-6">
            
            <a href="#" className="cursor-pointer" target="_blank" aria-label="LinkedIn">
              <Button variant="outline" size="icon">
                <Image src="/social/linkedin.png" alt="LinkedIn" width={18} height={18} />
              </Button>
            </a>

            <a href="#" target="_blank" aria-label="X">
              <Button variant="outline" size="icon">
                <Image src="/social/x.png" alt="X" width={18} height={18} />
              </Button>
            </a>

            <a href="#" target="_blank" aria-label="FaceBook">
              <Button variant="outline" size="icon">
                <Image src="/social/facebook.png" alt="FaceBook" width={18} height={18} />
              </Button>
            </a>

          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li><Link href="/about" className="hover:text-[#4458DC] transition">About</Link></li>
            <li><Link href="/careers" className="hover:text-[#4458DC] transition">Careers</Link></li>
            <li><Link href="/blog" className="hover:text-[#4458DC] transition">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Services</h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>Web Development</li>
            <li>Mobile Applications</li>
            <li>UI / UX Design</li>
            <li>Cloud & APIs</li>
            <li>Custom Software</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Contact</h4>

          <ul className="space-y-4 text-sm text-gray-600">

            <li className="flex items-center gap-3">
              <MapPin size={16} className="text-[#4458DC]" />
              <span>Nairobi, Kenya</span>
            </li>

            <li className="flex items-center gap-3">
              <Mail size={16} className="text-[#4458DC]" />
              <span>info@uhrtur.co.ke</span>
            </li>

            <li className="flex items-center gap-3">
              <Phone size={16} className="text-[#4458DC]" />
              <span>+254 741 746 854</span>
            </li>

          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100 py-5 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Uhrtur Group LTD. All rights reserved.
      </div>
    </footer>
  );
}
