import React, { Component } from 'react';
import './window.css';

class Window extends Component {
    unmountMe() {
        // That would be better to use a store pattern (such as flux, redux, mobix), rather than relying on parent method.
        if(this.props.unmountMe){
            this.props.unmountMe(this.props.id)
        }else{
            console.log("Since parent has not defined an unmountMe method, closing the window does not work.")
        }
    }

    render() {
        return (
            <div className="window" {...this.props.attributes}>
            <div className="header">
                <span className="title">{this.props.title}</span>
                <button className="close" onClick={()=>this.unmountMe()}/>
                <button className="maximize"/>
                <button className="minimize"/>
            </div>
            <div className="content">
                <div>
                    {this.props.children}
                </div>
            </div>
            </div>
        );
    }
}

export default Window;