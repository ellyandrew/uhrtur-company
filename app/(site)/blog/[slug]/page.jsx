import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowLeft, ArrowRight } from "lucide-react";

export default function BlogReadPage() {
  return (
    <main className="relative overflow-hidden">

      {/* Glow Background */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#4458DC]/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 -left-20 w-72 h-72 bg-[#4458DC]/20 blur-3xl rounded-full"></div>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-10 text-center">
        <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-[#4458DC] mb-6">
          <ArrowLeft size={16} className="mr-1" /> Back to Blog
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Building Scalable Web Applications in 2026
        </h1>

        <div className="flex justify-center gap-6 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar size={14} /> Jan 18, 2026
          </span>
          <span className="flex items-center gap-1">
            <User size={14} /> Uhrtur Editorial
          </span>
        </div>
      </section>

      {/* Featured Image */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <Image
            src="/blog/blog-featured.jpg"
            alt="Blog Feature"
            width={1200}
            height={600}
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Article Content */}
      <section className="max-w-4xl mx-auto px-6 py-14 prose prose-lg prose-gray">
        <p>
          At Uhrtur, we believe modern businesses need digital systems that
          scale effortlessly. Building scalable web applications is not just
          about handling more users — it’s about creating solid architecture,
          performance-driven design, and cloud-ready deployments.
        </p>

        <h2>Why Scalability Matters</h2>
        <p>
          As your business grows, your technology must grow with it. A scalable
          application ensures consistent performance even as demand increases.
        </p>

        <blockquote>
          “Technology should never limit your vision — it should empower it.”
        </blockquote>

        <h2>Our Approach at Uhrtur</h2>
        <ul>
          <li>Component-driven UI systems</li>
          <li>Cloud-native deployment</li>
          <li>High-performance APIs</li>
          <li>Modern DevOps pipelines</li>
        </ul>

        <p>
          Whether you are a startup or an enterprise, our solutions are designed
          to meet today’s needs and tomorrow’s growth.
        </p>
      </section>

      {/* Author Box */}
      <section className="max-w-4xl mx-auto px-6 pb-14">
        <div className="flex items-center gap-5 p-6 border rounded-xl bg-white shadow-sm">
          <Image
            src="/blog/user.png"
            alt="Author"
            width={70}
            height={70}
            className="rounded-full"
          />
          <div>
            <h4 className="font-semibold text-gray-800">Uhrtur Editorial Team</h4>
            <p className="text-sm text-gray-500">
              Writing about modern technology, digital growth, and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h3 className="text-2xl font-bold mb-6">Related Articles</h3>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Designing Human-Centered UX",
              description:
                "How user-focused design principles create products people love to use.",
              image: "/blog/blog1.jpg",
              slug: "human-centered-ux",
            },
            {
              title: "Cloud Deployment Best Practices",
              description:
                "A guide to deploying scalable, secure, and cost-efficient cloud applications.",
              image: "/blog/blog3.jpg",
              slug: "cloud-deployment-best-practices",
            },
            {
              title: "Why APIs Drive Modern Apps",
              description:
                "Understanding how APIs connect services and power modern digital ecosystems.",
              image: "/blog/blog2.jpg",
              slug: "why-apis-drive-modern-apps",
            },
          ].map((post, i) => (
            <Link
              key={i}
              href={`/blog/${post.slug}`}
              className="group border rounded-xl overflow-hidden hover:shadow-lg transition bg-white"
            >
              <Image
                src={post.image}
                alt={post.title}
                width={400}
                height={250}
                className="object-cover w-full h-[220px]"
              />

              <div className="p-4">
                <h4 className="font-semibold text-gray-800 group-hover:text-[#4458DC] transition">
                  {post.title}
                </h4>

                <p className="text-sm text-gray-500 mt-2">
                  {post.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </section>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-[#4458DC]/10 blur-3xl"></div>

    </main>
  );
}