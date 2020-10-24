import React, { Component } from 'react';

class Timer extends Component {
    render() {
        return (
            <div>
                <span className="time">{this.props.min}</span>
                <span>:</span>
                <span className="time">{this.props.sec}</span>
            </div>
        );
    }
}

export default Timer;