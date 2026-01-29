import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { transporter } from "@/lib/scripts/mailer";
import { resetPasswordTemplate } from "@/lib/scripts/emailTemplates";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Email required" }), { status: 400 });
    }

    const genericResponse = new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );

    const user = await prisma.user_tbl.findFirst({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return genericResponse;
    }

    // secure token
    const token = crypto.randomBytes(32).toString("hex");

    // Expire in 5mins
    const expires = new Date(Date.now() + 5 * 60 * 1000);

    // Remove old tokens
    await prisma.password_reset_tbl.deleteMany({
      where: { user_id: user.user_id },
    });

    // Store token
    await prisma.password_reset_tbl.create({
      data: {
        user_id: user.user_id,
        token,
        expires_at: expires,
      },
    });

    // Reset link
    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password/${token}`;

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request",
      html: resetPasswordTemplate({
    name: user.full_name,
    resetLink: resetUrl,
  }),
    });

    return genericResponse;

  } catch (err) {
    console.error("Forgot password error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
