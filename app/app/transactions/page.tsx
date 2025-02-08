"use client";

import { Transaction, fetchTransactions } from "@/utils/api";
import { columns } from "./columns"
import { useEffect, useState } from 'react';
import { DataTable } from "./data-table"
import { Button } from "@/components/ui/button"

export default function TransactionPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [hash, setHash] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTransactions() {
      setError(null);
      try {
        const data = await fetchTransactions(hash);
        console.log("Data", data);
        
        setTransactions(data.results);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(String(error));
        }
      }
    }
    loadTransactions();
  }, [hash]);

  return (
    <main className="container mx-auto items-center justify-center flex min-h-screen">
      {transactions.length > 0 ? (
        <div className="container mx-auto">
          <DataTable columns={columns} data={transactions} />
          <div className="flex justify-between mt-4">
            <Button onClick={() => setHash(hash => Math.max(hash - 1, 1))} disabled={hash === 1}>
              Previous
            </Button>
            <Button onClick={() => setHash(hash => hash + 1)}>Next</Button>
          </div>
        </div>
      ) : (
        <div className="">
          <h1 className="text-2xl font-bold">No transactions found</h1>
          <p className="text-gray-500">There are no transactions to display</p>
        </div>)
      }
    </main>
  )
}
