import React, { Component } from 'react';

class Reset extends Component {
    render() {
        return (
            <button id="reset" onClick={this.props.handleReset}>reset</button>
        );
    }
}

export default Reset;