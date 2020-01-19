import React from 'react';

import { CellType, Edge, ALL_CELL_TYPES, ALL_EDGES } from '../game/types';
import { getColor } from './Colors';

interface SelectorProps {
    initial: CellType | Edge
    onChanged: (cell: CellType | Edge) => void
}

interface SelectorState {
    selector: CellType | Edge
}
  
export default class Selector extends React.Component<SelectorProps, SelectorState> {

    state: SelectorState = {
        selector: this.props.initial
    }

    private setSelector(selector: CellType | Edge) {
        this.setState({selector});
        this.props.onChanged(selector)
    }

    private renderSelector(cellType: CellType | Edge) {
        return <label>
                <input
                    type="radio"
                    name="selector"
                    value={cellType}
                    checked={cellType === this.state.selector}
                    onClick={() => this.setSelector(cellType)}/>
                <span style={{color:getColor(cellType)}}>{cellType}</span>
            </label>
    }

    render () {
        return <div>
            {ALL_EDGES.map(e => this.renderSelector(e))}
            {ALL_CELL_TYPES.map(c => this.renderSelector(c))}
        </div>
    }
    
}