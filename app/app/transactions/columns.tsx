"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Transaction } from "@/utils/api"
import ShortHash, { shortHash } from "@/components/shortHash";

export const columns: ColumnDef<Transaction>[] = [
  {
    header: "Hash",
    accessorKey: "hash",
    cell: ({ row }) => <ShortHash hash={row.getValue('hash')} />,
  },
  {
    header: "Index",
    accessorKey: "index",
  },
  {
    header: "Chain ID",
    accessorKey: "chain_id",
  },
  {
    header: "Amount",
    accessorKey: "value",
    cell: ({ row }) => <div className="text-right">
      {(row.getValue('value') * 1e-18).toFixed(2) + " ETH"}
    </div>,
  },
  {
    header: "Contract Address",
    accessorKey: "contract_address",
    cell: ({ row }) => <ShortHash hash={row.getValue('contract_address')} />,
  },
  {
    header: "To",
    accessorKey: "to",
    cell: ({ row }) => <ShortHash href={`/transactions/wallet/${row.getValue('to')}`} hash={row.getValue('to')} />,
  },
  {
    header: "Block Hash",
    accessorKey: "block_hash",
    cell: ({ row }) => <ShortHash href={`/blocks/${row.getValue('block_hash')}`} hash={row.getValue('block_hash')} />,
  },
]
