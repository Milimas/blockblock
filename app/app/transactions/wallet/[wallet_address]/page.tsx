import WalletPage from "@/components/wallet";
import WalletBalance from "@/components/wallet-balance";


export default async function Page({
    params,
  }: {
    params: Promise<{ wallet_address: string }>
  }) {
    const wallet_address = (await params).wallet_address
    
    return (
      <>
        <WalletBalance walletAddress={wallet_address} />
        <WalletPage />
      </>
    )
  }
