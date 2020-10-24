import React, { Component } from 'react';

class TimeInput extends Component {
    render() {
        return (
            <div id="timerInput">
                <input type="number" min="0" max="99" disabled={this.props.enableMin} value={this.props.valueMin} onChange={this.props.handleChangeMin} />
                <span>:</span>
                <input type="number" min="1" max="59" disabled={this.props.enableSec} value={this.props.valueSec} onChange={this.props.handleChangeSec} />
            </div>
        );
    }
}

export default TimeInput;