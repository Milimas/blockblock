export interface Block {
    hash: string;
    chain_id: number;
    number: number;
    time: number;
    created_at: number;
  }
  
  export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
  }
  
  export async function fetchBlocks(page: number = 1): Promise<PaginatedResponse<Block>> {
    const response = await fetch(`http://localhost:8000/api/blocks/?page=${page}`);
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }
    return await response.json();
  }