"use client";
import { socket } from "@/app/socket";
import { Block } from "@/utils/api";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import ShortHash from "../shortHash";

export default function LastBlock() {
    const [lastBlock, setLastBlock] = useState<Block | null>(null);
    const [chainID, setChainID] = useState<string | null>(null);

    useEffect(() => {
        socket.on('connect', onConnect);
        socket.on('blocks', onLastBlock);

        async function onConnect() {
            // console.log('connected');
        }

        function onLastBlock(msg: string) {
            const data = JSON.parse(msg);
            setLastBlock(data);
            // console.log(data);
        }

        return () => {
            socket.off('connect', onConnect);
            socket.off('blocks', onLastBlock);
        }
    }, []);
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Last Block</CardTitle>
                <CardDescription>Chain ID: {lastBlock?.chainId}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center">
                    <div className="inline-block">
                        Block Number: {lastBlock?.number}
                    </div>
                    <div className="flex space-between">
                        {`Hash: `}<ShortHash size={10} href="/blocks/last" hash={lastBlock?.hash} />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}