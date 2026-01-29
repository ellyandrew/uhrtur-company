// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { prisma } from "@/lib/prisma";
// import bcrypt from "bcryptjs";
// import crypto from "crypto";

// export const authOptions = {
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 60 * 60, // 30 hours
//   },

//   secret: process.env.NEXTAUTH_SECRET,

//   providers: [
//     CredentialsProvider({
//       name: "EmailLogin",

//       credentials: {
//         email: { label: "Email or Username", type: "text" },
//         password: { label: "Password", type: "password" },
//       },

//       async authorize(credentials) {
//         const { email, password } = credentials;

//         if (!email || !password)
//           throw new Error("Email and password required");

//         const normalized = email.trim().toLowerCase();

//         const user = await prisma.user_tbl.findFirst({
//           where: {
//             OR: [{ email: normalized }, { username: normalized }],
//           },
//           include: {
//             user_roles: { include: { role: true } },
//           },
//         });

//         if (!user) throw new Error("Invalid credentials");
//         if (user.status !== "Active")
//           throw new Error("Account inactive");

//         const valid = await bcrypt.compare(password, user.password);
//         if (!valid) throw new Error("Invalid credentials");

//         // Extract role names
//         const roles = user.user_roles.map((r) => r.role.name);

//         return {
//           id: user.user_id.toString(),
//           email: user.email,
//           username: user.username,
//           full_name: user.full_name,
//           roles,
//         };
//       },
//     }),
//   ],

//   callbacks: {
//     // Store extra data inside JWT
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.email = user.email;
//         token.username = user.username;
//         token.full_name = user.full_name;
//         token.roles = user.roles;
//       }
//       return token;
//     },

//     // Make data available in client session
//     async session({ session, token }) {
//       session.user = {
//         id: token.id,
//         email: token.email,
//         username: token.username,
//         full_name: token.full_name,
//         roles: token.roles,
//       };
//       return session;
//     },

//     // Create DB session record on login
//     async signIn({ user }) {
//       await prisma.sessions.create({
//         data: {
//           user_id: BigInt(user.id),
//           token: crypto.randomUUID(),
//           expires_at: new Date(Date.now() + 30 * 60 * 60 * 1000),
//         },
//       });
//       return true;
//     },

//     // Remove DB session on logout
//     async signOut({ token }) {
//       await prisma.sessions.deleteMany({
//         where: { user_id: BigInt(token.id) },
//       });
//       return true;
//     },
//   },

//   pages: {
//     signIn: "/auth/login",
//     error: "/auth/login",
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };


import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export const authOptions = {
  session: { strategy: "jwt", maxAge: 30 * 60 * 60 },
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const email = credentials.email.trim().toLowerCase();

        const user = await prisma.user_tbl.findFirst({
          where: { OR: [{ email }, { username: email }] },
          include: { user_roles: { include: { role: true } } },
        });

        if (!user) throw new Error("Invalid credentials");
        if (user.status !== "Active") throw new Error("Account inactive");

        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) throw new Error("Invalid credentials");

        // Password expiry check (90 days)
        const age =
          Date.now() - new Date(user.password_updated_at).getTime();
        if (age > 1000 * 60 * 60 * 24 * 90) {
          throw new Error("PASSWORD_EXPIRED");
        }

        const roles = user.user_roles.map((r) => r.role.name);

        return {
          id: user.user_id.toString(),
          email: user.email,
          username: user.username,
          full_name: user.full_name,
          roles,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) Object.assign(token, user);
      return token;
    },

    async session({ session, token }) {
      session.user = token;
      return session;
    },

    async signIn({ user }) {
      await prisma.sessions.create({
        data: {
          user_id: BigInt(user.id),
          token: crypto.randomUUID(),
          expires_at: new Date(Date.now() + 30 * 60 * 60 * 1000),
        },
      });

      await prisma.event_log_tbl.create({
        data: {
          user_id: BigInt(user.id),
          action: "LOGIN",
          description: "User logged in",
        },
      });

      return true;
    },

    async signOut({ token }) {
      await prisma.sessions.deleteMany({
        where: { user_id: BigInt(token.id) },
      });

      await prisma.event_log_tbl.create({
        data: {
          user_id: BigInt(token.id),
          action: "LOGOUT",
          description: "User logged out",
        },
      });

      return true;
    },
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
