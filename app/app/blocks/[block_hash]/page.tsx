import CopyText from "@/components/copy-button"
import { Block } from "@/utils/api"
import ShortHash, { shortHash } from "@/components/shortHash"
import Link from 'next/link'

export async function generateStaticParams() {
  const blocks: Block[] = await fetch('http://localhost:8000/api/blocks').then((res) => res.json())
    .catch((e) => [])

  return blocks.map((block) => ({
    hash: String(block.hash),
  }))
}

  export default async function Page({
    params,
  }: {
    params: Promise<{ hash: string }>
  }) {
  const hash = (await params).block_hash
  console.log("Hash", hash);

  const block: Block = await fetch(`http://backend:8000/api/blocks/${hash}/`).then(
    (res) => res.json()
  ).catch((e) => [])

  return (
    <>
      {block.hash ? (
        <div className="p-8 flex space-y-4 flex-col">
          <h1>Block</h1>
          <div>
            <ShortHash hash={block.hash} />
          </div>
          <div>
            <span>Number: </span>
            <span>{block.number}</span>
          </div>
          <div>
            <span>Chain ID: </span>
            <span>{block.chain_id}</span>
          </div>
          <div>
            <span>Time: </span>
            <span>{new Date(block.time * 1000).toLocaleString()}</span>
          </div>
          <Link href={`/blocks/${block.hash}/transactions`}>View Transactions</Link>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold">block found</h1>
          <p className="text-gray-500">There is no block <ShortHash value={hash}/> to display</p>
        </div>
      )}
    </>
  )
}