"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header"
import { KategoriaShpenzimeve } from "@/lib/type"
import { CellAction } from "./cell-action"

export const kategoriaColumns: ColumnDef<KategoriaShpenzimeve>[] = [
  {
    accessorKey: "emri",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Emri" />
    ),
    enableSorting: true,
 
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "pershkrimi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pershkrimi" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original

      return (
        <CellAction data={row.original} />
      )
    },
  },
]