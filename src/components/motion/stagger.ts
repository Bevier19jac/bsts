/** Index-based reveal delay for staggered groups. Safe on server and client. */
export function staggerDelay(index: number, base = 0.08): number {
  return Math.min(index * base, 0.5);
}
