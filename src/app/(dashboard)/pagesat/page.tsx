import { Faturat } from "@/components/component/faturat";
import { Fitimet } from "@/components/component/fitimet";
import { PagesaInfo } from "@/components/component/pagesa-info";
import PagesaInfoList from "@/components/component/pagesa-info-list";
import { Rroga } from "@/components/component/rroga";
import { Shpenzimet } from "@/components/component/shpenzimet";
import { Stats } from "@/components/component/stats";
import { Transactions } from "@/components/component/transactions";
import React from "react";

export default function Pagesat() {
   return (
      <div className="w-full">
         <div className="flex  justify-center w-full gap-4">
            <div className="w-full flex flex-col  gap-4">
               <div className="flex gap-3"><Rroga /><Shpenzimet/></div>
               <PagesaInfoList />
            </div>
            <div className="w-full flex flex-col  gap-4">
               <Faturat />
               <Transactions />
            </div>
         </div>
         {/* 
         
         <Stats/>
         <Fitimet/> */}
      </div>
   );
}
