import React, { Component } from 'react';
import './Shortcut.css';

class Shortcut extends Component {
    render() {
        return (
            <div className='shortcut' title='Shortcut' {...this.props.attributes}/>
        );
    }
}

export default Shortcut;