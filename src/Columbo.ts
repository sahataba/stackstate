import createGraph from 'ngraph.graph';
import {Node} from 'ngraph.graph';
import path from 'ngraph.path';
import Position from './Position';
import Terrain from './Terrain';

export default class Columbo {
    solve(terrain: Terrain): Node<any>[] | string {
        
        if (!terrain.start || !terrain.end) {
            return "invalid";
        }

        const start = terrain.start
        const end = terrain.end

        let graph = createGraph();

        for (var x = 0; x < terrain.size; x++) {
            for (var y = 0; y < terrain.size; y ++) {
                const p = new Position(x, y);
                const neighbors = terrain.neighbors(p);
                neighbors.forEach(n => {
                    if(!terrain.hasBoulder(n) && !terrain.hasBoulder(p)) {
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

        let solution = pathFinder.find(start.nodeId(), end.nodeId());

        return solution;
    }
}