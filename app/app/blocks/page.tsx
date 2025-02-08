"use client";

import { Block, fetchBlocks } from "@/utils/api";
import { columns } from "./columns"
import { useEffect, useState } from 'react';
import { DataTable } from "./data-table"
import { Button } from "@/components/ui/button"

export default function BlockPage() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBlocks() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchBlocks(page);
        setBlocks(data.results);
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
    loadBlocks();
  }, [page]);
  console.log("Blocks", blocks);
  return (
    <>
      {blocks.length > 0 ? (
        <div className="">
          <DataTable columns={columns} data={blocks} />
          <div className="flex justify-between mt-4">
            <Button onClick={() => setPage(page => Math.max(page - 1, 1))} disabled={page === 1}>
              Previous
            </Button>
            <Button onClick={() => setPage(page => page + 1)}>Next</Button>
          </div>
        </div>
      ) :
        (
          <div className="text-center">
            <h1 className="text-2xl font-bold">No blocks found</h1>
            <p className="text-gray-500">There are no blocks to display</p>
          </div>
          )
      }
    </>
  )
}
