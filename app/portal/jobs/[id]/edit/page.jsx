"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input, Textarea, Button } from "@/components/ui/Input";
import { useToast } from "@/components/ui/ToastContext";

export default function EditJobPage() {
  const { id } = useParams();
  const router = useRouter();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("Open");
  const [closingDate, setClosingDate] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState([]);

  // Fetch job data
  useEffect(() => {
    async function fetchJob() {
      setLoading(true);
      try {
        const res = await fetch(`/api/jobs/editJob/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch job");

        setTitle(data.title || "");
        setDepartment(data.department || "");
        setLocation(data.location || "");
        setStatus(data.status || "Open");
        setClosingDate(data.closing_date ? data.closing_date.split("T")[0] : "");
        setDescription(data.description || "");
        setRequirements(
          data.requirements?.map((r) => ({ id: r.requirement_id, value: r.requirement })) || []
        );
      } catch (err) {
        console.error(err);
        showToast(err.message || "Error loading job", "error");
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, [id]);

  const handleAddRequirement = () =>
    setRequirements([...requirements, { id: null, value: "" }]);

  const handleRemoveRequirement = (index) =>
    setRequirements(requirements.filter((_, i) => i !== index));

  const handleRequirementChange = (index, value) => {
    const newReqs = [...requirements];
    newReqs[index].value = value;
    setRequirements(newReqs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return showToast("Job title is required", "error");

    setSaving(true);
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          department,
          location,
          status,
          closingDate,
          description,
          requirements: requirements.map((r) => ({ id: r.id, value: r.value })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update job");

      showToast("Job updated successfully", "success");
      router.push("/portal/jobs");
    } catch (err) {
      console.error(err);
      showToast(err.message || "Network error", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="p-6 text-center text-gray-500">Loading job details...</div>
    );

  return (
    <section className="p-6 max-w-3xl mx-auto bg-white border rounded-2xl shadow-xl">
      <h1 className="text-2xl font-bold mb-6">Edit Job</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input label="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <Input label="Department" value={department} onChange={(e) => setDepartment(e.target.value)} />
        <Input label="Location" value={location} onChange={(e) => setLocation(e.target.value)} />

        <div>
          <label className="text-sm text-gray-600">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4458DC]/40"
          >
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="Paused">Paused</option>
          </select>
        </div>

        <Input
          label="Closing Date"
          type="date"
          value={closingDate}
          onChange={(e) => setClosingDate(e.target.value)}
        />

        <Textarea
          label="Job Description"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="space-y-2">
          <label className="text-sm text-gray-600 font-medium">Requirements</label>
          {requirements.map((req, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder={`Requirement #${index + 1}`}
                value={req.value}
                onChange={(e) => handleRequirementChange(index, e.target.value)}
              />
              {requirements.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveRequirement(index)}
                  className="px-3 py-1 bg-red-100 text-red-600 rounded-lg"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddRequirement}
            className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg mt-1"
          >
            + Add Requirement
          </button>
        </div>

        <Button type="submit" disabled={saving} className="w-full mt-4">
          {saving ? "Saving..." : "Update Job"}
        </Button>
      </form>
    </section>
  );
}
