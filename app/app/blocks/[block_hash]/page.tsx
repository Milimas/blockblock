import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import CopyText from "@/components/copy-button";
import { Block } from "@/utils/api";
import ShortHash, { shortHash } from "@/components/shortHash";
import Link from 'next/link';
import { ArrowLeft, Clock, Link as LinkIcon, Hash, Database, LayersIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export async function generateStaticParams() {
  const blocks: Block[] = await fetch('http://localhost:8000/api/blocks')
    .then((res) => res.json())
    .catch((e) => []);
    
  return blocks.map((block) => ({
    hash: String(block.hash),
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ hash: string }>;
}) {
  const hash = (await params).block_hash;
  const block: Block = await fetch(`http://backend:8000/api/blocks/${hash}/`)
    .then((res) => res.json())
    .catch((e) => []);

  if (!block.hash) {
    return (
      <div className="container mx-auto p-8">
        <Alert variant="destructive">
          <AlertTitle>Block Not Found</AlertTitle>
          <AlertDescription>
            The block with hash <ShortHash hash={hash} /> could not be found.
          </AlertDescription>
        </Alert>
        <Button variant="outline" className="mt-4" asChild>
          <Link href="/blocks">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blocks
          </Link>
        </Button>
      </div>
    );
  }

  const blockDetails = [
    {
      icon: <Hash className="w-4 h-4" />,
      label: "Block Hash",
      value: block.hash,
      component: (
        <div className="flex items-center gap-2">
          <ShortHash hash={block.hash} />
          <CopyText value={block.hash} />
        </div>
      ),
    },
    {
      icon: <LayersIcon className="w-4 h-4" />,
      label: "Block Number",
      value: block.number,
      component: (
        <Badge variant="outline" className="text-lg font-mono">
          {block.number.toLocaleString()}
        </Badge>
      ),
    },
    {
      icon: <Database className="w-4 h-4" />,
      label: "Chain ID",
      value: block.chain_id,
      component: (
        <Badge>{block.chain_id}</Badge>
      ),
    },
    {
      icon: <Clock className="w-4 h-4" />,
      label: "Timestamp",
      value: block.time,
      component: (
        <div className="flex flex-col">
          <span className="text-lg">
            {new Date(block.time * 1000).toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground">
            {new Date(block.time * 1000).toUTCString()}
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-8 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/blocks">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Block Details</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Block Information</CardTitle>
          <CardDescription>
            Detailed information about block {block.number.toLocaleString()}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            {blockDetails.map((detail, index) => (
              <div key={detail.label}>
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  {detail.icon}
                  <span className="font-medium">{detail.label}</span>
                </div>
                <div className="pl-6">
                  {detail.component}
                </div>
                {index < blockDetails.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Button asChild>
              <Link href={`/blocks/${block.hash}/transactions`}>
                <LinkIcon className="w-4 h-4 mr-2" />
                View Transactions
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}