"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/ToastContext";

export default function NewClientPage() {
  const router = useRouter();
  const { showToast } = useToast();

    const initialForm = {
        name: "",
        email: "",
        countryCode: "+254",
        phone: "",
        website: "",
        contactPerson: "",
        contactEmail: "",
        address: "",
        logo: null,
    };

    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    function validate() {
        const err = {};

        if (!form.name.trim()) err.name = "Client name required";

        if (!form.email.trim()) err.email = "Email required";
        else if (!/^\S+@\S+\.\S+$/.test(form.email))
        err.email = "Enter valid email";

        if (form.phone) {
        if (!form.countryCode)
            err.phone = "Country code required";

        else if (!/^[0-9\s-]{6,}$/.test(form.phone))
            err.phone = "Enter valid phone number";
        }
        if (!form.contactPerson.trim()) err.contactPerson = "Contact Person required";

        if (!form.contactEmail.trim()) err.contactEmail = "Contact Email required";
        else if (!/^\S+@\S+\.\S+$/.test(form.contactEmail))
        err.contactEmail = "Enter valid contact email";

        if (!form.website?.trim()) {
        err.website = "Website URL is required";
        } else if (
        !/^(https?:\/\/)?(www\.)?[a-z0-9-]+(\.[a-z]{2,})(\/.*)?$/i.test(
            form.website.trim()
        )
        ) {
        err.website = "Enter a valid website URL";
        }


        setErrors(err);
        return Object.keys(err).length === 0;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!validate()) {
            showToast("Fix form errors", "error");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("contactPerson", form.contactPerson);
        formData.append("contactEmail", form.contactEmail);
        formData.append("website", form.website || "");
        formData.append("address", form.address || "");
        formData.append(
            "phone",
            form.phone
            ? `${form.countryCode}${form.phone.replace(/\s+/g, "")}`
            : ""
        );

        if (form.logo) {
            formData.append("logo", form.logo);
        }

        try {
            const res = await fetch("/api/clients/addClient", {
            method: "POST",
            body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
            showToast(data.error || "Failed to create client", "error");
            return;
            }

            showToast("Client added successfully", "success");

            setForm(initialForm);
            router.push("/portal/clients");

        } catch (err) {
            console.error(err);
            showToast("Network error", "error");
        } finally {
            setLoading(false);
        }
    }

  return (
    <section className="p-6 max-w-6xl mx-auto">
      <h1 className="text-xl font-semibold mb-6">Add New Client</h1>

      <form onSubmit={handleSubmit} className="bg-white border rounded-xl p-6 space-y-5">

        <div>
            <label className="text-sm text-gray-600">Client Logo</label>
            <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                setForm({ ...form, logo: e.target.files[0] })
                }
                className="mt-2 block w-full text-sm text-gray-600
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-lg file:border-0
                        file:text-sm file:font-medium
                        file:bg-[#4458DC] file:text-white
                        hover:file:bg-[#3646b8]
                        cursor-pointer"
            />
            <p className="text-xs text-gray-400 mt-1">
                Upload JPG or PNG image
            </p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
            label="Client Name *"
            value={form.name}
            error={errors.name}
            onChange={(v) => setForm({ ...form, name: v })}
        />

        <Input
            label="Email *"
            value={form.email}
            error={errors.email}
            onChange={(v) => setForm({ ...form, email: v })}
        />

        <div>
            <label className="text-sm text-gray-600">Phone</label>
            <div className="flex gap-2 mt-1">
            <select
                value={form.countryCode}
                onChange={(e) =>
                setForm({ ...form, countryCode: e.target.value })
                }
                className="border rounded-lg px-2 py-2 text-sm bg-white"
            >
                <option value="+1">🇨🇦 +1</option>
                <option value="+254">🇰🇪 +254</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+91">🇮🇳 +91</option>
            </select>

            <input
                type="tel"
                value={form.phone}
                onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
                }
                className="flex-1 border rounded-lg px-3 py-2 text-sm"
                placeholder="XXX XXX XXX"
            />
                </div>
                {errors.phone && (
                <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                )}
            </div>

            <Input
                label="Contact Person Name *"
                value={form.contactPerson}
                error={errors.contactPerson}
                onChange={(v) => setForm({ ...form, contactPerson: v })}
            />

            <Input
                label="Contact Email *"
                value={form.contactEmail}
                error={errors.contactEmail}
                onChange={(v) => setForm({ ...form, contactEmail: v })}
            />

            <Input
                label="Website / URL *"
                value={form.website}
                error={errors.website}
                onChange={(v) => setForm({ ...form, website: v })}
            />

            <div className="md:col-span-2">
                <label className="text-sm text-gray-600">Address</label>
                <textarea
                value={form.address}
                onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2 text-sm mt-1"
                rows="3"
                />
            </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className={`bg-[#4458DC] text-white px-5 py-2 rounded-lg text-sm cursor-pointer
                ${loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#082465] hover:bg-[#061b45]"}
                `}
          >
            {loading ? "Saving..." : "Save Client"}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="border px-5 py-2 rounded-lg text-sm cursor-pointer"
          >
            Cancel
          </button>
        </div>

      </form>
    </section>
  );
}

function Input({ label, value, onChange, error }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full border rounded-lg px-3 py-2 text-sm mt-1 ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
