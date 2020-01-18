import { Position , nodeId} from './Position';
import { CellType, Edge } from './types';

export default class Terrain {

    size: number;
    cells: Map<string, CellType>;
    exits: Set<string>;
    start: Position | null;
    end: Position | null;
    allPositions: Position[];

    constructor(size: number) {
        this.size = size;
        this.cells = new Map<string, CellType>();
        this.exits = new Set<string>();
        this.start = null;
        this.end = null;
        this.allPositions = this.generateAllPositions(size);
    }

    private generateAllPositions(size: number): Position[] {
        const all = new Array<Position>();
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x ++) {
                const p: Position = [x, y];
                all.push(p)
            }
        }
        return all;
    }

    addCell(position: Position, celltype: CellType) {
        if (celltype === "normal") {
            this.cells.delete(nodeId(position))
        } else {
            this.cells = this.cells.set(nodeId(position), celltype);
        }  
        if(celltype !== "exit") {
            this.exits.delete(nodeId(position))
        } else {
            this.exits.add(nodeId(position))
        }
    }

    isCellType(position: Position, celltype: CellType): boolean {
        return this.cells.get(nodeId(position)) === celltype;
    }

    setEdge(position: Position, edge: Edge) {
        if (edge === "start") {
            this.start = position;
        } else {
            this.end = position;
        }
    }

    private inTerrain(position: Position): boolean {
        return position[0] < this.size && position[1] < this.size && position[0] >= 0 && position[1] >= 0;
    }

    neighbors(position: Position): Position[] {
        const neigh = [
            [position[0] - 1, position[1]] as Position,
            [position[0] + 1, position[1]] as Position,
            [position[0], position[1] - 1] as Position,
            [position[0], position[1] + 1] as Position,
        ]
        return neigh.filter(p => this.inTerrain(p))
    }
}