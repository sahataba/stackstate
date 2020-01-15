import createGraph from 'ngraph.graph';
import path from 'ngraph.path';

class Position {
    x: number;
    y: number;
    constructor(x: number, y:number) {
        this.x = x;
        this.y = y;
    }
    nodeId(): string {
        return `${this.x}-${this.y}`;
    }
}

class Terrain {
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

export default class Columbo {
    greet() {

        const terrain = new Terrain(4);
        
        let boulders = new Set<string>();
        boulders.add(new Position(2, 1).nodeId());
        boulders.add(new Position(2, 2).nodeId());

        let terr = [
            ['o', '_', '_', 'e'],
            ['_', 'g', 'b', '_'],
            ['s', 'g', 'b', 'o'],
            ['_', 'i', '_', '_'],
        ];

        let graph = createGraph();

        debugger;
        for (var x = 0; x < terrain.size; x++) {
            for (var y = 0; y < terrain.size; y ++) {
                const p = new Position(x, y);
                const neighbors = terrain.neighbors(p);
                neighbors.forEach(n => {
                    if(!boulders.has(n.nodeId()) && !boulders.has(p.nodeId())) {
                        graph.addLink(p.nodeId(), n.nodeId(), {weight: 1});
                    }
                })
            }
        }

        let pathFinder = path.aStar(graph, {
        // We tell our pathfinder what should it use as a distance function:
        distance(fromNode, toNode, link) {
            // We don't really care about from/to nodes in this case,
            // as link.data has all needed information:
            return link.data.weight;
        }
        });

        const start = new Position(0, 2);
        const end = new Position(3, 0);
        let path2 = pathFinder.find(start.nodeId(), end.nodeId());

        console.log(path2);

        return "Hello, ";
    }
}