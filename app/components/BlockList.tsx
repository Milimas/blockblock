"use client";

import { useEffect, useState } from 'react';
import { Block, fetchBlocks } from '../utils/api';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Alert } from "@/components/ui/alert"


export default function BlockList() {
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

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Blocks</h2>
      {error && <Alert variant="destructive">{error}</Alert>}
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Hash</TableCell>
            <TableCell>Number</TableCell>
            <TableCell>Chain ID</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blocks.map(block => (
            <TableRow key={block.hash}>
              <TableCell>{block.hash}</TableCell>
              <TableCell>{block.number}</TableCell>
              <TableCell>{block.chain_id}</TableCell>
              <TableCell>{new Date(block.time * 1000).toLocaleString()}</TableCell>
              <TableCell>{new Date(block.created_at * 1000).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between mt-4">
        <Button onClick={() => setPage(page => Math.max(page - 1, 1))} disabled={page === 1}>
          Previous
        </Button>
        <Button onClick={() => setPage(page => page + 1)}>Next</Button>
      </div>
    </div>
  );
}