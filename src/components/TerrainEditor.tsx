import React from 'react';

import Terrain from '../game/Terrain';
import Position from '../game/Position';
import Columbo from '../game/Columbo';
import { CellType, Edge } from '../game/CellType';

import _ from 'lodash';

interface EditorProps {
    size: number
}

interface EditorState {
    terrain: Terrain
    selector: CellType | Edge
    solution: Position[]
}
  
export default class TerrainEditor extends React.Component<EditorProps, EditorState> {

    state: EditorState = {
        terrain: new Terrain(this.props.size),
        selector: "start",
        solution: []
    }

    private cellSize = 20;

    private setSelector(selector: CellType | Edge) {
        this.setState({selector});
    }

    private solve() {
        const solution = new Columbo().solve(this.state.terrain);
        if (solution instanceof Array) {
            this.setState({solution})
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
        let circleColor = null;
        if (this.state.terrain.isCellType(position, "enter")) {
            circleColor = "gold";
        }
        if (this.state.terrain.isCellType(position, "exit")) {
            circleColor = "silver";
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
                {circleColor ? <circle
                    cx={this.cellSize * position.x + this.cellSize / 2}
                    cy={this.cellSize * position.y + this.cellSize / 2}
                    r={this.cellSize / 4}
                    fill={circleColor}
                /> : null}
                <text
                    x={this.cellSize * position.x}
                    y={this.cellSize * position.y + this.cellSize}
                    fill="black">{startEndLabel}
                </text>
            </g>
    }

    private renderGrid() {
        const positions = this.state.terrain.allPositions();
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

    private allCellTypes: Array<CellType | Edge> = [
        "start",
        "end",
        "boulder",
        "gravel",
        "enter",
        "exit",
        "normal"]

    render() {
       return <div>
           {this.allCellTypes.map(cellType => <button onClick={() => this.setSelector(cellType)}>{cellType}</button>)}
           <button onClick={() => this.solve()}>solve</button>
           {this.renderGrid()}
       </div> 
    }
}