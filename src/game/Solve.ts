import createGraph from 'ngraph.graph';
import path from 'ngraph.path';
import { Position, nodeId } from './Position';
import Terrain from './Terrain';

export type SolveError = "No start position" | "No end position" | "Cannot find path"

export function  solve(terrain: Terrain): Position[] | SolveError {
        
    if (!terrain.start) {return "No start position";}
    if (!terrain.end) {return "No end position";}

    const start = terrain.start
    const end = terrain.end

    let graph = createGraph();

    terrain.allPositions.forEach(p => {

        graph.addNode(nodeId(p), p);

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
                graph.addLink(nodeId(p), nodeId(n), {weight});
            }
        })

        if(terrain.isCellType(p, "enter")) {
            terrain.exits.forEach(id => {
                if(nodeId(p) !== id) {
                    graph.addLink(nodeId(p), id, {weight: 0})
                }
            })
        }
    })
    
    let pathFinder = path.aStar(graph, {distance(fromNode, toNode, link) {return link.data.weight;}});

    let solution = pathFinder.find(nodeId(start), nodeId(end));
    if (solution.length === 0) {
        return "Cannot find path";
    } else {
        return solution.map(n => n.data);
    }
}