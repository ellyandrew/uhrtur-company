"use client";

// import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Clock, Briefcase, ArrowLeft } from "lucide-react";

export default function JobDetailPage() {

//   const job = jobs.find((j) => j.id.toString() === params.id);

//   if (!job) return notFound();

  return (
    <main className="relative overflow-hidden">

      {/* Glow */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#4458DC]/30 blur-3xl rounded-full"></div>

      {/* Back */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-6">
        <Link
          href="/explore/careers"
          className="inline-flex items-center text-sm text-gray-500 hover:text-[#4458DC]"
        >
          <ArrowLeft size={16} className="mr-1" /> Back to Careers
        </Link>
      </section>

      {/* Job Card */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="bg-white border rounded-2xl shadow-xl p-8">

          <h1 className="text-3xl font-bold text-gray-900">
            Backend Developer
          </h1>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-3">
            <span className="flex items-center gap-1">
              <MapPin size={14} /> Remote
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} /> Full Time
            </span>
            <span className="flex items-center gap-1">
              <Briefcase size={14} /> Engineering
            </span>
          </div>

          <p className="text-gray-700 mt-6">
            Build scalable APIs and cloud services.
          </p>

          {/* Example Extra Content */}
          <div className="mt-8 space-y-4 text-gray-600">
            <h3 className="font-semibold text-gray-800">Responsibilities</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Develop and maintain modern web applications</li>
              <li>Collaborate with designers and product teams</li>
              <li>Write clean, scalable code</li>
              <li>Optimize application performance</li>
            </ul>

            <h3 className="font-semibold text-gray-800 mt-6">Requirements</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Experience with React or Next.js</li>
              <li>Understanding of REST APIs</li>
              <li>Version control with Git</li>
              <li>Strong problem-solving skills</li>
            </ul>
          </div>

          {/* Apply Button */}
          <Link
            href="/auth/login"
            className="inline-block mt-8 px-6 py-3 rounded-xl bg-[#4458DC] text-white hover:bg-[#3647b3] transition"
          >
            Apply Now
          </Link>

        </div>
      </section>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-[#4458DC]/10 blur-3xl"></div>

    </main>
  );
}
