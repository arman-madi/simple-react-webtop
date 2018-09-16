import React, { Component } from 'react';
import './Shortcut.css';

class Shortcut extends Component {
    render() {
        return (
            <div id={this.props.key?this.props.key:'shortcut'} className='shortcut' title='Shortcut' {...this.props.attributes}/>
        );
    }
}

export default Shortcut;