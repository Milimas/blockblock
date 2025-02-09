"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Block } from "@/utils/api"
import ShortHash, { shortHash } from "@/components/shortHash";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react"

export const columns: ColumnDef<Block>[] = [
  {
    accessorKey: "hash",
    header: "Hash",
    cell: ({ row }) => {
      const hash = row.getValue('hash');
      return <ShortHash hash={hash} href={`/blocks/${hash}`} />
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
  {
    accessorKey: "transaction_count",
    header: "Transaction Count",
  },
  {
    header: "View Transactions",
    cell: ({ row }) => {
      const hash = row.getValue('hash');
      const count = row.getValue('transaction_count');
      if (count < 1) {
        return <Button variant="primary" disabled className="flex items-center bg-muted/50 h-4 rounded-md">
          <ChevronRight />
        </Button>
      }
      return <Link href={`/blocks/${hash}/transactions`} >
        <Button variant="primary" className="flex items-center bg-muted/50 h-4 rounded-md">
          <ChevronRight />
        </Button>
      </Link>
    }
  }
]
