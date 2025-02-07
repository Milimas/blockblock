/**
 * Shortens a block hash to the format [first 6 digits]-[last 6 digits].
 * @param hash - The full block hash.
 * @returns The shortened block hash.
 */
export function shortHash(hash: string): string {
    if (hash.length < 12) {
      throw new Error('Hash is too short to be shortened');
    }
    const firstPart = hash.slice(0, 6);
    const lastPart = hash.slice(-6);
    return `${firstPart}-${lastPart}`;
  }