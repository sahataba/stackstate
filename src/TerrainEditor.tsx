import React from 'react';
import Terrain from './Terrain';
import Position from './Position';

interface EditorProps {
    size: number
}

interface EditorState {
    terrain: Terrain
}
  
export default class TerrainEditor extends React.Component<EditorProps, EditorState> {

    state: EditorState = {
        terrain: new Terrain(this.props.size)
    }

    cellSize = 20;

    renderCell(position: Position) {
        return <rect
                    x={this.cellSize * position.x}
                    y={this.cellSize * position.y}
                    width={this.cellSize}
                    height={this.cellSize}
                    style={{fill:'blue', stroke: 'black'}}
                />
    }

    render() {
        const positions = this.state.terrain.allPositions();
        return <svg>{positions.map(position => this.renderCell(position))}</svg>
    }
}