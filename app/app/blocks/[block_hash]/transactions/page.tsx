import { columns } from "@/app/transactions/columns"
import { DataTable } from "@/components/data-table"
import CopyText, { CopyButton } from "@/components/copy-button"
import { Transaction } from "@/utils/api"
import ShortHash, { shortHash } from "@/components/shortHash"
 
export async function generateStaticParams() {
  const transactions: Transaction[] = await fetch('http://backend:8000/api/blocks/').then((res) => res.json())
  .catch((e) => [])
  
  if (!transactions.length) {
    return []
  }
  return transactions.map((transactions) => ({
    hash: String(transactions.hash),
  }))
}
 
export default async function Page({
  params,
}: {
  params: Promise<{ hash: string }>
}) {
  const hash = (await params).block_hash
  console.log("Hash", hash);
  
  const transactions: Transaction = await fetch(`http://backend:8000/api/blocks/${hash}/transactions/`).then(
    (res) => res.json()
  ).then((data) => data.results)
  .catch((e) => [])
  console.log("Transactions", transactions);
  
  return (
    <>
      { transactions.length > 0 ? (
        <div className="">
            <DataTable columns={columns} data={transactions} />
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold">transactions found</h1>
          <p className="text-gray-500">There is no transactions <ShortHash value={hash}/> to display</p>
        </div>
      )}
    </>
  )
}