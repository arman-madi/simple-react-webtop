import React, { Component } from 'react';
import './Shortcut.css';

class Shortcut extends Component {
    render() {
        return (
            <div className='shortcut' title={this.props.title} {...this.props.attributes}>
            <img src={this.props.icon} alt={this.props.title}  />
            </div>
        );
    }
}

export default Shortcut;