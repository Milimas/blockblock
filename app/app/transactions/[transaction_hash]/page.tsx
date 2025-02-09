import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import CopyText from "@/components/copy-button";
import ShortHash from "@/components/shortHash";
import Link from 'next/link';
import { ArrowLeft, Clock, Hash, Database, LayersIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Transaction } from "@/utils/api";

export async function generateStaticParams() {
    const transactions: Transaction[] = await fetch('http://localhost:8000/api/transactions')
        .then((res) => res.json())
        .catch((e) => []);

    return transactions.map((transaction) => ({
        transaction_hash: String(transaction.hash),
    }));
}

export default async function Page({
    params,
}: {
    params: Promise<{ transaction_hash: string }>;
}) {
    const transaction_hash = (await params).transaction_hash;
    const transaction: Transaction = await fetch(`http://backend:8000/api/transactions/${transaction_hash}/`)
        .then((res) => res.json())
        .catch((e) => []);

    if (!transaction.hash) {
        return (
            <div className="container mx-auto p-8">
                <Alert variant="destructive">
                    <AlertTitle>Transaction Not Found</AlertTitle>
                    <AlertDescription>
                        The transaction with hash <ShortHash hash={transaction_hash} /> could not be found.
                    </AlertDescription>
                </Alert>
                <Button variant="outline" className="mt-4" asChild>
                    <Link href="/transactions">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Transactions
                    </Link>
                </Button>
            </div>
        );
    }

    const transactionDetails = [
        {
            icon: <Hash className="w-4 h-4" />,
            label: "Transaction Hash",
            value: transaction.hash,
            component: (
                <div className="flex items-center gap-2">
                    <CopyText value={transaction.hash} >
                        {transaction.hash}
                    </CopyText>
                </div>
            ),
        },
        {
            icon: <Hash className="w-4 h-4" />,
            label: "Block Hash",
            value: transaction.block_hash,
            component: (
                <CopyText href={`/blocks/${transaction.block_hash}`} value={transaction.block_hash}>
                    {transaction.block_hash}
                </CopyText>
            ),
        },
        {
            icon: <Hash className="w-4 h-4" />,
            label: "To",
            value: transaction.to,
            component: (
                <CopyText href={`/transactions/wallet/${transaction.to}`} value={transaction.to}>
                    {transaction.to}
                </CopyText>
            ),
        },
        {
            icon: <Hash className="w-4 h-4" />,
            label: "Contract Address",
            value: transaction.contract_address,
            component: (
                <CopyText value={transaction.contract_address}>{transaction.contract_address}</CopyText>
            ),
        },
        {
            icon: <Hash className="w-4 h-4" />,
            label: "Amount",
            value: transaction.value,
            component: (
                <div className="">
                    {(transaction.value * 1e-18).toFixed(2) + " ETH"}
                </div>
            ),
        },
    ];

    return (
        <div className="container mx-auto p-8 space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/transactions">
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">Transaction Details</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Transaction Information</CardTitle>
                    <CardDescription>
                        <div className="flex items-top justify-between">
                            Detailed information about transaction {transaction.hash}
                            <Separator orientation="vertical" className="mr-2 h-100" />
                            <div className="block text-muted-foreground">
                                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                    <LayersIcon className="w-4 h-4" />
                                    <span className="font-medium">
                                        Index
                                    </span>
                                </div>
                                <div className="flex justify-center">
                                    <Badge variant="outline" className="text-lg font-mono">
                                        {transaction.index}
                                    </Badge>
                                </div>
                            </div>
                            <Separator orientation="vertical" className="mr-2 h-100" />
                            <div className="block text-muted-foreground">
                                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                    <Database className="w-4 h-4" />
                                    <span className="font-medium">
                                        Chain ID
                                    </span>
                                </div>
                                <div className="flex justify-center">
                                    <Badge className="text-lg font-mono">{transaction.chain_id}</Badge>
                                </div>
                            </div>
                            <Separator orientation="vertical" className="mr-2 h-100" />

                        </div>
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="space-y-6">
                        {transactionDetails.map((detail, index) => (
                            <div key={detail.label}>
                                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                    {detail.icon}
                                    <span className="font-medium">{detail.label}</span>
                                </div>
                                <div className="pl-6">
                                    {detail.component}
                                </div>
                                {index < transactionDetails.length - 1 && (
                                    <Separator className="my-4" />
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}