"use client";

import { motion } from "framer-motion";

const variants = {
   blue: {
    bg: "bg-blue-50",
    icon: "text-blue-600",
    value: "text-blue-900",
  },
  green: {
    bg: "bg-green-50",
    icon: "text-green-600",
    value: "text-green-900",
  },
  purple: {
    bg: "bg-purple-50",
    icon: "text-purple-600",
    value: "text-purple-900",
  },
  red: {
    bg: "bg-red-50",
    icon: "text-red-600",
    value: "text-red-900",
  },
  yellow: {
    bg: "bg-yellow-50",
    icon: "text-yellow-600",
    value: "text-yellow-900",
  },
  orange: {
    bg: "bg-orange-50",
    icon: "text-orange-600",
    value: "text-orange-900",
  },
  cyan: {
    bg: "bg-cyan-50",
    icon: "text-cyan-600",
    value: "text-cyan-900",
  },
  indigo: {
    bg: "bg-indigo-50",
    icon: "text-indigo-600",
    value: "text-indigo-900",
  },
  gray: {
    bg: "bg-gray-100",
    icon: "text-gray-600",
    value: "text-gray-900",
  },
  teal: {
    bg: "bg-teal-50",
    icon: "text-teal-600",
    value: "text-teal-900",
  },
  pink: {
    bg: "bg-pink-50",
    icon: "text-pink-600",
    value: "text-pink-900",
  },
};

export default function AppCard({ icon, title, value, variant = "blue" }) {
  const v = variants[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${v.bg} p-6 rounded-xl shadow-lg hover:scale-[1.03] transition cursor-pointer`} >
      <div className={`${v.icon} text-3xl mb-3`}>{icon}</div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className={`text-2xl font-bold mt-2 ${v.value}`}>{value}</p>
    </motion.div>
  );
}

