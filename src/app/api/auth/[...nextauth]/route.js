//? This file stores the configuration of NextAuth for authentication using credentials (email and password)
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Running authorization...");
        const { email, password } = credentials;

        // Example: Simple hardcoded credentials check
        if (email === "admin@example.com" && password === "1234") {
          console.log("Authorization successful");
          return {
            email: email,
            role: "admin", // Example role
          };
        }

        console.log("Authorization failed: Invalid credentials");
        return null; // Return null if credentials are invalid
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
        return "/jumtc-core-access";
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 12,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };