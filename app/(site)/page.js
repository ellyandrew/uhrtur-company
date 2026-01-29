import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Globe, Palette, Cloud, Wrench } from "lucide-react";


export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-6 overflow-hidden  relative min-h-screen">

      {/* Hero Section */}
      <section className="relative grid md:grid-cols-2 gap-10 items-center pt-24 pb-30">

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
      <section className="absolute bottom-0 left-0 w-full">

  {/* Glow Dome Background */}
<div className="absolute bottom-[-6rem] left-1/2 -translate-x-1/2 w-[120%] h-[300px] 
                bg-[#4458DC] opacity-20 blur-3xl rounded-full"></div>


        {/* Cards Container */}
        <div className="relative max-w-7xl mx-auto px-6 pb-6">
          <div className="grid md:grid-cols-4 gap-6">

          {/* Card 1 */}
          <div className=" group bg-white rounded-t-3xl shadow-xl border border-gray-100 
  p-6 text-center transition-all duration-300 
  hover:-translate-y-6 hover:scale-105 animate-[fadeUp_0.6s_ease-out_forwards]
opacity-0
">

            <Globe className="mx-auto text-[#4458DC]" size={32} />

            <h4 className="mt-4 font-bold text-gray-800">
              Web & Mobile
            </h4>

            <p className="text-sm text-gray-500 mt-2">
              Custom websites & apps built to scale.
            </p>

            {/* Hidden expanded content */}
            <p className="text-sm text-gray-600 mt-4 opacity-0 max-h-0 
                          group-hover:opacity-100 group-hover:max-h-40 
                          transition-all duration-300">
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

    </main>
  );
}
