import { Transaction } from "@/utils/api";
import { DataTable } from "@/components/headless-data-table";
import { columns } from '@/components/transactions-card-columns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const fetchTransactions = async (page: number): Promise<{ results: Transaction[] }> => {
    return fetch(`http://backend:8000/api/transactions/?page=1`)
    .then((res) => res.json());
}

export default async function TransactionsCard() {
    const transactions = await fetchTransactions(1)
    .then((data) => data.results.slice(0, 10));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Last Transactions</CardTitle>
                <CardDescription>Last 10 transactions</CardDescription>
            </CardHeader>
            <CardContent>
            {transactions.length > 0 ? (
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