import { prisma } from "@/lib/prisma";

// GET CLIENT DETAILS
export async function GET(request, context) {
  try {
    // ✅ await params
    const params = await context.params;
    const { id } = params;

    if (!id) {
      return new Response(JSON.stringify({ error: "Client ID required" }), {
        status: 400,
      });
    }

    const clientId = BigInt(id);

    const client = await prisma.client_tbl.findUnique({
      where: { client_id: clientId },
      select: {
        client_id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        logo: true,
        status: true,
        created_at: true,
        website: true,
        contact_person: true,
        contact_email: true,
      },
    });

    if (!client) {
      return new Response(JSON.stringify({ error: "Client not found" }), {
        status: 404,
      });
    }

    // Safe response
    const safeClient = {
      id: client.client_id.toString(),
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: client.address,
      logo: client.logo,
      status: client.status,
      created: client.created_at.toISOString().split("T")[0],
      website: client.website,
      contactPerson: client.contact_person,
      contactEmail: client.contact_email,
    };

    return new Response(JSON.stringify(safeClient), { status: 200 });

  } catch (error) {
    console.error("GET client error:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}

// UPDATE CLIENT DETAILS
export async function PUT(request, context) {
  try {
    const params = await context.params;
    const id = BigInt(params.id);
    const body = await request.json();

    const updated = await prisma.client_tbl.update({
      where: { client_id: id },
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        status: body.status,
        address: body.address,
        website: body.website,
        contact_person: body.contactPerson,
        contact_email: body.contactEmail,
      },
    });

    const safeUpdated = {
      id: updated.client_id.toString(),
      name: updated.name,
      email: updated.email,
      phone: updated.phone,
      address: updated.address,
      status: updated.status,
      logo: updated.logo,
      created: updated.created_at.toISOString().split("T")[0],
      website: updated.website,
      contactPerson: updated.contact_person,
      contactEmail: updated.contact_email,
    };

    return new Response(JSON.stringify(safeUpdated), { status: 200 });

  } catch (err) {
    console.error("Update client error:", err);
    return new Response(JSON.stringify({ error: "Update failed" }), { status: 500 });
  }
}


