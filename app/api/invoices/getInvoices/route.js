// app/api/invoices/getInvoices/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const invoices = await prisma.invoice_tbl.findMany({
      orderBy: { created_at: "desc" },
      include: {
        project: {
          select: {
            project_id: true,
            name: true,
          },
        },
      },
    });

    const safeInvoices = invoices.map((inv) => ({
      id: inv.invoice_id.toString(),
      projectName: inv.project?.name || "—",
      amount: inv.amount,
      deposit: inv.deposit,
      paid: inv.paid_amount,
      balance: inv.amount - inv.paid_amount,
      status: inv.status,
      date: inv.created_at.toISOString().split("T")[0],
    }));

    return NextResponse.json(safeInvoices);
  } catch (error) {
    console.error("Fetch invoices error:", error);
    return NextResponse.json(
      { error: "Failed to fetch invoices" },
      { status: 500 }
    );
  }
}
