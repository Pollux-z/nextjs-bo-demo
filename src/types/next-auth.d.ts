import NextAuth, { User, type DefaultSession } from "next-auth";

declare module "next-auth" {

  interface User {
    id: string;
    nameEng: string;
    employeeProfile: string;
    role: string;
    employeeTitle: string;
  }

  interface Session {
    user: {
      id: string;
      nameEng: string;
      employeeProfile: string;
      role: string;
      employeeTitle: string;

      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface JWT {
    id: string;
    nameEng: string;
    employeeProfile: string;
    role: string;
    employeeTitle: string;
  }
}
