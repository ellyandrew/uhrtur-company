import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Lock, Bell } from "lucide-react";

export default function HRPortalComingSoon() {

  const product = {
    id: "hr-portal",
    name: "HR Management Portal",
    description:
      "An intelligent workforce management platform for recruitment, payroll, attendance, and employee performance tracking.",
    category: "Human Resources",
    image: "/products/hr-app.jpg",

    webUI: "/products/hr-overview.jpg",
    mobileUI: "/products/hr-mobile.jpg"
  };

  return (
    <main className="relative overflow-hidden">

      {/* Glow */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#4458DC]/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 -left-20 w-72 h-72 bg-[#4458DC]/20 blur-3xl rounded-full"></div>

      {/* Back */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-6">
        <Link
          href="/explore/clientArea"
          className="inline-flex items-center text-sm text-gray-500 hover:text-[#4458DC]"
        >
          <ArrowLeft size={16} className="mr-1" /> Back to Client Area
        </Link>
      </section>

      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center pb-10">

        {/* Text */}
        <div>
          <span className="inline-block text-xs px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-600 mb-3">
            Coming Soon
          </span>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>

          <p className="text-gray-600 mb-6">
            {product.description}
          </p>

          <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
            <Lock size={16} />
            Early access currently unavailable
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4458DC] text-white hover:bg-[#3647b3] transition"
          >
            <Bell size={18} /> Notify Me
          </Link>
        </div>

        {/* Main Image (Blurred) */}
        <div className="flex justify-center">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={400}
            className="rounded-xl shadow-xl blur-sm opacity-70"
            priority
          />
        </div>
      </section>

      {/* UI Previews */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
          Platform Preview
        </h2>

        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* Web UI */}
          <div className="bg-white border rounded-2xl p-6 shadow-lg">
            <h3 className="font-semibold text-gray-800 mb-4">Web Dashboard</h3>
            <Image
              src={product.webUI}
              alt="Web UI"
              width={500}
              height={350}
              className="rounded-lg blur-sm opacity-60"
            />
          </div>

          {/* Mobile UI */}
          <div className="bg-white border rounded-2xl p-6 shadow-lg">
            <h3 className="font-semibold text-gray-800 mb-4">Mobile App</h3>
            <Image
              src={product.mobileUI}
              alt="Mobile UI"
              width={300}
              height={500}
              className="rounded-lg mx-auto blur-sm opacity-60"
            />
          </div>
        </div>

        {/* Coming Soon Note */}
        <div className="text-center mt-10">
          <p className="text-gray-500 text-sm">
            Full HR Management Portal launching soon.  
            Want early access? Contact us to join the waitlist.
          </p>
        </div>
      </section>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-[#4458DC]/10 blur-3xl"></div>

    </main>
  );
}
