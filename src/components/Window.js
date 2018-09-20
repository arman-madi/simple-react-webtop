import React, { Component } from 'react';
import './window.css';

class Window extends Component {
    render() {
        return (
            <div className="window" {...this.props.attributes}>
            <div className="header">
                <span className="title">{this.props.title}</span>
                <button className="close"/>
                <button className="maximize"/>
                <button className="minimize"/>
            </div>
            <div className="content">
                {this.props.children}
            </div>
            </div>
        );
    }
}

export default Window;