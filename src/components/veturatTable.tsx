import { fetchKategoriteEshpenzimeve, fetchVeturat } from "@/utils/queries";
import React from "react";
import {  Vetura } from "@/lib/type";
import { Button } from "./ui/button";
import VeturaModalButton from "./ui/modalButtons/veturaModalButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function VeturatTable() {
   // console.log(session)
   const veturat: Vetura[] = await fetchVeturat();
   // console.log(veturat)
   return (
      <div className="bg-white shadow rounded-lg  w-full container pt-4">
         <div className="flex justify-between">
            <h1 className="text-2xl font-bold text-left mb-6">
               Veturat
            </h1>
            <VeturaModalButton />
         </div>
         <div className="overflow-hidden rounded-lg">
            <table className="w-full">
               <thead>
                  <tr className="text-left bg-gray-100">
                     <th className="px-6 py-3">Emri</th>
                     <th className="px-6 py-3">Kilometrazha</th>
                     <th className="px-6 py-3"></th>
                  </tr>
               </thead>
               <tbody>
                  {veturat &&
                     veturat.map((vetura) => {
                        return (
                           <tr className="border-b" key={vetura.id}>
                              <td className="px-6 py-4 flex items-center space-x-4">
                                 <div>
                                    <div className="font-medium">
                                       {vetura.name}
                                    </div>
                                 </div>
                              </td>
                              <td className="px-6 py-4  space-x-4">
                                 {vetura.kilometrazha
                                    ? vetura.kilometrazha
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
