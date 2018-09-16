import React, { Component } from 'react';
import './Desktop.css';

class Desktop extends Component {
    
    componentDidMount() {

    }

    onDragOverHandler(e) {
        e.preventDefault()
    }

    onDropHandler(e) {
        console.log("DROP: " + e)
    }

    render() {
        
        let dragableChildren = React.Children.map(this.props.children, (child)=>{
            if (['Shortcut', 'Window'].indexOf(child.type.name) === -1){
                return child
            }
            return React.cloneElement(child, {
                attributes:{
                    draggable: true, 
                    onDragStart: (e) => {
                        console.log("DRAG START: " + e.target.id)
                        //e.dataTransfer.effectAllowed = 'copy' // only dropEffect='copy' will be dropable
                        // TODO: investigate what is the best data to transfer
                        e.dataTransfer.setData('text/plain', e.target.id)
                    }
            }})
        })

        return (
            <div className="desktop" 
                onDragOver={this.onDragOverHandler}
                onDrop={this.onDropHandler}
            >
                {dragableChildren}
            </div>
        );
    }
}

export default Desktop;