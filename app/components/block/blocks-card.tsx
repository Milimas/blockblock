"use client";

import { Block } from "@/utils/api";
import { DataTable } from "@/components/headless-data-table";
import { columns } from '@/components/block/blocks-card-columns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useEffect, useState } from 'react';
import { fetchBlocks } from "@/utils/api";
import { socket } from "@/app/socket";

export default function BlocksCard() {
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (socket.connected) {
            onConnect();
        }

        async function onConnect() {
        }
        
        function onBlocks(msg: string) {
            const data = JSON.parse(msg);
            setBlocks((prev) => [data, ...prev].slice(0, 10)); // Keep last 10 updates
            console.log(data);
            
        }
        
        socket.on('connect', onConnect);
        socket.on('blocks', onBlocks);

        async function loadBlocks() {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchBlocks(1);
                setBlocks(data.results.slice(0, 10));
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
        // setInterval(loadBlocks, 10000);
        loadBlocks();
        return () => {
            socket.off('connect', onConnect);
            socket.off('blocks', onBlocks);
        }
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Last Blocks</CardTitle>
                <CardDescription>Last 10 Blocks</CardDescription>
            </CardHeader>
            <CardContent>
                {loading || blocks.length > 0 ? (
                    <DataTable columns={columns} data={blocks} />
                ) : (
                    <div className="">
                        <h1 className="text-2xl font-bold">No blocks found</h1>
                        <p className="text-gray-500">There are no blocks to display</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}