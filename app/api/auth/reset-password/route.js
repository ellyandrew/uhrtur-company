import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400 });
    }
    
    const record = await prisma.password_reset_tbl.findUnique({
      where: { token },
    });

    if (!record) {
      return new Response(JSON.stringify({ error: "Invalid or expired token" }), { status: 400 });
    }

    // Check expiry
    if (record.expires_at < new Date()) {
      await prisma.password_reset_tbl.delete({ where: { id: record.id } });
      return new Response(JSON.stringify({ error: "Token expired" }), { status: 400 });
    }

    // Update password
    const hashed = await bcrypt.hash(password, 10);

    await prisma.user_tbl.update({
      where: { user_id: record.user_id },
      data: { password: hashed },
    });

    // Delete token after use
    await prisma.password_reset_tbl.delete({ where: { id: record.id } });

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (err) {
    console.error("Reset password error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
