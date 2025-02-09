"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Transaction } from "@/utils/api"
import ShortHash, { shortHash } from "@/components/shortHash";

export const columns: ColumnDef<Transaction>[] = [
  {
    header: "Hash",
    accessorKey: "hash",
    cell: ({ row }) => <ShortHash size={14} hash={row.getValue('hash')} />,
  },
  {
    header: "Chain ID",
    accessorKey: "chain_id",
    accessorFn: (row) => row.chain_id || row.chainId,
  },
  {
    header: "Amount",
    accessorKey: "value",
    cell: ({ row }) => <div className="text-right">
      {(row.getValue('value') * 1e-18).toFixed(2) + " ETH"}
    </div>,
  },
  {
    header: "To",
    accessorKey: "to",
    cell: ({ row }) => <ShortHash size={14} href={`/transactions/wallet/${row.getValue('to')}`} hash={row.getValue('to')} />,
  },
  {
    header: "Block Hash",
    accessorKey: "block_hash",
    cell: ({ row }) => <ShortHash size={14} href={`/blocks/${row.getValue('block_hash')}`} hash={row.getValue('block_hash')} />,
    accessorFn: (row) => row.block_hash || row.blockHash,
  },
]
