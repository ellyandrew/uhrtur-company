"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { useToast } from "@/components/ui/ToastContext";
import { isValidEmail, isValidPersonName, } from "@/lib/scripts/validators";

export default function ContactPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { showToast } = useToast();
  const [sent, setSent] = useState(false);

  const subjects = [
    "General Inquiry",
    "Request a Quote",
    "Project Consultation",
    "Support",
    "Partnership",
  ];

  const handleSubmit = async (e) => {
  e.preventDefault();

  let newErrors = {};

  if (!email.trim()) {
    newErrors.email = "Email address is required";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Enter a valid email address";
  }
  
  if (!name.trim()) {
    newErrors.name = "Full name is required";
    } else if (!isValidPersonName(name)) {
      newErrors.name = "Enter a correct name";
  }
  
  if (!subject) newErrors.subject = true;
  if (!message) newErrors.message = true;
  setErrors(newErrors);

  if (Object.keys(newErrors).length !== 0) return;

  try {
    setLoading(true);

    const res = await fetch("/api/contact/sendContact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject, message }),
    });

    const data = await res.json();

    if (!res.ok) {
      showToast(data.error || "Failed to send message", "error");
      return;
    }

    showToast("Message sent successfully ", "success");
    setSent(true);
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");

  } catch {
    showToast("Network error. Try again.", "error");
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="relative max-w-7xl mx-auto px-6 pt-24 pb-20 overflow-hidden">

      {/* Glow Background */}
      <div className="absolute top-[-6rem] left-1/2 -translate-x-1/2 
                      w-[700px] h-[700px] bg-[#4458DC] opacity-20 
                      blur-3xl rounded-full -z-10"></div>

      {/* Header */}
      <section className="text-center mb-14">
        <h1 className="text-5xl font-bold uppercase mb-4">
          Get In <span className="text-[#4458DC]">Touch</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Have a project in mind or need support? We’d love to hear from you.
        </p>
      </section>

      {/* Contact Layout */}
      <section className="grid md:grid-cols-2 gap-10 items-start">

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">

        {!sent ? (
          <>
          <h3 className="text-xl font-bold mb-6 text-gray-800">
            Send us a message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">

            <Input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!errors.name}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name}</p>
            )}

            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}

            {/* Subject Dropdown */}
            <div>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className={`w-full rounded-xl border px-4 py-3 text-gray-700 outline-none transition
                  ${
                    errors.subject
                      ? "border-red-500"
                      : "border-gray-300 focus:border-[#4458DC]"
                  }`}
              >
                <option value="">- select subject -</option>
                {subjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <TextArea
              placeholder="Your Message"
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`w-full rounded-xl border px-4 py-3 text-gray-700 outline-none transition resize-none
                ${
                  errors.message
                    ? "border-red-500"
                    : "border-gray-300 focus:border-[#4458DC]"
                }`}
            />

            <Button disabled={loading} type="submit" variant="primary" size="lg" className="w-full flex justify-center gap-2 cursor-pointer">
              <Send size={18} />
              {loading ? "Sending..." : "Send Message"}
            </Button>

          </form>
          </>
        ) : (
          <div className="text-center py-10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                ✓
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Thank you for reaching out!
              </h3>

              <p className="text-gray-600 text-sm">
                We’ve received your message and will get back to you as soon as possible.
              </p>
            </div>
          )}
        </div>

        {/* Contact Info Panel */}
        <div className="space-y-6">

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex items-center gap-4">
            <Mail className="text-[#4458DC]" size={26} />
            <div>
              <p className="font-semibold text-gray-800">Email Us</p>
              <p className="text-gray-600 text-sm">info@uhrtur.co.ke</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex items-center gap-4">
            <Phone className="text-[#4458DC]" size={26} />
            <div>
              <p className="font-semibold text-gray-800">Call Us</p>
              <p className="text-gray-600 text-sm">+254 741 746 854</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex items-center gap-4">
            <MapPin className="text-[#4458DC]" size={26} />
            <div>
              <p className="font-semibold text-gray-800">Our Location</p>
              {/* <p className="text-gray-600 text-sm">Upper Hill MRX6+495 Africa Re Centre, Nairobi Kenya</p> */}
              <p className="text-gray-600 text-sm">Nairobi, Kenya</p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
