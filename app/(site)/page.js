"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Globe, Palette, Cloud, Wrench, Monitor, Smartphone, Layers, Sparkles } from "lucide-react";
import ScrollToTop from "@/components/ui/ScrollButton";

export default function Home() {

  return (
    <>
    <main className="max-w-7xl mx-auto px-6 overflow-hidden  relative min-h-screen">

      {/* Hero Section */}
      <section id="hero-section" className="relative grid md:grid-cols-2 gap-10 items-center pt-24 pb-30">

        {/* Glow Background */}
        <div className="absolute inset-0 -z-10 flex justify-center">
          <div className="w-[600px] h-[600px] bg-[#4458DC] opacity-20 blur-3xl rounded-full"></div>
        </div>

        {/* Left Text */}
        <div>
          <h2 className="uppercase text-lg font-bold text-gray-700">
            Build
          </h2>

          <div className="h-1 w-full bg-[#4458DC] my-3"></div>

          <h1 className="uppercase text-5xl font-bold mb-3">
            With <span className="text-[#4458DC]">Uhrtur</span>
          </h1>

          <h5 className="uppercase font-semibold text-gray-600 mb-8">
            - Modern Web & Mobile Apps
          </h5>

          <div className="flex gap-4">
            <Link href="/contact">
              <Button className="cursor-pointer" variant="primary" size="lg">
                Hire Us
              </Button>
            </Link>

            <Link href="/contact">
              <Button className="cursor-pointer" variant="secondary" size="lg">
                Get a Quote
              </Button>
            </Link>
            
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <Image
            src="/illustrations/home-right.png"
            alt="Illustration"
            width={500}
            height={500}
            priority
          />
        </div>

      </section>

      {/* Services Section */}
      <section className=" bottom-0 left-0 w-full">
        <div className="absolute bottom-[-6rem] left-1/2 -translate-x-1/2 w-[120%] h-[300px] bg-[#4458DC] opacity-20 blur-3xl rounded-full"></div>
          <div className="relative max-w-7xl mx-auto px-6 pb-6">
            <div className="grid md:grid-cols-4 gap-6">

            {/* Card 1 */}
            <div className=" group bg-white rounded-t-3xl shadow-xl border border-gray-100 p-6 text-center transition-all duration-300  hover:-translate-y-6 hover:scale-105 animate-[fadeUp_0.6s_ease-out_forwards] opacity-0">

              <Globe className="mx-auto text-[#4458DC]" size={32} />

              <h4 className="mt-4 font-bold text-gray-800">
                Web & Mobile
              </h4>

              <p className="text-sm text-gray-500 mt-2">
                Custom websites & apps built to scale.
              </p>

              {/* Hidden expanded content */}
              <p className="text-sm text-gray-600 mt-4 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 transition-all duration-300">
                Custom websites, web apps, and native or cross-platform mobile apps designed to scale with your business.
              </p>
            </div>

            {/* Card 2 */}
            <div className="
    group bg-white rounded-t-3xl shadow-xl border border-gray-100 
    p-6 text-center transition-all duration-300 
    hover:-translate-y-6 hover:scale-105 animate-[fadeUp_0.6s_ease-out_forwards]
  opacity-0
  ">

              <Palette className="mx-auto text-[#4458DC]" size={32} />

              <h4 className="mt-4 font-bold text-gray-800">
                UI / UX Design
              </h4>

              <p className="text-sm text-gray-500 mt-2">
                Modern, human-centered design.
              </p>

              <p className="text-sm text-gray-600 mt-4 opacity-0 max-h-0 
                            group-hover:opacity-100 group-hover:max-h-40 
                            transition-all duration-300">
                Modern, intuitive, and human-centered interfaces that enhance user engagement and satisfaction.
              </p>
            </div>

            {/* Card 3 */}
            <div className="
    group bg-white rounded-t-3xl shadow-xl border border-gray-100 
    p-6 text-center transition-all duration-300 
    hover:-translate-y-6 hover:scale-105 animate-[fadeUp_0.6s_ease-out_forwards]
  opacity-0
  ">

              <Cloud className="mx-auto text-[#4458DC]" size={32} />

              <h4 className="mt-4 font-bold text-gray-800">
                Cloud & APIs
              </h4>

              <p className="text-sm text-gray-500 mt-2">
                Seamless integration & deployment.
              </p>

              <p className="text-sm text-gray-600 mt-4 opacity-0 max-h-0 
                            group-hover:opacity-100 group-hover:max-h-40 
                            transition-all duration-300">
                Seamless API integration, cloud deployment, and scalable architectures for high performance.
              </p>
            </div>

            {/* Card 4 */}
            <div className="
    group bg-white rounded-t-3xl shadow-xl border border-gray-100 
    p-6 text-center transition-all duration-300 
    hover:-translate-y-6 hover:scale-105 animate-[fadeUp_0.6s_ease-out_forwards]
  opacity-0
  ">

              <Wrench className="mx-auto text-[#4458DC]" size={32} />

              <h4 className="mt-4 font-bold text-gray-800">
                Software Support
              </h4>

              <p className="text-sm text-gray-500 mt-2">
                Maintenance & system upgrades.
              </p>

              <p className="text-sm text-gray-600 mt-4 opacity-0 max-h-0 
                            group-hover:opacity-100 group-hover:max-h-40 
                            transition-all duration-300">
                Upgrade legacy systems, continuous maintenance, and technical support to keep your apps running smoothly.
              </p>
            </div>

            </div>
          </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-24 bg-white">
          <div className="absolute inset-0 -z-10 flex justify-center">
            <div className="w-[500px] h-[500px] bg-[#4458DC] opacity-10 blur-3xl rounded-full"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6">
            {/* Section Header */}
            <div className="max-w-2xl mb-16">
              <h2 className="uppercase text-lg font-bold text-gray-700">
                Why Choose Us
              </h2>
              <div className="h-1 w-20 bg-[#4458DC] my-3"></div>

              <h3 className="text-4xl font-bold text-gray-900">
                Built for Growth. Designed for Impact.
              </h3>

              <p className="mt-4 text-gray-600">
                We combine strategy, design, and engineering to deliver scalable
                digital products that solve real business problems.
              </p>
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-4 gap-8">
              
              {/* Card 1 */}
              <div className="group p-6 border-2 border-[#4458DC] rounded-2xl shadow-sm transition-all duration-300 hover:shadow-[#4458DC]/50 hover:shadow-lg">
                <h4 className="font-bold text-gray-900 mb-2">
                  Business-Driven Approach
                </h4>
                <p className="text-sm text-gray-600">
                  We don’t just write code — we align technology with your business
                  goals for measurable results.
                </p>
              </div>

              {/* Card 2 */}
              <div className="group p-6 border-2 border-[#4458DC] rounded-2xl shadow-sm transition-all duration-300 hover:shadow-[#4458DC]/50 hover:shadow-lg">
                <h4 className="font-bold text-gray-900 mb-2">
                  Scalable & Secure Systems
                </h4>
                <p className="text-sm text-gray-600">
                  Our solutions are built to scale effortlessly while maintaining
                  performance, reliability, and security.
                </p>
              </div>

              {/* Card 3 */}
              <div className="group p-6 border-2 border-[#4458DC] rounded-2xl shadow-sm transition-all duration-300 hover:shadow-[#4458DC]/50 hover:shadow-lg">
                <h4 className="font-bold text-gray-900 mb-2">
                  Modern Design Standards
                </h4>
                <p className="text-sm text-gray-600">
                  Clean, intuitive interfaces crafted to enhance user experience and
                  elevate your brand.
                </p>
              </div>

              {/* Card 4 */}
              <div className="group p-6 border-2 border-[#4458DC] rounded-2xl shadow-sm transition-all duration-300 hover:shadow-[#4458DC]/50 hover:shadow-lg">
                <h4 className="font-bold text-gray-900 mb-2">
                  Long-Term Partnership
                </h4>
                <p className="text-sm text-gray-600">
                  From launch to scale, we provide ongoing support, optimization, and
                  system evolution.
                </p>
              </div>

            </div>
          </div>
      </section>

      {/* Our Process Section */}
      <section className="relative py-28 bg-gray-50">
          <div className="absolute inset-0 -z-10 flex justify-end">
            <div className="w-[500px] h-[500px] bg-[#4458DC] opacity-10 blur-3xl rounded-full"></div>
          </div>
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mb-20">
              <h2 className="uppercase text-lg font-bold text-gray-700">
                Our Process
              </h2>
              <div className="h-1 w-20 bg-[#4458DC] my-3"></div>

              <h3 className="text-4xl font-bold text-gray-900">
                From Idea to Scalable Product
              </h3>

              <p className="mt-4 text-gray-600">
                A structured, transparent, and collaborative approach that ensures
                quality, efficiency, and long-term success.
              </p>
            </div>

            {/* Process Steps */}
            <div className="grid md:grid-cols-5 gap-8">

              {/* Step 1 */}
              <div className="relative group p-6 rounded-2xl border-2 border-[#4458DC]
                              bg-[#4458DC] text-white shadow-sm transition-all duration-300
                              hover:bg-white hover:text-gray-900 hover:shadow-lg hover:-translate-y-2 hover:scale-105">
                <span className="text-sm font-bold">01</span>
                <h4 className="mt-3 font-bold">Discovery & Strategy</h4>
                <p className="mt-2 text-sm">
                  We understand your goals, users, and challenges to define a clear
                  technical and product roadmap.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative group p-6 rounded-2xl border-2 border-[#4458DC]
                              bg-[#4458DC] text-white shadow-sm transition-all duration-300
                              hover:bg-white hover:text-gray-900 hover:shadow-lg hover:-translate-y-2 hover:scale-105">
                <span className="text-sm font-bold">02</span>
                <h4 className="mt-3 font-bold">Design & Prototyping</h4>
                <p className="mt-2 text-sm">
                  We design intuitive user experiences and validate ideas through
                  interactive prototypes.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative group p-6 rounded-2xl border-2 border-[#4458DC]
                              bg-[#4458DC] text-white shadow-sm transition-all duration-300
                              hover:bg-white hover:text-gray-900 hover:shadow-lg hover:-translate-y-2 hover:scale-105">
                <span className="text-sm font-bold">03</span>
                <h4 className="mt-3 font-bold">Development</h4>
                <p className="mt-2 text-sm">
                  Our engineers build scalable, secure, and high-performance systems
                  using modern technologies.
                </p>
              </div>

              {/* Step 4 */}
              <div className="relative group p-6 rounded-2xl border-2 border-[#4458DC]
                              bg-[#4458DC] text-white shadow-sm transition-all duration-300
                              hover:bg-white hover:text-gray-900 hover:shadow-lg hover:-translate-y-2 hover:scale-105">
                <span className="text-sm font-bold">04</span>
                <h4 className="mt-3 font-bold">Testing & Launch</h4>
                <p className="mt-2 text-sm">
                  We rigorously test, optimize, and deploy your product to ensure a
                  smooth and reliable launch.
                </p>
              </div>

              {/* Step 5 */}
              <div className="relative group p-6 rounded-2xl border-2 border-[#4458DC]
                              bg-[#4458DC] text-white shadow-sm transition-all duration-300
                              hover:bg-white hover:text-gray-900 hover:shadow-lg hover:-translate-y-2 hover:scale-105">
                <span className="text-sm font-bold">05</span>
                <h4 className="mt-3 font-bold">Support & Growth</h4>
                <p className="mt-2 text-sm">
                  Post-launch support, monitoring, and continuous improvements to help
                  your product grow.
                </p>
              </div>

            </div>
          </div>
      </section>

      {/* Our Design Section */}
      <section className="relative py-28 bg-white overflow-hidden">
        <div className="absolute inset-0 -z-10 flex justify-center">
          <div className="w-[600px] h-[600px] bg-[#4458DC] opacity-10 blur-3xl rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-20">
            <h2 className="uppercase text-lg font-bold text-gray-700">
              Our Design
            </h2>
            <div className="h-1 w-20 bg-[#4458DC] my-3"></div>

            <h3 className="text-4xl font-bold text-gray-900">
              Designed for Every Screen
            </h3>

            <p className="mt-4 text-gray-600">
              We create consistent, scalable user interfaces that adapt seamlessly
              across desktop and mobile experiences.
            </p>
          </div>

          {/* Design Showcase */}
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* LEFT: Text + Features */}
            <div className="space-y-8">
              
              <div className="flex gap-4">
                <Layers className="text-[#4458DC]" />
                <div>
                  <h4 className="font-bold text-gray-900">
                    Component-Driven Design
                  </h4>
                  <p className="text-sm text-gray-600">
                    Reusable UI components ensure consistency, speed, and scalability
                    across platforms.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Sparkles className="text-[#4458DC]" />
                <div>
                  <h4 className="font-bold text-gray-900">
                    User-Centered Interfaces
                  </h4>
                  <p className="text-sm text-gray-600">
                    Every screen is crafted with clarity, accessibility, and real user
                    behavior in mind.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Smartphone className="text-[#4458DC]" />
                <div>
                  <h4 className="font-bold text-gray-900">
                    Responsive by Default
                  </h4>
                  <p className="text-sm text-gray-600">
                    Desktop-first structure with mobile-first usability — never an
                    afterthought.
                  </p>
                </div>
              </div>

            </div>

            {/* RIGHT: UI MOCKUPS */}
            <div className="relative flex flex-col md:flex-row justify-center items-center gap-8">

              {/* Desktop Card */}
              <div className="relative bg-white border border-gray-200 rounded-2xl shadow-2xl w-full max-w-[420px] md:w-[420px] p-4 transform hover:-translate-y-3 transition-all duration-500">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                  <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                  <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-1 bg-gray-100 h-40 rounded-lg"></div>
                  <div className="col-span-3 space-y-3">
                    <div className="h-6 bg-gray-200 rounded"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-24 bg-gray-100 rounded-lg"></div>
                  </div>
                </div>
                <Monitor className="absolute -top-4 -right-4 bg-white p-2 rounded-full text-[#4458DC] shadow-lg" />
              </div>

              {/* Mobile Card */}
              <div className="relative bg-white border border-gray-200 rounded-[2rem] shadow-xl w-full max-w-[180px] md:w-[180px] h-[360px] p-4 translate-y-12 hover:-translate-y-6 transition-all duration-500">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-3">
                  <div className="h-20 bg-gray-100 rounded-lg"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                </div>
                <Smartphone className="absolute -top-4 -right-4 bg-white p-2 rounded-full text-[#4458DC] shadow-lg" />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden bg-[#4458DC]">
          <div className="absolute inset-0 flex justify-center -z-10">
            <div className="w-[700px] h-[700px] bg-white opacity-10 blur-3xl rounded-full"></div>
          </div>
          <div className="max-w-5xl mx-auto px-6 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Ready to Build Something Exceptional?
            </h2>

            <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
              Whether you’re launching a new product or scaling an existing system,
              we help you turn ideas into reliable, high-impact digital solutions.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" variant="secondary" className="bg-white text-[#4458DC] cursor-pointer">
                  Start a Project
                </Button>
              </Link>

              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white cursor-pointer">
                  Talk to Us
                </Button>
              </Link>
            </div>
            <p className="mt-8 text-sm text-white/70">
              No obligation • Free consultation • Fast response
            </p>
          </div>
      </section>

    </main>
    <ScrollToTop />
    </>
  );
}
