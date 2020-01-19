import React from 'react';

import './TerrainEditor.css';

import Selector from './Selector';

import Terrain from '../game/Terrain';
import { Position } from '../game/Position';
import { solve, SolveError } from '../game/Solve';
import { CellType, Edge } from '../game/types';
import { getColor } from './Colors';

import _ from 'lodash';

interface EditorProps {
    size: number
}

interface EditorState {
    terrain: Terrain
    selector: CellType | Edge
    solution: Position[]
    error: SolveError | null
}
 
export default class TerrainEditor extends React.Component<EditorProps, EditorState> {

    state: EditorState = {
        terrain: new Terrain(this.props.size),
        selector: "start",
        solution: [],
        error: null
    }

    constructor(props: EditorProps) {
        super(props);
        this.selectorChanged = this.selectorChanged.bind(this);
    }

    private cellSize = 30;

    private selectorChanged(selector: CellType | Edge) {
        this.setState({selector});
    }

    private solve() {
        const result = solve(this.state.terrain);
        if (result instanceof Array) {
            this.setState({solution: result, error: null})
        } else {
            this.setState({error: result, solution: []})
        }
    }

    private handleEdgeClick(position: Position, edge: Edge) {
        this.setState((prevState) => {
            prevState.terrain.setEdge(position, edge)
            return {terrain: prevState.terrain};
        });
    }

    private handleTerrainClick(position: Position, celltype: CellType) {
        this.setState((prevState) => {
            prevState.terrain.addCell(position, celltype)
            return {terrain: prevState.terrain};
        });
    }

    private handleCellClick(position: Position) {
        switch(this.state.selector) {
            case "start": return this.handleEdgeClick(position, "start")
            case "end": return this.handleEdgeClick(position, "end")
            case "enter": return this.handleTerrainClick(position, "enter")
            case "exit": return this.handleTerrainClick(position, "exit")
            case "boulder": return this.handleTerrainClick(position, "boulder")
            case "gravel": return this.handleTerrainClick(position, "gravel")
            case "normal": return this.handleTerrainClick(position, "normal")
        }
    }

    private renderCell(position: Position) {

        let startEndLabel: "S" | "E" | null = null;
        let cellColor: string = getColor("normal");
        let wormholeColor: string | null = null;

        if (this.state.terrain.getCellType(position) === "enter") {
            wormholeColor = getColor("enter");
        }
        if (this.state.terrain.getCellType(position) === "exit") {
            wormholeColor = getColor("exit");
        }
        if (this.state.terrain.getCellType(position) === "boulder") {
            cellColor = getColor("boulder");
        }
        if (this.state.terrain.getCellType(position) === "gravel") {
            cellColor = getColor("gravel");
        }
        if (_.isEqual(this.state.terrain.start, position)) {
            startEndLabel = "S";
        }
        if (_.isEqual(this.state.terrain.end, position)) {
            startEndLabel = "E";
        }
        return <g onClick={() => this.handleCellClick(position)}>
                <rect
                    x={this.cellSize * position[0]}
                    y={this.cellSize * position[1]}
                    width={this.cellSize}
                    height={this.cellSize}
                    style={{fill:cellColor, stroke: 'black'}}
                />
                {wormholeColor ? <circle
                    cx={this.cellSize * position[0] + this.cellSize / 2}
                    cy={this.cellSize * position[1] + this.cellSize / 2}
                    r={this.cellSize / 4}
                    fill={wormholeColor}
                /> : null}
                {startEndLabel ? <text
                    x={this.cellSize * position[0]}
                    y={this.cellSize * position[1] + this.cellSize}
                    fill="black">{startEndLabel}
                </text>: null}
            </g>
    }

    private renderGrid() {
        const positions = this.state.terrain.allPositions;
        const points = this.state.solution.map(p => {
            return `${this.cellSize * p[0] + this.cellSize / 2},${this.cellSize * p[1] + this.cellSize / 2}`
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

    render() {
       return <div>
           <div id="inner">
                <div>
                    <h1>Path finder</h1>
                    <h3>Legend</h3>
                    <p>
                        Choose a terrain cell type, and place it on grid by clicking desired position.
                    </p>
                    <Selector initial="start" onChanged={this.selectorChanged}/>
                </div>
                <div>
                    {this.renderGrid()}
                </div>
                <div>
                    <button onClick={() => this.solve()}>solve</button>
                    {this.state.error ? <div>{this.state.error}</div> : null}
                </div>
            </div>
        </div>
    }
}