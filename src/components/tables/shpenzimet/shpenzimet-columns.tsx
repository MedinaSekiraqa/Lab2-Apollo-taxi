"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header";
import { Shpenzimet } from "@/lib/type";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ShpenzimetCellAction } from "./cell-action";

export const shpenzimetColumns: ColumnDef<Shpenzimet>[] = [
   {
      accessorKey: "kategoria.emri",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Kategoria" />
      ),
      enableSorting: true,

      filterFn: (row, id, value) => {
         return value.includes(row.getValue(id));
      },
   },
   {
      accessorKey: "user.name",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="User" />
      ),
   },
   {
      accessorKey: "vlera",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Vlera" />
      ),
      cell: ({ row }) => {
         const record = row.original;
         return (
            <Badge variant={"secondary"} color="green">
               {record.vlera} €
            </Badge>
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
      accessorKey: "imagePath",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Foto" />
      ),
      cell: ({ row }) => {
         const record = row.original;
         return record.imagePath ? (
            <div className="">
               <Link
                  href={getImageUrl(record.imagePath)}
                  target="_blank"
                  download={false}
               >
                  <Button variant="ghost">Shkarko</Button>
               </Link>
            </div>
         ) : null;
      },
   },
   {
      id: "actions",
      cell: ({ row }) => {
         return (
            <ShpenzimetCellAction data={row.original} />
         );
      },
   },
];
