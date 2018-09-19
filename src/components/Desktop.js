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
                [childKey]: {...this.state.childrenExtraAttributes[childKey],
                    style:{
                    ...this.state.childrenExtraAttributes[childKey].style,
                    top: e.clientY+'px', 
                    left: e.clientX+'px'
                }}
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
                    }
                }else {
                    console.log('ERROR: A child('+child.type.name+') does not have key, only children with unique key will be accepted by Desktop')
                    return null
                }
        
                if (!this.state.childrenExtraAttributes.hasOwnProperty(childKey)){
                    // eslint-disable-next-line
                    this.state.childrenExtraAttributes[childKey] = {}
                    childrenKeys[childKey] = {}
                }
        
                if (['Shortcut', 'Window'].indexOf(child.type.name) > -1){
                    // eslint-disable-next-line
                    this.state.childrenExtraAttributes[childKey] = {
                        ...this.state.childrenExtraAttributes[childKey],
                        draggable: true, 
                        onDragStart: (e) => {e.dataTransfer.setData('text/plain', childKey)},
                        style:{
                            ...this.state.childrenExtraAttributes[childKey].style,
                            position: 'absolute'
                        }
                    }

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