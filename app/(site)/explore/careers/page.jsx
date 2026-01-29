"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Briefcase } from "lucide-react";

// const jobs = [
//   {
//     id: 1,
//     title: "Frontend Developer",
//     location: "Remote",
//     type: "Full-time",
//     category: "Engineering",
//     description:
//       "Join our team to build responsive and interactive web applications.",
//   },
//   {
//     id: 2,
//     title: "UX/UI Designer",
//     location: "New York",
//     type: "Full-time",
//     category: "Design",
//     description:
//       "Create beautiful and intuitive user experiences for our products.",
//   },
//   {
//     id: 3,
//     title: "Backend Engineer",
//     location: "San Francisco",
//     type: "Full-time",
//     category: "Engineering",
//     description:
//       "Develop scalable backend systems and APIs for our platform.",
//   },
// ];

const jobs = [];


export default function CareersPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", ...new Set(jobs.map((job) => job.category))];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || job.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="relative overflow-hidden">

      {/* Glow */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#4458DC]/30 blur-3xl rounded-full"></div>

      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Careers at Uhrtur</h1>
        <p className="text-gray-600 mt-3">
          Join our mission to build the future of digital solutions.
        </p>
      </section>

      {/* Filters */}
      <section className="max-w-6xl mx-auto px-6 pb-10 flex flex-col md:flex-row gap-4">

        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            className="w-full border rounded-xl pl-10 pr-4 py-2 focus:ring-2 focus:ring-[#4458DC] outline-none"
            placeholder="Search job title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <select
          className="border rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#4458DC] outline-none"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </section>

      {/* Jobs List */}
      <section className="max-w-6xl mx-auto px-6 pb-20">

        {filteredJobs.length === 0 ? (
          <div className="text-center py-20">
            <Briefcase className="mx-auto text-[#4458DC]" size={50} />
            <h3 className="text-xl font-semibold mt-4 text-gray-800">
              No job openings available
            </h3>
            <p className="text-gray-500 mt-2">
              Please check back later — new opportunities are coming soon.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-lg transition group"
              >
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-[#4458DC]">
                  {job.title}
                </h3>

                <div className="text-sm text-gray-500 mt-2">
                  {job.location} • {job.type} • {job.category}
                </div>

                <p className="text-gray-600 mt-4">
                  {job.description}
                </p>

                <Link
                href="/explore/careers/id"
                className="inline-block mt-5 px-5 py-2 rounded-xl bg-[#4458DC] text-white hover:bg-[#3647b3] transition cursor-pointer"
                >
                View Details
                </Link>

              </div>
            ))}
          </div>
        )}
      </section>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-[#4458DC]/10 blur-3xl"></div>
    </main>
  );
}