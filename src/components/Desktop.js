import React, { Component } from 'react';
import './Desktop.css';

class Desktop extends Component {
    
    constructor(props) {
        super(props)
        this.state = {childrenExtraAttributes: {TEST:"test"}}

        //this.mapChildren.bind(this)
        console.log("Desktop is created")
    }
    componentDidMount() {

    }

    onDragOverHandler(e) {
        e.preventDefault()
    }

    onDropHandler(e) {
        console.log("DROP: " + e.dataTransfer.getData('text'))
    }

    render() {
        
        let dragableChildren = React.Children.map(this.props.children, (child, index)=>{
                let childKey = child.key
                if (childKey){
                    if (this.state.childrenExtraAttributes.hasOwnProperty(childKey)) {
                        let oldKey = childKey
                        while (this.state.childrenExtraAttributes.hasOwnProperty(childKey = oldKey + "_" + index)) {++index}
                        console.log('WARNING: Doplicate key has been found in Desktop children and one of them is renamed from "'
                        + oldKey + '" to "' + childKey)
                    }
                }else {
                    while (this.state.childrenExtraAttributes.hasOwnProperty(childKey = child.type.name + "_" + index)) {++index}
                }
        
                if (!this.state.childrenExtraAttributes.hasOwnProperty(childKey))
                    // eslint-disable-next-line
                    this.state.childrenExtraAttributes[childKey] = {}
        
                if (['Shortcut', 'Window'].indexOf(child.type.name) > -1){
                    // eslint-disable-next-line
                    this.state.childrenExtraAttributes[childKey] = {
                        draggable: true, 
                        onDragStart: (e) => {
                            console.log("DRAG START: " + e.target.id)
                            //e.dataTransfer.effectAllowed = 'copy' // only dropEffect='copy' will be dropable
                            // TODO: investigate what is the best data to transfer
                            e.dataTransfer.setData('text/plain', e.target.id)
                        }}
                }
        
                return React.cloneElement(child, { key: childKey, attributes: this.state.childrenExtraAttributes[childKey]})
            })

        return (

            <div className="desktop" 
                onDragOver={this.onDragOverHandler}
                onDrop={this.onDropHandler}
            >
                {dragableChildren}
            </div>
        )
    }
}

export default Desktop;