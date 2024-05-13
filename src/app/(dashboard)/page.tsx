// "use client";
import { Stats } from "@/components/component/stats";
import { Fitimet } from "@/components/component/fitimet";
import { Workers } from "@/components/component/workers";
import { axiosPrivate, axiosPublic } from "@/utils/api";
import toast from "react-hot-toast";
import axios from "axios";
import { fetchUsers } from "@/utils/queries";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { Button } from "@/components/ui/button";
import RaportishoferitModalButton from "@/components/ui/modalButtons/raportiShoferitModalButton";
import ShpenzimetModalButton from "@/components/ui/modalButtons/shpenzimetModalButton";
// import { axiosPublic} from "@/app/dashboard/lib/api";

export default function DashboardPage() {
   // const session = await getServerSession(authOptions);
   // console.log(session)
   // const users = await fetchUsers();
   return (
      <main className="w-fit min-h-screen">
         <div>
            <RaportishoferitModalButton />
            <ShpenzimetModalButton />
         </div>

         {/* <div className="flex gap-2 w-full">
            <Stats />
            <Fitimet />
         </div>

         <div>
            <Workers />
         </div> */}
      </main>
   );
}
