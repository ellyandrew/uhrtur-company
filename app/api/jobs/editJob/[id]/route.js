import { prisma } from "@/lib/prisma";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const job = await prisma.jobs_tbl.findUnique({
      where: { job_id: BigInt(id) },
      include: { requirements: true },
    });
    if (!job) return new Response(JSON.stringify({ error: "Job not found" }), { status: 404 });

    return new Response(JSON.stringify(job), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const { title, department, location, status, closingDate, description, requirements } = body;

    // Update job details
    const job = await prisma.jobs_tbl.update({
      where: { job_id: BigInt(id) },
      data: {
        title,
        department,
        location,
        status,
        closing_date: closingDate ? new Date(closingDate) : null,
        description,
      },
    });

    // Handle requirements
    for (const r of requirements) {
      if (r.id) {
        // Update existing requirement
        await prisma.requirement.update({
          where: { requirement_id: BigInt(r.id) },
          data: { requirement: r.value },
        });
      } else {
        // Create new requirement
        await prisma.requirement.create({
          data: { job_id: BigInt(id), requirement: r.value },
        });
      }
    }

    return new Response(JSON.stringify({ success: true, job }), { status: 200 });
  } catch (err) {
    console.error("Edit job error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
