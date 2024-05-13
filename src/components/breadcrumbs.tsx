"use client";
import { Slash } from "lucide-react";

import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname, useRouter } from "next/navigation";

export function Breadcrumbs() {
   const router = useRouter();
   const pathname = usePathname();
   const pathSegments = pathname.split("/").filter(Boolean);

   return (
      <Breadcrumb>
         <BreadcrumbList>
            <BreadcrumbItem>
               <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>

            {pathSegments.map((segment: any, index: number) => {
               const path = `/${pathSegments.slice(0, index + 1).join("/")}`;

               return (
                  <div key={index} className="flex items-center gap-2">
                     <BreadcrumbSeparator>
                        <Slash />
                     </BreadcrumbSeparator>

                     <BreadcrumbItem>
                     <BreadcrumbLink href={path}>{segment}</BreadcrumbLink>
                     </BreadcrumbItem>
                  </div>
               );
            })}

         </BreadcrumbList>
         {/* <BreadcrumbItem style={{ paddingTop: "10px" }}>
            {pathSegments.length > 1 && (
               <BreadcrumbPage>
                  {pathSegments[pathSegments.length - 1]
                     ?.charAt(0)
                     .toUpperCase() +
                     pathSegments[pathSegments.length - 1]?.slice(1)}
               </BreadcrumbPage>
            )}
         </BreadcrumbItem> */}
      </Breadcrumb>
   );
}
