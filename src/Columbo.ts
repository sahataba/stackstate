import createGraph from 'ngraph.graph';
import {Node} from 'ngraph.graph';
import path from 'ngraph.path';
import Position from './Position';
import Terrain from './Terrain';

export default class Columbo {
    solve(): Node<any>[] {

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
        let solution = pathFinder.find(start.nodeId(), end.nodeId());

        console.log(solution);

        return solution;
    }
}