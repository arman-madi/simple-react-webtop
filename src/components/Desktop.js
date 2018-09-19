import React, { Component } from 'react';
import './Desktop.css';

class Desktop extends Component {
    
    constructor(props) {
        super(props)
        this.state = {childrenExtraAttributes: {TEST:"test"}}

        this.onDropHandler = this.onDropHandler.bind(this)
    }
    componentDidMount() {

    }

    onDragOverHandler(e) {
        e.preventDefault()
    }

    onDropHandler(e) {
        console.log("DROP: " + e.dataTransfer.getData('text'))
        let childKey = e.dataTransfer.getData('text')
        // this.state.childrenExtraAttributes[childKey].top = e.clientY
        // this.state.childrenExtraAttributes[childKey].left = e.clientX
        this.setState({
            childrenExtraAttributes: {
                ...this.state.childrenExtraAttributes,
                [childKey]: {top: e.clientY+'px', left: e.clientX+'px', ...this.state.childrenExtraAttributes[childKey]}
            }
        })

    }

    render() {
        
        let childrenKeys = {}
        let dragableChildren = React.Children.map(this.props.children, (child, index)=>{
                let childKey = child.key
                if (childKey){
                    if (childrenKeys.hasOwnProperty(childKey)) {
                        console.log('ERROR: Duplicate key "' + childKey + '" has been found in Desktop children which one of them will be ignored')
                        return null
                        //let oldKey = childKey
                        //while (this.state.childrenExtraAttributes.hasOwnProperty(childKey = oldKey + "_" + index)) {++index}
                    }
                }else {
                    console.log('ERROR: A child('+child.type.name+') does not have key, only children with unique key will be accepted by Desktop')
                    return null
                    //while (this.state.childrenExtraAttributes.hasOwnProperty(childKey = child.type.name + "_" + index)) {++index}
                }
        
                if (!this.state.childrenExtraAttributes.hasOwnProperty(childKey)){
                    // eslint-disable-next-line
                    this.state.childrenExtraAttributes[childKey] = {}
                    childrenKeys[childKey] = {}
                }
        
                if (['Shortcut', 'Window'].indexOf(child.type.name) > -1){
                    // eslint-disable-next-line
                    this.state.childrenExtraAttributes[childKey] = {
                        draggable: true, 
                        onDragStart: (e) => {
                            console.log("DRAG START: " + childKey)
                            //e.dataTransfer.effectAllowed = 'copy' // only dropEffect='copy' will be dropable
                            // TODO: investigate what is the best data to transfer
                            e.dataTransfer.setData('text/plain', childKey)
                    }}

                    childrenKeys[childKey] = this.state.childrenExtraAttributes[childKey]
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