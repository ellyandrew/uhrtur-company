import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Total Clients
    const totalClients = await prisma.client_tbl.count();

    // Active Projects
    const activeProjects = await prisma.project_tbl.count({
      where: { status: "ACTIVE" },
    });

    // Open Jobs
    const openJobs = await prisma.jobs_tbl.count({
      where: { status: "OPEN" },
    });

    // Blog Posts
    const totalBlogs = await prisma.blog_tbl.count();

    return NextResponse.json({
      totalClients,
      activeProjects,
      openJobs,
      totalBlogs,
    });

  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
