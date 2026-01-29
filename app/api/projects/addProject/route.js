import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name, category, client_id, amount, deposit,
      startDate, endDate, notes
    } = body;

    const project = await prisma.project_tbl.create({
      data: {
        name,
        category,
        client_id: BigInt(client_id),
        amount,
        deposit,
        start_date: startDate ? new Date(startDate) : null,
        end_date: endDate ? new Date(endDate) : null,
        notes,
      },
    });

    await prisma.invoice_tbl.create({
      data: {
        project_id: project.project_id,
        amount,
        deposit,
        paid_amount: 0,
        status: "PENDING",
      },
    });

    return new Response(
        JSON.stringify(
            {
            success: true,
            project: JSON.parse(
                JSON.stringify(project, (_, v) =>
                typeof v === "bigint" ? v.toString() : v
                )
            ),
            }
        ),
        { status: 200 }
        );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
