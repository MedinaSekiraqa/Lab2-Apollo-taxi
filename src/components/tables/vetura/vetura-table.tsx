import { DataTable } from "@/components/ui/table/data-table"
import React from "react"
//import { userColumns } from "./user-columns"
//import { getUserData, roles } from "../../_lib/data"
import {  fetchShpenzimet, fetchVeturat} from "@/utils/queries"
import { veturaColumns } from "./vetura-columns"
import VeturaModalButton from "@/components/ui/modalButtons/veturaModalButton"
import serverToken from "@/utils/serverToken"
//import { shpenzimetColumns } from "./shpenzimet-columns"

export default async function VeturaTable() {
  const token = await serverToken()
  const data = await fetchVeturat(token) 
  return (
   
    <div>
      <div className="flex justify-end">
        <VeturaModalButton/>
      </div>
        
      
       
      <DataTable
        columns={veturaColumns}
        data={data}
        type="vetura"
        filter="name"
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
