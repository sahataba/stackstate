import createGraph from 'ngraph.graph';
import path from 'ngraph.path';

import { Position } from './Position';
import Terrain from './Terrain';

import _ from 'lodash';

export type SolveError = "No start position" | "No end position" | "Cannot find path"

function nodeId(p: Position): string { return  `${p[0]}-${p[1]}`}

function getWeigth(c: "normal" | "gravel" | "enter" | "exit"): number {
    switch(c) {
        case "normal": return 1
        case "gravel": return 2
        case "enter": return 0
        case "exit": return 0
    }
}

export function calcWeight(
    p: "normal" | "gravel" | "enter" | "exit",
    n: "normal" | "gravel" | "enter" | "exit") {
    return getWeigth(p) * 0.5 + getWeigth(n) * 0.5;
}

export function  solve(terrain: Terrain): Position[] | SolveError {
        
    if (!terrain.start) {return "No start position";}
    if (!terrain.end) {return "No end position";}

    const start = terrain.start
    const end = terrain.end

    let graph = createGraph();

    terrain.allPositions.forEach(current => {

        graph.addNode(nodeId(current), current);

        const currentTyp = terrain.getCellType(current)

        const neighbors = terrain.neighbors(current);
        neighbors.forEach(next => {
            const nextTyp = terrain.getCellType(next)
            if(!(nextTyp === "boulder") && !( currentTyp === "boulder")) {
                const weight = calcWeight(nextTyp, currentTyp);
                graph.addLink(nodeId(current), nodeId(next), {weight});
            }
        })

        if(currentTyp === "enter") {
            terrain.getExits().forEach(exit => {
                if(!_.isEqual(current, exit)) {
                    graph.addLink(nodeId(current), nodeId(exit), {weight: 0})
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