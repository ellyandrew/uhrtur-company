import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project_tbl.findMany({
      orderBy: { project_id: "desc" },

      include: {
        client: {
          select: {
            client_id: true,
            name: true,
            logo: true,
          },
        },
      },
    });

    const safeProjects = projects.map((p) => ({
      id: p.project_id.toString(),
      name: p.name,
      status: p.status,
      startDate: p.start_date
        ? p.start_date.toISOString().split("T")[0]
        : null,
      endDate: p.end_date
        ? p.end_date.toISOString().split("T")[0]
        : null,

      client: p.client
        ? {
            id: p.client.client_id.toString(),
            name: p.client.name,
            logo: p.client.logo,
          }
        : null,
    }));

    return new Response(JSON.stringify(safeProjects), { status: 200 });

  } catch (err) {
    console.error("Fetch projects error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch projects" }),
      { status: 500 }
    );
  }
}
