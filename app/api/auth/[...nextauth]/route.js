export const runtime = "nodejs";

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import { compare } from "bcryptjs";
import connectDB from "@/lib/mongodb";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("User not found");

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        return {
          id: user._id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

// 🔥 VERY IMPORTANT — you were missing this!
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
