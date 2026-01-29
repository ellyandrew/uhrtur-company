import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // 1️⃣ Clear old data
  await prisma.user_roles.deleteMany().catch(() => {});
  await prisma.sessions.deleteMany().catch(() => {});
  await prisma.user_tbl.deleteMany().catch(() => {});
  await prisma.roles.deleteMany().catch(() => {});

  // 2️⃣ Seed roles
  const roles = ["Admin", "User", "Applicant"];
  const roleRecords = [];
  for (const roleName of roles) {
    const role = await prisma.roles.create({
      data: { name: roleName },
    });
    roleRecords.push(role);
  }

  // 3️⃣ Seed users with roles
  const users = [
    {
      full_name: "John Doe",
      id_number: "ID001",
      email: "admin@example.com",
      username: "admin",
      status: "Active",
      password: await bcrypt.hash("Password123!", 10),
      role: "Admin",
    },
    {
      full_name: "Jane Smith",
      id_number: "ID002",
      email: "applicant@example.com",
      username: "applicant",
      status: "Active",
      password: await bcrypt.hash("Password123!", 10),
      role: "Applicant",
    },
    {
      full_name: "Bob Johnson",
      id_number: "ID003",
      email: "user@example.com",
      username: "user",
      status: "Active",
      password: await bcrypt.hash("Password123!", 10),
      role: "User",
    },
  ];

  for (const u of users) {
    const role = roleRecords.find((r) => r.name === u.role);

    const user = await prisma.user_tbl.create({
      data: {
        full_name: u.full_name,
        id_number: u.id_number,
        email: u.email,
        username: u.username,
        status: u.status,
        password: u.password,
        user_roles: {
          create: {
            role_id: role.role_id,
          },
        },
      },
    });

    console.log(`✅ Created user: ${user.username} (${u.role})`);
  }

  console.log("🌱 Seeding complete!");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
