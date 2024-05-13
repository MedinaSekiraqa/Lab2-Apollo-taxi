import { DataTable } from "@/components/ui/table/data-table"
import React from "react"
//import { userColumns } from "./user-columns"
//import { getUserData, roles } from "../../_lib/data"
import {  fetchShpenzimet, fetchTotalShpenzimetVlera} from "@/utils/queries"
import { shpenzimetColumns } from "./shpenzimet-columns"
import ShpenzimetModalButton from "@/components/ui/modalButtons/shpenzimetModalButton"
import { Badge } from "@/components/ui/badge"

export default async function ShpenzimetTable() {
  const data = await fetchShpenzimet() 
  const total = await fetchTotalShpenzimetVlera();
  return (
    <div>
      <div className="flex justify-between">
            <div className="text-2xl font-bold text-green-500">

               Total: <span>{total} €</span>
            </div>

         <ShpenzimetModalButton/>
      </div>
     
      <DataTable
        columns={shpenzimetColumns}
        data={data}
        type="shpenzimet"
        filter="kategoria"
        // filters={[
        //   {
        //     title: "Role",
        //     options: roles,
        //     accessorKey: "role",
        //   },
        // ]}
      />
    </div>
  )
}
