import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ShpenzimetModalButton from "@/components/ui/modalButtons/shpenzimetModalButton";
import { useCreateShpenzimetModal } from "@/hooks/use-create-shpenzimet-modal";
import { Shpenzimet } from "@/lib/type";
import { getImageUrl } from "@/lib/utils";
import { axiosPublic } from "@/utils/api";
import { fetchShpenzimet } from "@/utils/queries";
import Image from "next/image";
import Link from "next/link";

export default async function ShpenzimetTable() {
   const shpenzimet: Shpenzimet[] = await fetchShpenzimet();
   return (
      <div className="bg-white shadow rounded-lg  w-full container pt-4">
         <div className="flex justify-between">
            <h1 className="text-2xl font-bold text-left mb-6">Shpenzimet</h1>
            <ShpenzimetModalButton />
         </div>
         <div className="overflow-hidden rounded-lg">
            <table className="w-full">
               <thead>
                  <tr className="text-left bg-gray-100">
                     <th className="px-6 py-3">Kategoria</th>
                     <th className="px-6 py-3">Pershkrimi</th>
                     <th className="px-6 py-3">Vlera</th>
                     <th className="px-6 py-3">Data</th>
                     <th className="px-6 py-3">Foto</th>
                     <th className="px-6 py-3"></th>
                  </tr>
               </thead>
               <tbody>
                  {shpenzimet &&
                     shpenzimet.map((shpenzimi) => {
                        return (
                           <tr className="border-b" key={shpenzimi.id}>
                              <td className="px-6 py-4 flex items-center space-x-4">
                                 <div>
                                    <div className="font-medium">
                                       {shpenzimi.kategoria.emri}
                                    </div>
                                 </div>
                              </td>
                              <td className="px-6 py-4  space-x-4">
                                 {shpenzimi.pershkrimi
                                    ? shpenzimi.pershkrimi
                                    : ""}
                              </td>
                              <td className="px-6 py-4">{shpenzimi.vlera} €</td>
                              <td className="px-6 py-4">
                                 {new Date(shpenzimi.data).toLocaleDateString(
                                    "en-GB",
                                    {
                                       year: "numeric",
                                       month: "short",
                                       day: "2-digit",
                                    }
                                 )}
                              </td>

                              <td className="px-6 py-4">
                                 {shpenzimi.imagePath && (
                                    <Link
                                       href={getImageUrl(shpenzimi.imagePath!)}
                                       target="_blank"
                                       download={false}
                                    >
                                       <Button variant="ghost">Shkarko</Button>
                                    </Link>
                                 )}
                              </td>

                              <td className="px-6 py-4">
                                 <Button variant="ghost">Edit</Button>
                              </td>
                           </tr>
                        );
                     })}
               </tbody>
            </table>
         </div>
      </div>
   );
}
