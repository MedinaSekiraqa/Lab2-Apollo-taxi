
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function serverUser() {
   const session = await getServerSession(authOptions);
   return session?.user;
}
