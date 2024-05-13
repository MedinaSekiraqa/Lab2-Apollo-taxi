"use client"

import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  Cross2Icon,
  CrossCircledIcon,
  PlusCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { Input } from "../input"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { Button } from "../button"
//import { DataTableViewOptions } from "./data-table-view-options"
//import { statuses } from "@/app/[domain]/_lib/data"
import { useState } from "react"
import { DataTableViewOptions } from "./data-table-view-options"
//import { useFiltersModal } from "@/hooks/use-filters-modal"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  type: string
  filter: string
  filters?: { title: string; options: any[]; accessorKey: string }[]
}

export function DataTableToolbar<TData>({
  table,
  type,
  filter,
  filters,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  // console.log(filter)
  const [open, setOpen] = useState(false)
  //const filterModal = useFiltersModal()
  const [usernameFilter, setUsernameFilter] = useState("");


  return (
    <div className="z-10 flex w-full items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={`Filter ${type}...`}
          value={(table.getColumn(filter)?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            table.getColumn(filter)?.setFilterValue(event.target.value)
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {filters?.map(
          (filterr) =>
            table.getColumn(filterr.accessorKey) && (
              <DataTableFacetedFilter
                key={filterr.title}
                column={table.getColumn(filterr.accessorKey)}
                title={filterr.title}
                options={filterr.options}
              />
            ),
        )}
        
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
        
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}