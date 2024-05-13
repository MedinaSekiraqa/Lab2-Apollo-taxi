import { fetchRaportiShoferit } from "@/utils/queries";
import { DataTable } from "@/components/ui/table/data-table";
import { raportiShColumns } from "./raportiSh-columns";
import { RaportiShoferit } from "@/lib/type";
import { oraret, roles } from "@/lib/utils";

export async function RaportiShoferitTable() {
   const data: RaportiShoferit[] = await fetchRaportiShoferit();
   // console.log(data)
   return (
      <div className=" shadow rounded-lg p-8  w-full min-w-screen ">
         <DataTable
            data={data}
            columns={raportiShColumns}
            type="Raportet"
            filter="user.username"
            customFilter="user.username"
            filters={[
               {
                  title: "Role",
                  options: roles,
                  accessorKey: "user.role",
               },
               {
                  title: "Orari",
                  options: oraret,
                  accessorKey: "user.orari",
               },
            ]}
         />
      </div>
   );
}
