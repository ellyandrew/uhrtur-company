"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Code, Cpu, Layers } from "lucide-react";

export default function CustomSoftwarePage() {

  const product = {
    id: "custom-software",
    name: "Recent Investment App in Custom Software Solutions",
    description:
      "Tailor-made software built to match your exact business processes. From concept to deployment — we design, build, and scale systems that give your business a competitive edge.",
    category: "Recent Enterprise Solution",
    image: "/products/custom1/custom-app.png",

    webUI: [
      "/products/custom1/custom-web-1.png",
      "/products/custom1/custom-web-2.png",
      "/products/custom1/custom-web-3.png",
      "/products/custom1/custom-web-4.png",
      "/products/custom1/custom-web-5.png",
      "/products/custom1/custom-web-6.png"
    ],

    mobileUI: [
      "/products/custom1/custom-mobile-1.png",
      "/products/custom1/custom-mobile-2.png",
      "/products/custom1/custom-mobile-3.png",
      "/products/custom1/custom-mobile-4.png",
      "/products/custom1/custom-mobile-5.png",
      "/products/custom1/custom-mobile-6.png",
      "/products/custom1/custom-mobile-7.png",
      "/products/custom1/custom-mobile-8.png"
    ],

    features: [
      "Fully tailored system architecture",
      "Scalable cloud-ready infrastructure",
      "API & third-party integrations",
      "Role-based dashboards & analytics",
      "Secure authentication & data protection",
      "Ongoing maintenance & support"
    ]
  }

  const [activeWeb, setActiveWeb] = useState(0);
  const [activeMobile, setActiveMobile] = useState(0);

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
          <span className="inline-block text-xs px-3 py-1 rounded-full bg-[#4458DC]/10 text-[#4458DC] mb-3">
            {product.category}
          </span>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {product.name}
        </h1>

        <p className="text-gray-600 mb-6">
          {product.description}
        </p>

        <Link
          href="/contact"
          className="inline-block px-6 py-3 rounded-xl bg-[#4458DC] text-white hover:bg-[#3647b3] transition"
        >
          Request a Quote
        </Link>
        </div>

        {/* Main Image */}
        <div className="flex justify-center">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={400}
            className="rounded-xl shadow-xl"
            priority
          />
        </div>
      </section>

      {/* Value Icons */}
      <section className="max-w-6xl mx-auto px-6 py-6">
        <div className="grid md:grid-cols-3 gap-6 text-center">

          <div className="bg-white border rounded-2xl p-6 shadow-md">
            <Code className="mx-auto text-[#4458DC]" size={32} />
            <h3 className="font-semibold mt-3">Built For You</h3>
            <p className="text-sm text-gray-600 mt-2">
              Software crafted specifically for your workflows and operations.
            </p>
          </div>

          <div className="bg-white border rounded-2xl p-6 shadow-md">
            <Cpu className="mx-auto text-[#4458DC]" size={32} />
            <h3 className="font-semibold mt-3">Smart Architecture</h3>
            <p className="text-sm text-gray-600 mt-2">
              Designed for performance, security, and long-term scalability.
            </p>
          </div>

          <div className="bg-white border rounded-2xl p-6 shadow-md">
            <Layers className="mx-auto text-[#4458DC]" size={32} />
            <h3 className="font-semibold mt-3">Future Proof</h3>
            <p className="text-sm text-gray-600 mt-2">
              Easily extendable systems that grow with your business.
            </p>
          </div>

        </div>
      </section>

      {/* UI Previews */}
      <section className="max-w-6xl mx-auto px-6 py-14">

        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
          Solution Previews
        </h2>

        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* Web Platform */}
          <div className="bg-white border rounded-2xl p-6 shadow-lg">
            <h3 className="font-semibold text-gray-800 mb-4">
              Web Platform
            </h3>

            {/* Main Image */}
            <Image
              src={product.webUI[activeWeb]}
              alt="Web UI"
              width={500}
              height={350}
              className="rounded-lg mb-4"
            />

            {/* Thumbnails */}
            <div className="flex gap-3 justify-center">
              {product.webUI.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveWeb(i)}
                  className={`border rounded-lg p-1 transition ${
                    activeWeb === i
                      ? "border-[#4458DC]"
                      : "border-gray-200 opacity-70"
                  }`}
                >
                  <Image
                    src={img}
                    alt="thumb"
                    width={80}
                    height={60}
                    className="rounded-md"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Experience */}
          <div className="bg-white border rounded-2xl p-6 shadow-lg">
            <h3 className="font-semibold text-gray-800 mb-4">
              Mobile Experience
            </h3>

            {/* Main Image */}
            <Image
              src={product.mobileUI[activeMobile]}
              alt="Mobile UI"
              width={260}
              height={520}
              className="rounded-lg mx-auto mb-4"
            />

            {/* Thumbnails */}
            <div className="flex gap-3 justify-center">
              {product.mobileUI.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveMobile(i)}
                  className={`border rounded-lg p-1 transition ${
                    activeMobile === i
                      ? "border-[#4458DC]"
                      : "border-gray-200 opacity-70"
                  }`}
                >
                  <Image
                    src={img}
                    alt="thumb"
                    width={60}
                    height={100}
                    className="rounded-md"
                  />
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          What You Get
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {product.features.map((feature, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-white border rounded-xl p-4 shadow-sm"
            >
              <CheckCircle className="text-[#4458DC]" size={20} />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-[#4458DC]/10 blur-3xl"></div>

    </main>
  );
}
