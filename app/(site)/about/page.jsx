"use client";

import { Lightbulb, ShieldCheck, Users, Quote } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="relative max-w-7xl mx-auto px-6 pt-24 pb-20 overflow-hidden">

      {/* Glow Background */}
      <div className="absolute top-[-6rem] left-1/2 -translate-x-1/2 
                      w-[700px] h-[700px] bg-[#4458DC] opacity-20 
                      blur-3xl rounded-full -z-10"></div>

      {/* ===== ABOUT INTRO ===== */}
      <section className="text-center mb-16">
        <h2 className="text-5xl font-bold uppercase mb-6">
          About <br />
          <span className="text-[#4458DC]">Who We Are</span>
        </h2>

        <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
          At Uhrtur, we are your strategic partner in the digital age —
          empowering businesses with innovative technology solutions that
          turn challenges into opportunities.
        </p>
      </section>

      {/* ===== MISSION & VISION ===== */}
      <section className="grid md:grid-cols-2 gap-10 mb-20">

        {/* Mission */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-8 relative">
          <Quote className="absolute -top-4 -left-4 text-[#4458DC]" size={40} />
          <h3 className="font-bold text-xl mb-3 text-gray-800">Our Mission</h3>
          <p className="text-gray-600 leading-relaxed">
            “To bridge the gap between technology and business goals.”
          </p>
        </div>

        {/* Vision */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-8 relative">
          <Quote className="absolute -top-4 -left-4 text-[#4458DC]" size={40} />
          <h3 className="font-bold text-xl mb-3 text-gray-800">Our Vision</h3>
          <p className="text-gray-600 leading-relaxed">
            “To become the trusted partner that helps you navigate and succeed
            in the ever-evolving digital frontier.”
          </p>
        </div>

      </section>

      {/* ===== CORE VALUES ===== */}
      <section className="text-center mb-12">
        <h3 className="text-3xl font-bold mb-4">Our Core Values</h3>
        <p className="text-gray-600">
          The principles that guide everything we build.
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-8">

        {/* Card 1 */}
        <div className="group bg-white rounded-2xl border border-gray-100 shadow-xl 
                        p-8 text-center transition-all duration-300 
                        hover:-translate-y-4 hover:shadow-2xl
                        animate-[fadeUp_0.6s_ease-out_forwards] opacity-0">

          <Lightbulb className="mx-auto text-[#4458DC]" size={40} />

          <h4 className="mt-4 font-bold text-gray-800 text-lg">
            Innovation First
          </h4>

          <p className="text-gray-600 mt-3">
            We push boundaries, embrace new technologies, and craft solutions
            that define the future.
          </p>
        </div>

        {/* Card 2 */}
        <div className="group bg-white rounded-2xl border border-gray-100 shadow-xl 
                        p-8 text-center transition-all duration-300 
                        hover:-translate-y-4 hover:shadow-2xl
                        animate-[fadeUp_0.8s_ease-out_forwards] opacity-0">

          <ShieldCheck className="mx-auto text-[#4458DC]" size={40} />

          <h4 className="mt-4 font-bold text-gray-800 text-lg">
            Reliability Always
          </h4>

          <p className="text-gray-600 mt-3">
            We deliver dependable systems, consistent performance,
            and unwavering support you can trust.
          </p>
        </div>

        {/* Card 3 */}
        <div className="group bg-white rounded-2xl border border-gray-100 shadow-xl 
                        p-8 text-center transition-all duration-300 
                        hover:-translate-y-4 hover:shadow-2xl
                        animate-[fadeUp_1s_ease-out_forwards] opacity-0">

          <Users className="mx-auto text-[#4458DC]" size={40} />

          <h4 className="mt-4 font-bold text-gray-800 text-lg">
            User-Centric Focus
          </h4>

          <p className="text-gray-600 mt-3">
            Every product is built around real people,
            real experiences, and real business impact.
          </p>
        </div>

      </section>
    </main>
  );
}
