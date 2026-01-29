"use client";

import Image from "next/image";
import { Calendar, Tag } from "lucide-react";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "Why Every Business Needs a Modern Website in 2026",
    excerpt:
      "Discover how a modern web presence drives credibility, growth, and customer trust in today’s digital world.",
    image: "/blog/blog1.jpg",
    category: "Web Development",
    date: "Jan 10, 2026",
  },
  {
    id: 2,
    title: "UX Design Principles That Keep Users Engaged",
    excerpt:
      "Learn the key UX strategies that improve usability, engagement, and conversions for digital products.",
    image: "/blog/blog2.jpg",
    category: "UI/UX Design",
    date: "Dec 22, 2025",
  },
  {
    id: 3,
    title: "Scaling Your Business with Cloud & API Integration",
    excerpt:
      "Explore how cloud services and APIs can future-proof your applications and boost performance.",
    image: "/blog/blog3.jpg",
    category: "Cloud & APIs",
    date: "Dec 12, 2025",
  },
  {
    id: 4,
    title: "Mobile Apps: Native vs Cross-Platform — What to Choose?",
    excerpt:
      "A breakdown of mobile development approaches to help you choose the best path for your product.",
    image: "/blog/blog4.jpg",
    category: "Mobile Development",
    date: "Nov 30, 2025",
  },
  {
  id: 5,
  title: "Custom Software: When Off-the-Shelf Solutions Aren’t Enough",
  excerpt:
    "Every business is unique. Learn why custom-built software gives you flexibility, efficiency, and long-term growth.",
  image: "/blog/blog5.png",
  category: "Custom Software",
  date: "Jan 02, 2026",
},
{
  id: 6,
  title: "Cybersecurity in 2026: Protecting Your Digital Assets",
  excerpt:
    "As digital threats grow, securing your applications and data is more critical than ever. Here’s what every business must know.",
  image: "/blog/blog6.png",
  category: "Security",
  date: "Jan 08, 2026",
},
];

const categories = [
  "All",
  "Web Development",
  "UI/UX Design",
  "Cloud & APIs",
  "Mobile Development",
  "Custom Software",
  "Security",
];

export default function BlogPage() {
  return (
    <main className="relative max-w-7xl mx-auto px-6 pt-24 pb-20 overflow-hidden">

      {/* Glow Background */}
      <div className="absolute top-[-6rem] left-1/2 -translate-x-1/2 
                      w-[700px] h-[700px] bg-[#4458DC] opacity-20 
                      blur-3xl rounded-full -z-10"></div>

      {/* Header */}
      <section className="text-center mb-14">
        <h1 className="text-5xl font-bold uppercase mb-4">
          Uhrtur <span className="text-[#4458DC]">Blog</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Insights, trends, and stories on modern web, mobile, and digital innovation.
        </p>
      </section>

      {/* Featured Post */}
      <section className="grid md:grid-cols-2 gap-10 items-center mb-16">

        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <Image
            src="/blog/featured.jpg"
            alt="Featured Post"
            width={600}
            height={400}
            className="object-cover w-full h-full"
          />
        </div>

        <div>
          <span className="inline-block text-xs font-semibold text-[#4458DC] bg-[#4458DC]/10 px-3 py-1 rounded-full mb-3">
            Featured
          </span>

          <h2 className="text-3xl font-bold mb-3">
            Building Digital Experiences That Drive Growth
          </h2>

          <p className="text-gray-600 mb-5">
            Learn how strategic design, modern development, and smart technology
            help businesses scale in today’s competitive digital landscape.
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <span className="flex items-center gap-1">
              <Calendar size={14} /> Jan 15, 2026
            </span>
            <span className="flex items-center gap-1">
              <Tag size={14} /> Digital Strategy
            </span>
          </div>

          <Link href="/blog/slug">
            <button className="bg-[#4458DC] text-white px-5 py-2 rounded-lg hover:bg-[#3346c5] transition cursor-pointer">
              Read More
            </button>
          </Link>
          
        </div>

      </section>

      {/* Category Filter */}
      <div className="flex justify-center gap-3 mb-10 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            className="px-4 py-2 rounded-full border border-gray-300 text-sm 
                       hover:bg-[#4458DC] hover:text-white hover:border-[#4458DC] transition"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <section className="grid md:grid-cols-3 gap-8">

        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 
                       overflow-hidden transition-all duration-300 
                       hover:-translate-y-3 hover:shadow-xl
                       animate-[fadeUp_0.6s_ease-out_forwards] opacity-0"
          >
            <Image
              src={post.image}
              alt={post.title}
              width={400}
              height={250}
              className="object-cover w-full h-52"
            />

            <div className="p-6">
              <span className="text-xs font-semibold text-[#4458DC]">
                {post.category}
              </span>

              <h3 className="font-bold text-lg mt-2 mb-3">
                {post.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4">
                {post.excerpt}
              </p>

              <div className="flex justify-between items-center text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar size={13} /> {post.date}
                </span>

                <Link href="/blog/slug">
                  <button className="text-[#4458DC] font-semibold hover:underline cursor-pointer">
                    Read More →
                  </button>
                </Link>

              </div>
            </div>
          </div>
        ))}

      </section>
    </main>
  );
}
