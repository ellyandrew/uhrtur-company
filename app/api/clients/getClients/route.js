import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const clients = await prisma.client_tbl.findMany({
      orderBy: { client_id: "desc" },
      select: {
        client_id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        logo: true,
        created_at: true,
        status: true,
      },
    });

    const safeClients = clients.map((c) => ({
      id: c.client_id.toString(),              // BigInt → string
      name: c.name,
      email: c.email,
      phone: c.phone,
      address: c.address,
      logo: c.logo,
      status: c.status,
      createdAt: c.created_at
        ? c.created_at.toISOString().split("T")[0]
        : null,
    }));

    return new Response(JSON.stringify(safeClients), { status: 200 });
  } catch (err) {
    console.error("Fetch clients error:", err);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
  }
}
