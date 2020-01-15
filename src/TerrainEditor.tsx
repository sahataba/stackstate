import React from 'react';
import Terrain from './Terrain';
import Position from './Position';
import Columbo from './Columbo';
import _ from 'lodash';

interface EditorProps {
    size: number
}

interface EditorState {
    terrain: Terrain
    selector: string
}
  
export default class TerrainEditor extends React.Component<EditorProps, EditorState> {

    state: EditorState = {
        terrain: new Terrain(this.props.size),
        selector: "start"
    }

    cellSize = 20;

    setSelector(selector: string) {
        this.setState({selector});
    }

    solve() {
        const res = new Columbo().solve(this.state.terrain);
        console.log(res) 
    }

    handleCellClick(position: Position) {
        if (this.state.selector === "start") {
            this.state.terrain.setStart(position);
        }
        if (this.state.selector === "end") {
            this.state.terrain.setEnd(position);
        }
        if (this.state.selector === "boulder") {
            this.state.terrain.addBoulder(position);
        }
    }

    renderCell(position: Position) {
        let startEndLabel = "";
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
                    style={{fill:'blue', stroke: 'black'}}
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
        return <svg>{positions.map(position => this.renderCell(position))}</svg>
    }

    render() {
       return <div>
           <button onClick={() => this.setSelector("start")}>start</button>
           <button onClick={() => this.setSelector("end")}>end</button>
           <button onClick={() => this.setSelector("boulder")}>boulder</button>
           <button onClick={() => this.solve()}>solve</button>
           {this.renderGrid()}
           {JSON.stringify(this.state.terrain)}
       </div> 
    }
}