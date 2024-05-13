"use client";
import { ColumnDef } from "@tanstack/react-table";
import { RaportiShoferit } from "@/lib/type";
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header";
import { CellAction } from "./cell-action";
import Link from "next/link";

export const raportiShColumns: ColumnDef<RaportiShoferit>[] = [
   {
      accessorKey: "pranoi",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Pranoi" />
      ),
   },
   {
      accessorKey: "dorzoi",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Dorzoi" />
      ),
   },
   {
      accessorKey: "paushall",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Paushall" />
      ),
   },
   {
      accessorKey: "minus",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Minus" />
      ),
   },
   {
      accessorKey: "user.username",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Username" />
      ),
      cell: ({ row }) => {
         const record = row.original;
         return (
            <Link
               className="underline"
               href={`/raporti/${record.user.username}`}
            >
               {record.user.username}
            </Link>
         );
      },
   },
   {
      accessorKey: "data",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Data" />
      ),
      cell: ({ row }) => {
         const record = row.original;
         return (
            <span>
               {new Date(record.data).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
               })}
            </span>
         );
      },
   },
   {
      accessorKey: "user.orari",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Orari" />
      ),
   },
   {
      accessorKey: "startTime",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Fillimi" />
      ),
   },
   {
      accessorKey: "endTime",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Mbarimi" />
      ),
   },
   {
      accessorKey: "vetura.name",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Vetura" />
      ),
   },
   // {
   //    accessorKey: "user.name",
   //    header: ({ column }) => (
   //       <DataTableColumnHeader column={column} title="Emri" />
   //    ),
   // },
   // {
   //    accessorKey: "user.lastName",
   //    header: ({ column }) => (
   //       <DataTableColumnHeader column={column} title="Mbiemri" />
   //    ),
   // },
   // {
   //    accessorKey: "user.phone",
   //    header: ({ column }) => (
   //       <DataTableColumnHeader column={column} title="Tel." />
   //    ),
   // },
   // {
   //    accessorKey: "user.role",
   //    header: ({ column }) => (
   //       <DataTableColumnHeader column={column} title="Role" />
   //    ),
   // },
   // {
   //    accessorKey: "user.salary",
   //    header: ({ column }) => (
   //       <DataTableColumnHeader column={column} title="Rroga" />
   //    ),
   // },
   {
      id: "actions",
      cell: ({ row }) => {
         const payment = row.original;

         return <CellAction data={row.original} />;
      },
   },
];
