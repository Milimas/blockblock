"use client";

import * as React from "react";
import CopyText from "./copy-button";

export function shortHash(hash: string): string{
    const size = 20;
    if (hash.length < size) {
      return hash;
    }
    const firstPart = hash.slice(0,  size / 2);
    const lastPart = hash.slice(-size / 2);
    return `${firstPart}-${lastPart}`;
  }

export default function ShortHash({ hash, href }: { hash: string, href: string }) {
    if (!hash) {
      return null;
    }
    return <CopyText value={hash} href={href}>{shortHash(hash)}</CopyText>;
}