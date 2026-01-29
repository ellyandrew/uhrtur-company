"use client";

import { useState } from "react";
import Image from "next/image";
import { Filter } from "lucide-react";

const partnersData = [
  {
    id: 1,
    name: "Beraca School",
    image: "/clients/beraca.png",
    projects: 1,
    industry: "Education",
  },
  {
    id: 2,
    name: "Victoria School",
    image: "/clients/victoria.jpeg",
    projects: 2,
    industry: "Education",
  },
  {
    id: 3,
    name: "Krypto Logistics",
    image: "/clients/krypto.png",
    projects: 2,
    industry: "Logistics",
  },
  {
    id: 4,
    name: "Verdia Capital",
    image: "/clients/verdia.png",
    projects: 1,
    industry: "Finance",
  },
  {
    id: 5,
    name: "Johncele Insurance",
    image: "/clients/johncell.png",
    projects: 1,
    industry: "Insurance",
  },
  {
    id: 6,
    name: "Ibuka Foundation",
    image: "/clients/ibuka.jpg",
    projects: 3,
    industry: "NGO",
  },
  {
    id: 7,
    name: "Kenya Wildlife Services",
    image: "/clients/kws.png",
    projects: 2,
    industry: "Tourism",
  },
  {
    id: 8,
    name: "Uthabiti Africa",
    image: "/clients/uthabiti.png",
    projects: 3,
    industry: "NGO",
  },
];

const industries = ["All", "Education", "Finance", "Healthcare", "E-Commerce", "Energy", "Logistics"];

export default function PartnersPage() {
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);

  const itemsPerPage = 8;

  const filtered =
    filter === "All"
      ? partnersData
      : partnersData.filter((item) => item.industry === filter);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const paginated = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <main className="relative max-w-7xl mx-auto px-6 pt-24 pb-20 overflow-hidden">

      {/* Glow Background */}
      <div className="absolute top-[-6rem] left-1/2 -translate-x-1/2 
                      w-[700px] h-[700px] bg-[#4458DC] opacity-20 
                      blur-3xl rounded-full -z-10"></div>

      {/* Page Header */}
      <section className="text-center mb-12">
        <h2 className="text-5xl font-bold uppercase mb-4">
          Our <span className="text-[#4458DC]">Partners</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Trusted by organizations across multiple industries to build modern digital solutions.
        </p>
      </section>

      {/* Filter */}
      <div className="flex justify-center mb-10">
        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm">
          <Filter size={18} className="text-[#4458DC]" />
          <select
            className="outline-none text-gray-700"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1);
            }}
          >
            {industries.map((ind) => (
              <option key={ind}>{ind}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Cards Grid */}
      <section className="grid md:grid-cols-4 gap-6 mb-12">

        {paginated.map((client) => (
          <div
            key={client.id}
            className="bg-white border border-gray-100 rounded-2xl shadow-lg 
                       p-6 text-center transition-all duration-300 
                       hover:-translate-y-3 hover:shadow-xl
                       animate-[fadeUp_0.6s_ease-out_forwards] opacity-0"
          >
            <div className="flex justify-center mb-4">
              <Image
                src={client.image}
                alt={client.name}
                width={80}
                height={80}
                className="object-contain"
              />
            </div>

            <h4 className="font-bold text-gray-800">{client.name}</h4>

            <p className="text-sm text-gray-500 mt-2">
              {client.projects} Project Completed
            </p>

            <span className="inline-block mt-3 text-xs font-semibold 
                             text-[#4458DC] bg-[#4458DC]/10 
                             px-3 py-1 rounded-full">
              {client.industry}
            </span>
          </div>
        ))}

      </section>

      {/* Pagination */}
      <div className="flex justify-center gap-3">

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`w-10 h-10 rounded-full font-medium transition
              ${
                page === i + 1
                  ? "bg-[#4458DC] text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
          >
            {i + 1}
          </button>
        ))}

      </div>
    </main>
  );
}
