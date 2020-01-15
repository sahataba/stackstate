import Position from './Position';

export default class Terrain {
    size: number;
    constructor(size: number) {
        this.size = size;
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