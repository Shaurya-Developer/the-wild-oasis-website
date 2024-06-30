import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    // CredentialProvider, for own credential which load from a datbase, see doc of auth.js credentials
  ],
  callbacks: {
    authorized({ auth, request }) {
      //   return auth?.user ? true : false, this is same as below
      return !!auth?.user;
    }, // middleware, it will only run for /account as we have given this route in the middleware.js
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name });
        return true;
      } catch (error) {
        return false;
      }
    }, // this runs before actual signin process happens, it is like a middleware when user have given their credential but before the actual sign in
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    }, // this will run after signIn, will be called after each time session is called (auth), doing this to get the guestId which is in the supabase
  },
  pages: {
    signIn: "/login",
  }, // we can tell auth , the pages it should render for the signin and signout
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
// auth can be called in any server component we want, we have a way to use it in the client component but it is always good to use auth in the server component

//AUTHENTICATION means to get the right information of the current user and making sure the user is the same who they claim to be, AUTHERIZATION means to only allow access to certain areas of the website to users who are logged in and have right privileges
