'use client';

import React from 'react';
import { Copy, ClipboardCheck } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

interface CopyTextProps {
  children: React.ReactNode;
  value: string;
  href?: string;
}

const CopyText: React.FC<CopyTextProps> = ({ children, value, href }: CopyTextProps) => {
  const [buttonVisible, setButtonVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
        setTimeout(() => {
          setCopied(false);
          setButtonVisible(false);
        }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const onMouseEnter = () => {
    setButtonVisible(true);
  }

    const onMouseLeave = () => {
      if (!copied)
        setButtonVisible(false);
    }

  return (
    <div className="flex space-x-2"
        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {href ? <Link href={href}>{ children }</Link> : <span>{ children }</span>}
      <button onClick={copyToClipboard} className={`${buttonVisible ? 'visible' : 'invisible'}`}>
        {copied ? <ClipboardCheck size={16} strokeWidth={1.25} /> : <Copy size={16} strokeWidth={1.25} />}
      </button>
    </div>
  );
};

export default CopyText;