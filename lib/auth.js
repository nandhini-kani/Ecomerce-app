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
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("User not found");

        const ok = await compare(credentials.password, user.password);
        if (!ok) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      }
    })
  ],

  session: {
    strategy: "jwt"
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    }
  },

  secret: process.env.NEXTAUTH_SECRET,
};
