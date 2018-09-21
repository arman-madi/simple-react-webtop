import React, { Component } from 'react';
import './window.css';

class Window extends Component {
    
    styleTop = 0
    styleLeft = 0

    constructor(props){
        super(props)
        this.state = {isMaximized:false, isMinimized:false}
    }

    unmountMe() {
        // That would be better to use a store pattern (such as flux, redux, mobix), rather than relying on parent method.
        if(this.props.unmountMe){
            this.props.unmountMe(this.props.id)
        }else{
            console.log("Since parent has not defined an unmountMe method, closing the window does not work.")
        }
    }

    maximize() {
        let attrs = this.props.attributes
        if (!this.state.isMaximized){
            this.styleTop = attrs.style.top
            this.styleLeft = attrs.style.left
            attrs.style = {...attrs.style, top:0, left:0}
        }else{
            attrs.style = {...attrs.style, top:this.styleTop, left:this.styleLeft}
        }

        this.setState({isMaximized:!this.state.isMaximized})
    }

    minimize() {
        this.setState({isMinimized:!this.state.isMinimized})
        if(this.props.onChange)
            this.props.onChange("minimized", this.props.id)
    }

    render() {

        return (
            <div className={"window maximized-"
                +(this.state.isMaximized?"on":"off")
                +" minimized-"
                +(this.state.isMinimized?"on":"off")} {...this.props.attributes}>
            <div className="header">
                <span className="title">{this.props.title}</span>
                <button className="close" onClick={()=>this.unmountMe()}/>
                <button className="maximize" onClick={()=>this.maximize()}/>
                <button className="minimize" onClick={()=>this.minimize()}/>
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