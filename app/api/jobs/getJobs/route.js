// Example Prisma API
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const jobs = await prisma.jobs_tbl.findMany({
      orderBy: { job_id: "desc" },
    });

    const safeJobs = jobs.map(j => ({
      id: j.job_id.toString(),
      title: j.title,
      department: j.department,
      status: j.status,
      postedDate: j.posted_date?.toISOString().split("T")[0] || null,
      closingDate: j.closing_date?.toISOString().split("T")[0] || null,
    }));

    return new Response(JSON.stringify(safeJobs), { status: 200 });
  } catch (err) {
    console.error("Fetch jobs error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
