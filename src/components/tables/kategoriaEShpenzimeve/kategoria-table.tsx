import { DataTable } from "@/components/ui/table/data-table"
import React from "react"
//import { userColumns } from "./user-columns"
//import { getUserData, roles } from "../../_lib/data"
import { fetchKategoriteEshpenzimeve, fetchUsers } from "@/utils/queries"
import { kategoriaColumns } from "./kategoria-columns"
import KategoriaShpenzimeveModalButton from "@/components/ui/modalButtons/kategoriaShpenzimeveModalButton"

export default async function KategoriaTable() {
  const data = await fetchKategoriteEshpenzimeve() 
  return (
    <div>
      <div className="flex justify-end">
        <KategoriaShpenzimeveModalButton/>
      </div>
      
      <DataTable
        columns={kategoriaColumns}
        data={data}
        type="kategoriaEShpenzimeve"
        filter="emri"
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
