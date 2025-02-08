import { Block } from "@/utils/api";
import { DataTable } from "@/components/headless-data-table";
import { columns } from '@/components/blocks-card-columns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const fetchBlocks = async (page: number): Promise<{ results: Block[] }> => {
    return fetch(`http://backend:8000/api/blocks/?page=1`)
    .then((res) => res.json());
}

export default async function BlocksCard() {
    const blocks = await fetchBlocks(1)
    .then((data) => data.results.slice(0, 10));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Last Blocks</CardTitle>
                <CardDescription>Last 10 Blocks</CardDescription>
            </CardHeader>
            <CardContent>
                {blocks.length > 0 ? (
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