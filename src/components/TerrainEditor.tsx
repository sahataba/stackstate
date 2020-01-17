import React from 'react';

import Terrain from '../game/Terrain';
import Position from '../game/Position';
import solve from '../game/Solve';
import { CellType, Edge, ALL_CELL_TYPES, ALL_EDGES } from '../game/types';

import _ from 'lodash';

interface EditorProps {
    size: number
}

interface EditorState {
    terrain: Terrain
    selector: CellType | Edge
    solution: Position[]
    error: string | null
}
  
export default class TerrainEditor extends React.Component<EditorProps, EditorState> {

    state: EditorState = {
        terrain: new Terrain(this.props.size),
        selector: "start",
        solution: [],
        error: null
    }

    private cellSize = 20;

    private setSelector(selector: CellType | Edge) {
        this.setState({selector});
    }

    private solve() {
        const result = solve(this.state.terrain);
        if (result instanceof Array) {
            this.setState({solution: result})
        } else {
            this.setState({error: result, solution: []})
        }
    }

    private handleCellClick(position: Position) {
        if (this.state.selector === "start" || this.state.selector === "end") {
            this.setState((prevState) => {
                prevState.terrain.setEdge(position, this.state.selector as Edge)
                return {terrain: prevState.terrain};
            });
        } else if (this.state.selector as CellType) {
            this.setState((prevState) => {
                prevState.terrain.addCell(position, this.state.selector as CellType)
                return {terrain: prevState.terrain};
            });
        }
    }

    private renderCell(position: Position) {
        let startEndLabel = "";
        let cellColor = "blue";
        let wormholeColor = null;
        if (this.state.terrain.isCellType(position, "enter")) {
            wormholeColor = "gold";
        }
        if (this.state.terrain.isCellType(position, "exit")) {
            wormholeColor = "silver";
        }
        if (this.state.terrain.isCellType(position, "boulder")) {
            cellColor = "red";
        }
        if (this.state.terrain.isCellType(position, "gravel")) {
            cellColor = "brown";
        }
        if (_.isEqual(this.state.terrain.start, position)) {
            startEndLabel = "S";
        }
        if (_.isEqual(this.state.terrain.end, position)) {
            startEndLabel = "E";
        }
        return <g onClick={() => this.handleCellClick(position)}>
                <rect
                    x={this.cellSize * position.x}
                    y={this.cellSize * position.y}
                    width={this.cellSize}
                    height={this.cellSize}
                    style={{fill:cellColor, stroke: 'black'}}
                />
                {wormholeColor ? <circle
                    cx={this.cellSize * position.x + this.cellSize / 2}
                    cy={this.cellSize * position.y + this.cellSize / 2}
                    r={this.cellSize / 4}
                    fill={wormholeColor}
                /> : null}
                <text
                    x={this.cellSize * position.x}
                    y={this.cellSize * position.y + this.cellSize}
                    fill="black">{startEndLabel}
                </text>
            </g>
    }

    private renderGrid() {
        const positions = this.state.terrain.allPositions;
        const points = this.state.solution.map(p => {
            return `${this.cellSize * p.x + this.cellSize / 2},${this.cellSize * p.y + this.cellSize / 2}`
        }).join(" ");
        const sideLength = this.cellSize * this.props.size
        return <svg height={sideLength} width={sideLength}>
                {positions.map(position => this.renderCell(position))}
                <polyline
                    points={points}
                    stroke="yellow"
                    fill="none"
                />
               </svg>
    }

    private renderSelector(cellType: CellType | Edge) {
        return <button onClick={() => this.setSelector(cellType)}>{cellType}</button>;
    }

    render() {
       return <div>
            {ALL_EDGES.map(e => this.renderSelector(e))}
            {ALL_CELL_TYPES.map(c => this.renderSelector(c))}
            <button onClick={() => this.solve()}>solve</button>
            {this.renderGrid()}
            {this.state.error ? <div>{this.state.error}</div> : null}
       </div> 
    }
}