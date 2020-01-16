import createGraph from 'ngraph.graph';
import path from 'ngraph.path';
import Position from './Position';
import Terrain from './Terrain';

export default class Columbo {
    solve(terrain: Terrain): Position[] | string {
        
        if (!terrain.start || !terrain.end) {
            return "invalid";
        }

        const start = terrain.start
        const end = terrain.end

        let graph = createGraph();

        for (var x = 0; x < terrain.size; x++) {
            for (var y = 0; y < terrain.size; y ++) {
                const p = new Position(x, y);
                graph.addNode(p.nodeId(), p);
                const neighbors = terrain.neighbors(p);
                neighbors.forEach(n => {
                    if(!terrain.isBoulder(n) && !terrain.isBoulder(p)) {
                        let weight = 1;
                        if (terrain.isGravel(p)) {
                            weight = weight + 0.5
                        }
                        if (terrain.isGravel(n)) {
                            weight = weight + 0.5
                        }
                        graph.addLink(p.nodeId(), n.nodeId(), {weight});
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
        let res = solution.map(n => n.data);
        return res;
    }
}