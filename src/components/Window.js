import React, { Component } from 'react';

class Window extends Component {
    render() {
        return (
            <div className="window" {...this.props.attributes}>
                
            </div>
        );
    }
}

export default Window;