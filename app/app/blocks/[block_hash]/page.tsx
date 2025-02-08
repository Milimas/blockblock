import CopyText, { CopyButton } from "@/components/copy-button"
import { Block } from "@/utils/api"
import { shortHash } from "@/utils/shortHash"
 
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
    <main>
      { block ? (
        <div className="p-8 flex space-y-4 flex-col">
          <h1>Block</h1>
          <div>
            <CopyText value={block.hash} >{shortHash(block.hash)}</CopyText>
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
        </div>
      ) : (
        <div>
          <h1>Error</h1>
          <p>Block not found</p>
        </div>
      )}
    </main>
  )
}