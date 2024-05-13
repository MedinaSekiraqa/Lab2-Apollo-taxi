import { fetchKategoriteEshpenzimeve } from "@/utils/queries";
import React from "react";
import KategoriaShpenzimeveModalButton from "./ui/modalButtons/kategoriaShpenzimeveModalButton";
import { KategoriaShpenzimeve } from "@/lib/type";
import { Button } from "./ui/button";

export default async function KategoriteEShpenzimeveTable() {
   const kategoriteEShpenzimeve: KategoriaShpenzimeve[] =
      await fetchKategoriteEshpenzimeve();
      // console.log(kategoriteEShpenzimeve)
   return (
      <div className="bg-white shadow rounded-lg  w-full container pt-4">
         <div className="flex justify-between">
            <h1 className="text-2xl font-bold text-left mb-6">
               Kategorite e Shpenzimeve
            </h1><KategoriaShpenzimeveModalButton />
         </div>
         <div className="overflow-hidden rounded-lg">
            <table className="w-full">
               <thead>
                  <tr className="text-left bg-gray-100">
                     <th className="px-6 py-3">Emri</th>
                     <th className="px-6 py-3">Pershkrimi</th>
                     <th className="px-6 py-3">
                        
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {kategoriteEShpenzimeve &&
                     kategoriteEShpenzimeve.map((kategoria) => {
                        return (
                           <tr className="border-b" key={kategoria.id}>
                              <td className="px-6 py-4 flex items-center space-x-4">
                                 <div>
                                    <div className="font-medium">
                                       {kategoria.emri}
                                    </div>
                                 </div>
                              </td>
                              <td className="px-6 py-4  space-x-4">
                                 {kategoria.pershkrimi
                                    ? kategoria.pershkrimi
                                    : ""}
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
