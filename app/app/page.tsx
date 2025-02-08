import ShortHash from "@/components/shortHash";
import { Block } from "@/utils/api";
import React from "react";
import TransactionPage from "./transactions/page";
import BlockPage from "./blocks/page";

export async function getLastBlock() {
  const lastBlock : Block = await fetch("http://backend:8000/api/blocks/last/")
  .then((res) => res.json())
  .catch((e) => null);
  return lastBlock;
}

export default async function Home() {
  const lastBlock = await getLastBlock();

  return (
    <div className="block text-center">
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <h1 className="text-2xl font-bold">Welcome to BlockBlock</h1>
        <p className="text-gray-500">BlockBlock is an Ethereum blockchain explorer</p>
        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
          <div className="aspect-video flex items-center justify-center flex-col rounded-xl bg-muted/50 p-4">
            <h2 className="font-bold">Last Block Number</h2>
            <p className="text-xl text-bold">{lastBlock.number}</p>
          </div>
          <div className="aspect-video flex items-center justify-center flex-col rounded-xl bg-muted/50 p-4">
            <h2 className="font-bold">Last Block</h2>
            <ShortHash hash={lastBlock.hash}/>
            <span>Transaction Count: {lastBlock.transaction_count}</span>
          </div>
        </div>
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <div className="aspect-video flex items-center justify-center flex-col rounded-xl bg-muted/50 p-4">
            <TransactionPage />
          </div>
          <div className="aspect-video flex items-center justify-center flex-col rounded-xl bg-muted/50 p-4">
            <BlockPage />
          </div>
        </div>
      </div>
    </div>
  );
}
