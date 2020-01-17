import createGraph from 'ngraph.graph';
import path from 'ngraph.path';
import Position from './Position';
import Terrain from './Terrain';

export default function  solve(terrain: Terrain): Position[] | string {
        
    if (!terrain.start || !terrain.end) {
        return "invalid";
    }

    const start = terrain.start
    const end = terrain.end

    let graph = createGraph();

    terrain.allPositions.forEach(p => {

        graph.addNode(p.nodeId, p);

        const neighbors = terrain.neighbors(p);
        neighbors.forEach(n => {
            if(!terrain.isCellType(n, "boulder") && !terrain.isCellType(p, "boulder")) {
                let weight = 1;
                if (terrain.isCellType(p, "gravel")) {
                    weight = weight + 0.5
                }
                if (terrain.isCellType(n, "gravel")) {
                    weight = weight + 0.5
                }
                graph.addLink(p.nodeId, n.nodeId, {weight});
            }
        })

        if(terrain.isCellType(p, "enter")) {
            terrain.exits.forEach(nodeId => {
                if(p.nodeId !== nodeId) {
                    graph.addLink(p.nodeId, nodeId, {weight: 0})
                }
            })
        }
    })
    
    let pathFinder = path.aStar(graph, {distance(fromNode, toNode, link) {return link.data.weight;}});

    let solution = pathFinder.find(start.nodeId, end.nodeId);
    let res = solution.map(n => n.data);
    return res;
}