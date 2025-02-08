"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Transaction } from "@/utils/api"
import { shortHash } from "@/utils/shortHash";

export const columns: ColumnDef<Transaction>[] = [
  {
    header: "Hash",
    accessorKey: "hash",
    cell: ({ row }) => shortHash(row.getValue('hash')),
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
    cell: ({ row }) => row.getValue('value') * 1e-18 + " ETH",
  },
  {
    header: "Contract Address",
    accessorKey: "contract_address",
    cell: ({ row }) => shortHash(row.getValue('contract_address')),
  },
  {
    header: "To",
    accessorKey: "to",
    cell: ({ row }) => shortHash(row.getValue('to')),
  },
  {
    header: "Block Hash",
    accessorKey: "block_hash",
    cell: ({ row }) => shortHash(row.getValue('block_hash')),
  }
]
