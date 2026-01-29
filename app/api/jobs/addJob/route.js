import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, department, location, status, closingDate, description, requirements } = body;

    const job = await prisma.jobs_tbl.create({
      data: {
        title,
        department,
        location,
        status,
        closing_date: closingDate ? new Date(closingDate) : null,
        description,
        requirements: {
          create: requirements.map((r) => ({ requirement: r })),
        },
      },
      include: { requirements: true },
    });

    return new Response(JSON.stringify({ success: true, job }), { status: 200 });
  } catch (err) {
    console.error("Add job error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
