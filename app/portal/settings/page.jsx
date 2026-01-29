"use client";

import { useState } from "react";
import { Save } from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "Uthabiti Africa",
    contactEmail: "info@uthabiti.africa",
    phone: "+254 700 000000",
    address: "Nairobi, Kenya",
  });

  function handleChange(e) {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  }

  function handleSave(e) {
    e.preventDefault();
    alert("Settings saved (API coming next)");
  }

  return (
    <div className="p-6 max-w-3xl">
      
      <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
      <p className="text-gray-500 mb-6">
        Manage system configuration and contact details
      </p>

      <form
        onSubmit={handleSave}
        className="bg-white border rounded-xl shadow-sm p-6 space-y-5"
      >
        <div>
          <label className="text-sm text-gray-600">Site Name</label>
          <input
            name="siteName"
            value={settings.siteName}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 mt-1"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Contact Email</label>
          <input
            name="contactEmail"
            value={settings.contactEmail}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 mt-1"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Phone Number</label>
          <input
            name="phone"
            value={settings.phone}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 mt-1"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Address</label>
          <textarea
            name="address"
            value={settings.address}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 mt-1"
          />
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 bg-[#4458DC] text-white px-5 py-2 rounded-lg hover:bg-[#3647b3]"
        >
          <Save size={18} />
          Save Settings
        </button>
      </form>
    </div>
  );
}
