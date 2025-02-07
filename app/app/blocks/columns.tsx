"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Block } from "@/utils/api"
import { shortHash } from "@/utils/shortHash";

export const columns: ColumnDef<Block>[] = [
  {
    accessorKey: "hash",
    header: "Hash",
    cell: ({ row }) => {
        const longHash = row.getValue('hash') ;
        const _shortHash = shortHash(longHash) ;
        return (_shortHash) ;
    }
  },
  {
    accessorKey: "number",
    header: "Number",
  },
  {
    accessorKey: "chain_id",
    header: "Chain ID",
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => <>{new Date(row.getValue('time') * 1000).toLocaleString()}</>,
  },
]
