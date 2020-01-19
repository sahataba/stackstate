import { CellType, Edge } from '../game/types';

export type CellColor = "blue" | "red" | "brown"
export type WormholeColor = "gold" | "silver"

export function getColor(cellType: CellType | Edge): CellColor | WormholeColor | "black" {
    switch(cellType) {
        case "enter": return "gold"
        case "exit": return "silver"
        case "boulder": return "red"
        case "gravel": return "brown"
        case "normal": return "blue"
        default: return "black"
    }
}