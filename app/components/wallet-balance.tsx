"use server";

import React from 'react';
import { Card, CardContent } from './ui/card';

interface WalletBalanceProps {
    walletAddress: string;
}

export const formatWeiToEth = async (weiAmount) => {
    // Convert wei string to BigInt to handle large numbers
    const wei = BigInt(weiAmount);
    // ETH has 18 decimal places
    const divisor = BigInt(10 ** 18);

    // Separate whole and decimal parts
    const wholePart = wei / divisor;
    const decimalPart = wei % divisor;

    // Convert decimal part to string and pad with zeros
    let decimalStr = decimalPart.toString().padStart(18, '0');

    // Remove trailing zeros
    decimalStr = decimalStr.replace(/0+$/, '');

    // If the decimal part is empty, return just the whole number
    if (decimalStr === '') {
        return wholePart.toString();
    }

    // Combine whole and decimal parts
    return `${wholePart}.${decimalStr}`;
};


export const  EthBalanceDisplay = async ({ weiAmount, label }) => {
    const formattedBalance = formatWeiToEth(weiAmount)

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{label || 'Balance'}</p>
                    <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold font-mono">{formattedBalance}</span>
                        <span className="text-sm text-muted-foreground">ETH</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

async function fetchWalletBalance(walletAddress: string): Promise<string> {
    const response = await fetch('http://geth:8545', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'eth_getBalance',
            params: [walletAddress, 'latest'],
            id: 1,
        }),
    });

    const data = await response.json();
    return data.result;
}

export default async function WalletBalance({ walletAddress }: WalletBalanceProps) {
    const balance = await fetchWalletBalance(walletAddress);

    return (
        <EthBalanceDisplay weiAmount={balance} label="Wallet Balance" />
    );
}