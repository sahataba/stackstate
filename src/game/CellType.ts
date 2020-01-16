export const ALL_CELL_TYPES = ["boulder", "gravel", "enter", "exit", "normal"] as const;
type CellTypeTuple = typeof ALL_CELL_TYPES;
export type CellType = CellTypeTuple[number]

export const ALL_EDGES = ['start', 'end'] as const;
type EdgeTuple = typeof ALL_EDGES;
export type Edge = EdgeTuple[number]