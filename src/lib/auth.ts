import { axiosPublic } from "@/utils/api";
import axios from "axios";
import { DefaultSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import toast from "react-hot-toast";
import { User } from "./type";

export const authOptions: NextAuthOptions = {
   pages: {
      signIn: "/login",
   },
   session: {
      strategy: "jwt",
      maxAge: 5 * 60 * 60, // 5 hours

      // updateAge: 24 * 60 * 60, // 24 hours
   },
   providers: [
      CredentialsProvider({
         name: "Credentials",
         credentials: {
            username: { label: "Email", type: "email", placeholder: "jsmith" },
            password: { label: "Password", type: "password" },
         },
         async authorize(credentials, req) {
            try {
               // console.log(req);
               const res = await axiosPublic.post("/users/login", credentials);
               // console.log(res.data);
               const user = res.data;
               // console.table(user)
               if (!user) {
                  return null;
               }
               if (typeof window !== "undefined") {
                  sessionStorage.setItem("AccessToken", user.accessToken);
               }

               return user;
            } catch (error: any) {
               // console.error("Error her in the route",error);

               if (axios.isAxiosError(error) && error.response) {
                  const { status, data } = error.response;

                  if (
                     status === 400 &&
                     data.error?.message === "Validation error" &&
                     data.error?.details
                  ) {
                     const validationError = data.error.details[0]?.message;

                     if (validationError) {
                        throw new Error(validationError); // Throw error to be caught in NextAuth's signIn method
                     } else {
                        throw new Error(
                           `Oops: ${data.error?.message || "Unknown error"}`
                        );
                     }
                  } else {
                     throw new Error(data.message || "Unknown error");
                  }
               } else {
                  throw new Error(
                     "Network error: Unable to connect to the server."
                  );
               }
            }
         },
      }),
   ],
   callbacks: {
      async jwt({ token, user, session }) {
         // console.log(token)
         // console.log(user)
         // console.log(session)
         if (user) {
            token.id = user.id;
            token.name = user.name;
            //@ts-ignore
            token.username = user.username;
            //@ts-ignore
            token.role = user.role;
            token.email = user.email;
            //@ts-ignore
            token.accessToken = user.accessToken;
            // You can include other user data as needed
         }
         return token;
      },
      async session({ session, user, token }) {
         // console.log(session);
         // console.log(user);
         // console.log(token);
         let newSession = session;
         if (session) {
            return {
               ...newSession,
               // token:token.accessToken,
               user: {
                  ...newSession.user,
                  username: token.username,
                  role: token.role,
                  token:token.accessToken,
                  id: token.id,
               },
               token,
            };
         }
         return newSession;
      },
   },
};

declare module "next-auth" {
   interface Session extends DefaultSession {
      user: User;
   }
}
