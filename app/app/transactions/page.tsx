"use client";

import React from 'react';
import { Transaction, fetchTransactions } from "@/utils/api";
import { columns } from "./columns"
import { useEffect, useState } from 'react';
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { Skeleton } from '@/components/ui/skeleton';

export default function TransactionPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [hash, setHash] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    setInterval(() => {
    fetchTransactions(hash)
      .then((data) => {
        setTransactions(data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
    }, 1000);
  }, [hash]);

  return (
    <>
      {loading || transactions.length > 0 ? (
        <div className="">
          <DataTable loading={loading} columns={columns} data={transactions} />
          <div className="flex justify-between mt-4">
            <Button onClick={() => setHash(hash => Math.max(hash - 1, 1))} disabled={hash === 1}>
              Previous
            </Button>
            <Button onClick={() => setHash(hash => hash + 1)}>Next</Button>
          </div>
        </div>
      ) : (
        <div className="self-center">
          <h1 className="text-2xl font-bold">No transactions found</h1>
          <p className="text-gray-500">There are no transactions to display</p>
        </div>)
      }
    </>
  )
}
