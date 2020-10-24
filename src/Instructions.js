import React, { Component } from 'react';

class Instructions extends Component {
    render() {
        return (
            <p id="instructions">{this.props.instructions}</p>
        );
    }
}

export default Instructions;