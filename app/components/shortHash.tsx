"use client";

import * as React from "react";
import CopyText from "./copy-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function shortHash(hash: string, size: number): string {
  const _size = size || 20;
  if (hash.length < _size) {
    return hash;
  }
  const firstPart = hash.slice(0, _size / 2);
  const lastPart = hash.slice(-_size / 2);
  return `${firstPart}-${lastPart}`;
}

export default function ShortHash({ hash, href, size }: { hash: string, href: string, size: number }) {
  if (!hash) {
    return null;
  }
  return (
    <CopyText value={hash} href={href}>
      <TooltipProvider delayDuration={500} skipDelayDuration={100}>
        <Tooltip>
          <TooltipTrigger>
            {shortHash(hash, size)}
          </TooltipTrigger>
          <TooltipContent>
            <p>{hash}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </CopyText>
  );
}