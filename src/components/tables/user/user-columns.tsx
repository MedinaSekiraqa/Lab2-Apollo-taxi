"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header";
import { User } from "@/lib/type";
import { CellAction } from "./cell-action";

export const UserColumns: ColumnDef<User>[] = [
   {
      accessorKey: "name",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Emri" />
      ),
   },
   {
      accessorKey: "lastName",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Mbiemri" />
      ),
   },

   {
      accessorKey: "username",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="UserName" />
      ),
      enableSorting: true,

      filterFn: (row, id, value) => {
         return value.includes(row.getValue(id));
      },
   },
   {
      accessorKey: "role",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Role" />
      ),
      enableSorting: true,

      filterFn: (row, id, value) => {
         return value.includes(row.getValue(id));
      },
   },
   {
      accessorKey: "email",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Email" />
      ),
   },
   {
      accessorKey: "phone",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Tel." />
      ),
   },
   {
      accessorKey: "orari",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Orari" />
      ),
   },
   {
      accessorKey: "salary",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Rroga" />
      ),
   },
   {
      id: "actions",
      cell: ({ row }) => {
         const payment = row.original;

         return <CellAction data={row.original} />;
      },
   },
];
