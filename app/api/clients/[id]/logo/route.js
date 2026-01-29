import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const PUT = async (req, context) => {
  try {
    // Get client ID from params
    const params = await context.params;
    const { id } = params;
    if (!id) return NextResponse.json({ error: "Client ID required" }, { status: 400 });

    const clientId = BigInt(id);

    // Parse FormData
    const formData = await req.formData();
    const file = formData.get("logo");

    if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    // Fetch existing client
    const client = await prisma.client_tbl.findUnique({ where: { client_id: clientId } });
    if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

    // Ensure uploads/clients folder exists
    const uploadsDir = path.join(process.cwd(), "public", "uploads", "clients");
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

    // Delete old logo if exists
    if (client.logo) {
      const oldPath = path.join(process.cwd(), "public", client.logo.replace(/^\//, ""));
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    // Save new logo
    const fileExt = path.extname(file.name); // preserve extension
    const safeName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${fileExt}`;
    const filePath = path.join(uploadsDir, safeName);

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const logoPath = `/uploads/clients/${safeName}`;

    // Update DB
    const updated = await prisma.client_tbl.update({
      where: { client_id: clientId },
      data: { logo: logoPath },
    });

    return NextResponse.json({ logo: updated.logo }, { status: 200 });

  } catch (err) {
    console.error("Logo update error:", err);
    return NextResponse.json({ error: "Failed to update logo" }, { status: 500 });
  }
};
