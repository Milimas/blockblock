"use client";

import { fetchWallet, Transaction } from "@/utils/api"
import { DataTable } from "@/components/data-table"
import { columns } from "@/app/transactions/columns"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";

export default function WalletPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [page, setPage] = useState<number>(1);
    const [nextPage, setNextPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const params = useParams();

    // console.log("Wallet Address", params.wallet_address);
    

    useEffect(() => {
        async function loadTransactions() {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchWallet(params.wallet_address as string, page);
                setTransactions(data.results);
                setNextPage(data.next);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError(String(error));
                }
            } finally {
                setLoading(false);
            }
        }
        loadTransactions();
    }, [page]);

    return (
        <>
            {transactions.length > 0 ? (
                <div className="">
                    <DataTable columns={columns} data={transactions} />
                    <div className="flex justify-between mt-4">
                        <Button onClick={() => setPage(page => Math.max(page - 1, 1))} disabled={page === 1}>
                            Previous
                        </Button>
                        <Button onClick={() => setPage(page => page + 1)} disabled={nextPage === null}>
                            Next
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="">
                    <h1 className="text-2xl font-bold">Wallet found</h1>
                    <p className="text-gray-500">There is no wallet to display</p>
                </div>)
            }
        </>
    )
}