import React, { Component } from 'react';
import './Taskbar.css';

class Taskbar extends Component {
    render() {
        return (
            <div className="taskbar">
                {this.props.children}
            </div>
        );
    }
}

export default Taskbar;