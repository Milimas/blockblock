"use client"

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { DataTable } from "@/components/headless-data-table";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef[] = [
    {
        accessorKey: "hash",
        header: "Hash",
        cell: ({ row }) => <Skeleton className="w-full h-5" />,
    },
    {
        accessorKey: "number",
        header: "Number",
        cell: ({ row }) => <Skeleton className="w-full h-5" />,
    },
    {
        accessorKey: "chain_id",
        header: "Chain ID",
        cell: ({ row }) => <Skeleton className="w-full h-5" />,
    },
    {
        accessorKey: "time",
        header: "Time",
        cell: ({ row }) => <Skeleton className="w-full h-5" />,
    },
    {
        accessorKey: "transaction_count",
        header: "Transaction Count",
        cell: ({ row }) => <Skeleton className="w-full h-5" />,
    },
]

export default function Loading() {


    return (
        <div className="block text-center">
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <h1 className="text-2xl font-bold">Welcome to BlockBlock</h1>
                <p className="text-gray-500">BlockBlock is an Ethereum blockchain explorer</p>
                <div className="grid auto-rows-min gap-4 auto-cols md:grid-cols-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Last Block</CardTitle>
                            <CardDescription>
                                <Skeleton className="w-full h-5" />
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Skeleton className="h-5" />
                                <Skeleton className="h-5" />
                                <Skeleton className="h-5" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Transactions</CardTitle>
                            <CardDescription>
                                <Skeleton className="w-full h-5" />
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Skeleton className="h-5" />
                                <Skeleton className="h-5" />
                                <Skeleton className="h-5" />
                            </div>
                        </CardContent>
                        <CardFooter className="text-sm text-muted-foreground flex items-center justify-center">
                        </CardFooter>
                    </Card>

                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <DataTable columns={columns} data={Array(10).fill({})} />
                    <DataTable columns={columns} data={Array(10).fill({})} />
                </div>
            </div>
        </div >
    );
}