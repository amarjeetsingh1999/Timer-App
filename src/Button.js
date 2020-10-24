import React, { Component } from 'react';

class Button extends Component {
    render() {
        return (
            <button disabled={this.props.enable} onClick={this.props.handleButton}>{this.props.buttonText}</button>
        );
    }
}

export default Button;