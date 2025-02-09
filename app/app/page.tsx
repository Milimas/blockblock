import ShortHash from "@/components/shortHash";
import { Block } from "@/utils/api";
import React from "react";
import TransactionsCard from "@/components/transaction/transactions-card";
import BlocksCard from "@/components/block/blocks-card";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatWeiToEth } from "@/components/wallet-balance";
import LastBlock from "@/components/block/last-block";

export async function getLastBlock() {
  const lastBlock: Block = await fetch("http://backend:8000/api/blocks/last/")
    .then((res) => res.json())
    .catch((e) => null);
  return lastBlock;
}

export async function getTotalTransactions() {
  const totalTransactions = await fetch("http://backend:8000/api/transactions/count/")
    .then((res) => res.json())
    .catch((e) => null);
  return totalTransactions;
}

export async function getChainID() {
  const chainID = await fetch("http://geth:8545", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "eth_chainId",
      params: [],
      id: 1,
    }),
  })
    .then((res) => res.json())
    .catch((e) => null);
  return parseInt(chainID?.result, 16);
}

export async function getGasPrice() {
  const gasPrice = await fetch("http://geth:8545", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "eth_gasPrice",
      params: [],
      id: 1,
    }),
  })
    .then((res) => res.json())
    .catch((e) => null);
  return gasPrice?.result;
}

export default async function Home() {
  const totalTransactions = await getTotalTransactions();
  const chainID = await getChainID();
  const gasPrice = await getGasPrice();

  return (
    <div className="block text-center">
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <h1 className="text-2xl font-bold">Welcome to BlockBlock</h1>
        <p className="text-gray-500">BlockBlock is an Ethereum blockchain explorer</p>
        <div className="grid auto-rows-min gap-4 auto-cols md:grid-cols-4">
          <LastBlock />
          <Card>
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
              <CardDescription>Chain ID: {chainID}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <div className="inline-block">
                  Gas Price: {formatWeiToEth(gasPrice)} ETH
                </div>
                <div className="inline-block">
                  Total Transactions: {totalTransactions.count}
                </div>
              </div>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground flex items-center justify-center">
            </CardFooter>
          </Card>

        </div>
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <TransactionsCard />
          <BlocksCard />
        </div>
      </div>
    </div >
  );
}
