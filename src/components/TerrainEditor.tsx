import React from 'react';
import Terrain from '../game/Terrain';
import Position from '../game/Position';
import Columbo from '../game/Columbo';
import _ from 'lodash';

interface EditorProps {
    size: number
}

interface EditorState {
    terrain: Terrain
    selector: string
    solution: Position[]
}
  
export default class TerrainEditor extends React.Component<EditorProps, EditorState> {

    state: EditorState = {
        terrain: new Terrain(this.props.size),
        selector: "start",
        solution: []
    }

    cellSize = 20;

    setSelector(selector: string) {
        this.setState({selector});
    }

    solve() {
        const solution = new Columbo().solve(this.state.terrain);
        if (solution instanceof Array) {
            this.setState({solution})
        }
    }

    handleCellClick(position: Position) {
        if (this.state.selector === "start") {
            this.setState((prevState) => {
                prevState.terrain.setStart(position)
                return {terrain: prevState.terrain};
            });
        }
        if (this.state.selector === "end") {
            this.setState((prevState) => {
                prevState.terrain.setEnd(position)
                return {terrain: prevState.terrain};
            });
        }
        if (this.state.selector === "boulder") {
            this.setState((prevState) => {
                prevState.terrain.addBoulder(position)
                return {terrain: prevState.terrain};
            });
        }
    }

    renderCell(position: Position) {
        let startEndLabel = "";
        let cellColor = "blue";
        if (this.state.terrain.hasBoulder(position)) {
            cellColor = "red";
        }
        if (_.isEqual(this.state.terrain.start, position)) {
            startEndLabel = "S";
        }
        if (_.isEqual(this.state.terrain.end, position)) {
            startEndLabel = "E";
        }
        return <g>
                <rect
                    x={this.cellSize * position.x}
                    y={this.cellSize * position.y}
                    width={this.cellSize}
                    height={this.cellSize}
                    style={{fill:cellColor, stroke: 'black'}}
                    onClick={() => this.handleCellClick(position)}
                />
                <text
                    x={this.cellSize * position.x}
                    y={this.cellSize * position.y + this.cellSize}
                    fill="black">{startEndLabel}
                </text>
            </g>
    }

    renderGrid() {
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

    render() {
       return <div>
           <button onClick={() => this.setSelector("start")}>start</button>
           <button onClick={() => this.setSelector("end")}>end</button>
           <button onClick={() => this.setSelector("boulder")}>boulder</button>
           <button onClick={() => this.solve()}>solve</button>
           {this.renderGrid()}
       </div> 
    }
}