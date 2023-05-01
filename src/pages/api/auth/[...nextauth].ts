import NextAuth, {type DefaultSession, type ISODateString, type NextAuthOptions} from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import {PrismaClient} from '@prisma/client';
import {PrismaAdapter} from '@next-auth/prisma-adapter';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  callbacks: {
    async session({session, user}) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      session.user.id = user.id;
      return session;
    },
  },
};

export interface Session extends DefaultSession {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string | null;
  };
  expires: ISODateString;
}
export default NextAuth(authOptions);
