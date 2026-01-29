"use client";

import Image from "next/image";
import Link from "next/link";
import { LayoutGrid } from "lucide-react";

const products = [
  {
    id: "school-system",
    name: "Deskplas School Management",
    description: "Complete platform for managing schools, students, fees, and reporting.",
    image: "/products/deskplas.png",
    category: "Education"
  },
  {
    id: "ecommerce",
    name: "Dukarite E-Commerce Platform",
    description: "Scalable online store with payments, inventory, and analytics.",
    image: "/products/dukarite.svg",
    category: "Commerce"
  },
  {
    id: "hr-portal",
    name: "HR & Payroll System",
    description: "Employee management, payroll automation, and reporting.",
    image: "/products/hr.png",
    category: "Enterprise"
  },
  {
    id: "custom-software",
    name: "Custom Software Solutions",
    description: "Tailored software development for your specific business needs.",
    image: "/products/custom.png",
    category: "Technology"
  }
];

export default function PortalPage() {
  return (
    <main className="relative overflow-hidden">

      {/* Glow */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#4458DC]/30 blur-3xl rounded-full"></div>

      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-10 text-center">
        <LayoutGrid className="mx-auto text-[#4458DC]" size={40} />
        <h1 className="text-4xl font-bold text-gray-900 mt-4">
          Client Portal
        </h1>
        <p className="text-gray-600 mt-3">
          Access your Uhrtur products and project dashboards
        </p>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-4 gap-6">

          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={50}
                height={50}
                className="object-contain h-40 w-full p-6 pt-6"
              />

              <div className="p-5">
                <h3 className="font-semibold text-gray-800 group-hover:text-[#4458DC] transition">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  {product.description}
                </p>

                <span className="inline-block mt-4 text-xs px-3 py-1 rounded-full bg-[#4458DC]/10 text-[#4458DC]">
                  {product.category}
                </span>
              </div>
            </Link>
          ))}

        </div>
      </section>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-[#4458DC]/10 blur-3xl"></div>

    </main>
  );
}
