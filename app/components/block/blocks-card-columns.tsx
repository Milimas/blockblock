"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Block } from "@/utils/api"
import ShortHash, { shortHash } from "@/components/shortHash";

export const columns: ColumnDef<Block>[] = [
  {
    accessorKey: "hash",
    header: "Hash",
    cell: ({ row }) => {
      const hash = row.getValue('hash');
      return <ShortHash hash={hash} href={`/blocks/${hash}`}/>
    }
  },
  {
    accessorKey: "number",
    header: "Number",
  },
  {
    accessorKey: "chain_id",
    header: "Chain ID",
    accessorFn: (row) => row.chainId || row.chain_id,
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => <>{new Date(row.getValue('time') * 1000).toUTCString()}</>,
  },
  {
    accessorKey: "transaction_count",
    header: "Transaction Count",
    accessorFn: (row) => row.transaction_count ?? "-",
  },
]
