import { transporter } from "@/lib/scripts/mailer";
import { contactAutoReplyTemplate } from "@/lib/scripts/emailTemplates";

export async function POST(req) {
    try {
        const { name, email, subject, message } = await req.json();

        if (!name || !email || !subject || !message) {
            return Response.json({ error: "Missing fields" }, { status: 400 });
        }

        /* 1 Send notification to Uhrtur */
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO || process.env.EMAIL_USER,
            subject: `New Contact: ${subject}`,
            html: `
        <h3>New Contact Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p>${message}</p>
      `,
        });

        /* 2️ Send auto-reply to USER */
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Thank You for Contacting Uhrtur Group ✔️",
            html:contactAutoReplyTemplate({
                name: name,
              }),
        });

        return Response.json({ success: true });

    } catch (err) {
        console.error("Contact error:", err);
        return Response.json({ error: "Failed to send message" }, { status: 500 });
    }
}
