import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../../models/user";
import bcrypt from "bcrypt";

type Credentials = {
  employeeEmail: string;
  password: string;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        employeeEmail: { label: "Email", type: "text" }, // Correct key for employee email
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {

        const { employeeEmail, password } = credentials as Credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ employeeEmail });

          if (!user) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            return null;
          }

          return user;
        } catch (err) {
          console.log("Error", err);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user, session }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        return {
          ...token,
          id: user.id,
          nameEng: user.nameEng,
          employeeProfile: user.employeeProfile,
          role: user.role,
          employeeTitle: user.employeeTitle,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          nameEng: token.nameEng,
          employeeProfile: token.employeeProfile,
          role: token.role,
          employeeTitle: token.employeeTitle,
        },
      };
    },
  },
};
