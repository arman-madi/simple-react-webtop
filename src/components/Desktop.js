import React, { Component } from 'react';
import './Desktop.css';

class Desktop extends Component {

    constructor(props) {
        super(props)
        this.state = { children: {} }
        this.toBeRenderedChildren = {}

        this.onDropHandler = this.onDropHandler.bind(this)
        this.onChildChange = this.onChildChange.bind(this)
        this.unmountChild = this.unmountChild.bind(this)
    }

    onChildChange(tag, id) {
        if (this.props.onChange)
            this.props.onChange(tag, id, this.toBeRenderedChildren[id].type)
    }

    unmountChild(id) {
        this.setState({
            children:{
                ...this.state.children,
                [id]:{
                    ...this.state.children[id],
                    active: false
                }
            }
        })
    }

    onDragOverHandler(e) {
        e.preventDefault()
    }

    onDropHandler(e) {
        let childData = JSON.parse(e.dataTransfer.getData('text'))
        let childId = childData.id
        let shiftX = childData.shiftX
        let shiftY = childData.shiftY
        let childState = this.state.children[childId]
        this.setState({
            children: {
                ...this.state.children,
                [childId]: {
                    ...childState,
                    extraAttributes: {
                        ...childState.extraAttributes,
                        style: {
                            ...childState.extraAttributes.style,
                            top: (e.clientY - shiftY) + 'px',
                            left: (e.clientX - shiftX) + 'px'
                        }
                    }
                }
            }
        })

    }

    render() {

        this.toBeRenderedChildren = {}
        let childrenIds = {}
        let children = React.Children.map(this.props.children, (child, index) => {
            let childId = child.props.id ? child.props.id : child.key
            if (childId) {
                if (childrenIds.hasOwnProperty(childId)) {
                    console.log('ERROR: Duplicate id "' + childId + '" has been found in Desktop children which one of them will be ignored')
                    return null
                }
            } else {
                console.log('ERROR: A child(' + child.type.name + ') does not have id, only children with unique id will be accepted by Desktop')
                return null
            }

            if (!this.state.children.hasOwnProperty(childId)) {
                // eslint-disable-next-line
                this.state.children[childId] = {active:true, extraAttributes: {...child.props.attributes}}
                childrenIds[childId] = true
            }

            if (['Shortcut', 'Window'].indexOf(child.type.name) > -1) {
                // eslint-disable-next-line
                this.state.children[childId].extraAttributes = {
                    ...child.props.attributes,
                    ...this.state.children[childId].extraAttributes,
                    draggable: true,
                    onDragStart: (e) => {
                        let shiftX = e.clientX - e.currentTarget.getBoundingClientRect().left
                        let shiftY = e.clientY - e.currentTarget.getBoundingClientRect().top
                        e.dataTransfer.setData('text/plain', JSON.stringify({ id: childId, shiftY: shiftY, shiftX: shiftX }))
                    }
                }

                childrenIds[childId] = true
            }

            if (!this.state.children[childId].active){
                return undefined
            }

            this.toBeRenderedChildren[childId] = {}
            this.toBeRenderedChildren[childId].type = child.type.name

            return React.cloneElement(child, { key: childId, id: childId, 
                    ref:(rf)=>this.toBeRenderedChildren[childId].ref = rf, 
                    onChange:this.onChildChange,
                    unmountMe:this.unmountChild, 
                    attributes: this.state.children[childId].extraAttributes 
                })

        }).filter((c)=>c)

        return (

            <div className="desktop"
                onDragOver={this.onDragOverHandler}
                onDrop={this.onDropHandler}
            >
                {children}
            </div>
        )
    }
}

export default Desktop;