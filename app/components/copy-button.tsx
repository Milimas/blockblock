'use client';

import React from 'react';
import { Copy, ClipboardCheck } from 'lucide-react';
import { useState } from 'react';

interface CopyTextProps {
  text: string;
}

const CopyText: React.FC<CopyTextProps> = ({ children, value }: Props) => {
  const [buttonVisible, setButtonVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const onMouseEnter = () => {
    setButtonVisible(true);
  }

    const onMouseLeave = () => {
        setTimeout(() => {
            setButtonVisible(false);
            setCopied(false);
        }, 1000);
    }

  return (
    <div className="flex space-x-2"
        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <p>{ children }</p>
      {buttonVisible && <button onClick={copyToClipboard}>
        {copied ? <ClipboardCheck size={16} strokeWidth={1.25} /> : <Copy size={16} strokeWidth={1.25} />}
        </button>}
    </div>
  );
};

export default CopyText;