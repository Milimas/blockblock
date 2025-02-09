"use client";

import { Transaction } from "@/utils/api";
import { DataTable } from "@/components/headless-data-table";
import { columns } from '@/components/transaction/transactions-card-columns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useEffect, useState } from 'react';
import { fetchTransactions } from "@/utils/api";
import { socket } from "@/app/socket";

export default function TransactionsCard() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (socket.connected) {
            onConnect();
        }

        async function onConnect() {
        }
        
        function onTransactions(msg: string) {
            const data = JSON.parse(msg);
            setTransactions((prev) => [data, ...prev].slice(0, 10)); // Keep last 10 updates
        }
        
        socket.on('connect', onConnect);
        socket.on('transactions', onTransactions);

        async function loadTransactions() {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchTransactions(1);
                setTransactions(data.results.slice(0, 10));
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
        return () => {
            socket.off('connect', onConnect);
            socket.off('transactions', onTransactions);
        }
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Last Transactions</CardTitle>
                <CardDescription>Last 10 transactions</CardDescription>
            </CardHeader>
            <CardContent>
                {loading || transactions.length > 0 ? (
                    <DataTable columns={columns} data={transactions} />
                ) : (
                    <div className="">
                        <h1 className="text-2xl font-bold">No transactions found</h1>
                        <p className="text-gray-500">There are no transactions to display</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}