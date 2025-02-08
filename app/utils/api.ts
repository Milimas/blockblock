export interface Block {
    hash: string;
    chain_id: number;
    number: number;
    time: number;
    created_at: number;
    transaction_count: number;
  }

  export interface Transaction {
    hash: string;
    block_hash: string;
    from_address: string;
    to_address: string;
    amount: string;
    created_at: number;
  }
  
  export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
  }
  
  export async function fetchBlocks(page: number = 1): Promise<PaginatedResponse<Block>> {
    const response = await fetch(`http://localhost:8000/api/blocks/?ordering=-created_at&page=${page}`);
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }
    return await response.json();
  }

  export async function fetchBlock(hash: string): Promise<Block> {
    const response = await fetch(`http://localhost:8000/api/blocks/${hash}/`);
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }
    return await response.json();
  }

  export async function fetchTransaction(blockHash: string): Promise<Transaction[]> {
    const response = await fetch(`http://localhost:8000/api/blocks/${blockHash}/transactions/`);
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }
    return await response.json();
  }

  export async function fetchTransactions(page: number = 1): Promise<PaginatedResponse<Transaction>> {
    const response = await fetch(`http://localhost:8000/api/transactions/?page=${page}`);
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }
    return await response.json();
  }

  export async function fetchWallet(wallet_address: string, page: number = 1): Promise<PaginatedResponse<Transaction>> {
    const response = await fetch(`http://localhost:8000/api/wallets/${wallet_address}/?page=${page}`);
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }
    return await response.json();
  }