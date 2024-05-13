import { DataTable } from "@/components/ui/table/data-table"
import React from "react"
import { UserColumns } from "./user-columns"
import { fetchUsers } from "@/utils/queries"
import UserModalButton from "@/components/ui/modalButtons/userModalButton"

export default async function UserTable() {
  const userData = await fetchUsers() 
  return (
    <div>
      <div className="flex justify-end">
         <UserModalButton/>
      </div>
      
      <DataTable
        columns={UserColumns}
        data={userData}
        type="users"
        filter="username"
      />
    </div>
  )
}
