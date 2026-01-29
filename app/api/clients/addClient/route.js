import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const address = formData.get("address");
    const contactPerson = formData.get("contactPerson");
    const contactEmail = formData.get("contactEmail");
    const website = formData.get("website");
    const logoFile = formData.get("logo");

    if (!name || !email || !contactPerson || !contactEmail) {
      return new Response(
        JSON.stringify({ error: "Name and Contacts are required" }),
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone?.trim() || null;
    const cleanContactEmail = contactEmail.trim().toLowerCase();

    let normalizedWebsite = null;

    if (website?.trim()) {
      normalizedWebsite = website.trim();

      // auto-add protocol if missing
      if (!/^https?:\/\//i.test(normalizedWebsite)) {
        normalizedWebsite = `https://${normalizedWebsite}`;
      }
    }
    const cleanWebsite = normalizedWebsite || null;

    // Check duplicates
    const existing = await prisma.client_tbl.findFirst({
      where: {
        OR: [
          { email: cleanEmail },
          ...(cleanPhone ? [{ phone: cleanPhone }] : []),
        ],
      },
    });

    if (existing) {
      return new Response(
        JSON.stringify({ error: "Client with same email or phone already exists" }),
        { status: 409 }
      );
    }

    // Handle logo upload
    let logoPath = null;

    if (logoFile && logoFile.size > 0) {
      const bytes = await logoFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public/uploads/clients");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const ext = path.extname(logoFile.name);
      const fileName = `client-${Date.now()}${ext}`;

      fs.writeFileSync(path.join(uploadDir, fileName), buffer);

      logoPath = `/uploads/clients/${fileName}`;
    }

    // Create client
    await prisma.client_tbl.create({
      data: {
        name: name.trim(),
        email: cleanEmail,
        phone: cleanPhone,
        contact_person: contactPerson,
        contact_email: cleanContactEmail,
        website: cleanWebsite || null,
        address: address?.trim() || null,
        logo: logoPath,
      },
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 201 }
    );

  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
  }
}
