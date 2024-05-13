import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function serverToken() {
   const session = await getServerSession(authOptions);
   // console.log(session);
   //@ts-ignore
   return session?.user.token;
}
