export type Position = [number, number];
export function nodeId(p: Position): string { return  `${p[0]}-${p[1]}`}