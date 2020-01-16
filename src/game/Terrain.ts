import Position from './Position';
import { CellType, Edge } from './CellType';

class Tile {
    position: Position
    tags: string[]

    constructor(position: Position, tags: string[]) {
        this.position = position
        this.tags = tags
    }
}

export default class Terrain {

    size: number;
    cells: Map<string, CellType>;
    start: Position | null;
    end: Position | null;

    constructor(size: number) {
        this.size = size;
        this.cells = new Map<string, CellType>();
        this.start = null;
        this.end = null;
    }

    allPositions(): Position[] {
        const all = new Array<Position>();
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x ++) {
                const p = new Position(x, y);
                all.push(p)
            }
        }
        return all;
    }

    addCell(position: Position, celltype: CellType) {
        if (celltype === "normal") {
            this.cells.delete(position.nodeId())
        } else {
            this.cells = this.cells.set(position.nodeId(), celltype);
        }  
    }

    isCellType(position: Position, celltype: CellType): boolean {
        return this.cells.get(position.nodeId()) === celltype;
    }

    setEdge(position: Position, edge: Edge) {
        if (edge === "start") {
            this.start = position;
        } else {
            this.end = position;
        }
    }

    inTerrain(position: Position): boolean {
        return position.x < this.size && position.y < this.size && position.x >= 0 && position.y >= 0;
    }

    up(position: Position): Position | null {
        let p = new Position(position.x - 1, position.y);
        return this.inTerrain(p) ? p : null;
    }

    down(position: Position): Position | null {
        let p = new Position(position.x + 1, position.y);
        return this.inTerrain(p) ? p : null;
    }

    left(position: Position): Position | null {
        let p = new Position(position.x, position.y - 1);
        return this.inTerrain(p) ? p : null;
    }

    right(position: Position): Position | null {
        let p = new Position(position.x, position.y + 1);
        return this.inTerrain(p) ? p : null;
    }

    neighbors(position: Position): Position[] {
        const neigh = [
            this.up(position),
            this.down(position),
            this.left(position),
            this.right(position),
        ]
        return neigh.filter(p => p != null) as Position[]; //todo
    }
}