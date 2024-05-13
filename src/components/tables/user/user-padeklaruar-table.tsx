import { DataTable } from "@/components/ui/table/data-table";
import React from "react";
import { fetchUsersPadeklaruar } from "@/utils/queries";
import { UserColumns } from "./user-columns";

async function UserPadeklaruarTable() {
   const userData = await fetchUsersPadeklaruar();
   return (
      <div>
         <div className="flex justify-end"></div>

         <DataTable
            columns={UserColumns}
            data={userData}
            type="users"
            filter="username"
         />
      </div>
   );
}

export default UserPadeklaruarTable;
