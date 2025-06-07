import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {PrismaClient} from "@prisma/client";
import {AuthOptions} from "next-auth";

const prisma = new PrismaClient();
export const authOptions:AuthOptions = {
  adapter:PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // add other NextAuth options here
  session:{
    strategy:"database",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
