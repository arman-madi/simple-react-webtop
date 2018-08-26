import React, { Component } from 'react';
import './Desktop.css';

class Desktop extends Component {
    render() {
        return (
            <div className="desktop">
                {this.props.children}
            </div>
        );
    }
}

export default Desktop;