import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const blogs = await prisma.blog_tbl.findMany({
      orderBy: { created_at: "desc" },
      select: {
        blog_id: true,
        title: true,
        slug: true,
        author: true,
        category: true,
        created_at: true,
        updated_at: true,
      },
    });

    // Convert BigInt to string and format dates
    const safeBlogs = blogs.map((b) => ({
      id: b.blog_id.toString(),
      title: b.title,
      slug: b.slug,
      author: b.author,
      category: b.category,
      createdAt: b.created_at ? b.created_at.toISOString() : null,
      updatedAt: b.updated_at ? b.updated_at.toISOString() : null,
    }));

    return new Response(JSON.stringify(safeBlogs), { status: 200 });
  } catch (err) {
    console.error("Fetch blogs error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
