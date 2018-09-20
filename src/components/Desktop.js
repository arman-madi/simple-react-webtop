import React, { Component } from 'react';
import './Desktop.css';

class Desktop extends Component {

    constructor(props) {
        super(props)
        this.state = { childrenExtraAttributes: { TEST: "test" } }

        this.onDropHandler = this.onDropHandler.bind(this)
    }
    componentDidMount() {

    }

    onDragOverHandler(e) {
        e.preventDefault()
    }

    onDropHandler(e) {
        let childData = JSON.parse(e.dataTransfer.getData('text'))
        let childKey = childData.key
        let shiftX = childData.shiftX
        let shiftY = childData.shiftY
        this.setState({
            childrenExtraAttributes: {
                ...this.state.childrenExtraAttributes,
                [childKey]: {
                    ...this.state.childrenExtraAttributes[childKey],
                    style: {
                        ...this.state.childrenExtraAttributes[childKey].style,
                        top: (e.clientY - shiftY) + 'px',
                        left: (e.clientX - shiftX) + 'px'
                    }
                }
            }
        })

    }

    render() {

        let childrenKeys = {}
        let dragableChildren = React.Children.map(this.props.children, (child, index) => {
            let childKey = child.key
            if (childKey) {
                if (childrenKeys.hasOwnProperty(childKey)) {
                    console.log('ERROR: Duplicate key "' + childKey + '" has been found in Desktop children which one of them will be ignored')
                    return null
                }
            } else {
                console.log('ERROR: A child(' + child.type.name + ') does not have key, only children with unique key will be accepted by Desktop')
                return null
            }

            if (!this.state.childrenExtraAttributes.hasOwnProperty(childKey)) {
                // eslint-disable-next-line
                this.state.childrenExtraAttributes[childKey] = {}
                childrenKeys[childKey] = {}
            }

            if (['Shortcut', 'Window'].indexOf(child.type.name) > -1) {
                // eslint-disable-next-line
                this.state.childrenExtraAttributes[childKey] = {
                    ...child.props.attributes,
                    ...this.state.childrenExtraAttributes[childKey],
                    draggable: true,
                    onDragStart: (e) => {
                        let shiftX = e.clientX - e.currentTarget.getBoundingClientRect().left
                        let shiftY = e.clientY - e.currentTarget.getBoundingClientRect().top
                        e.dataTransfer.setData('text/plain', JSON.stringify({ key: childKey, shiftY: shiftY, shiftX: shiftX }))
                    }
                }

                childrenKeys[childKey] = this.state.childrenExtraAttributes[childKey]
            }

            return React.cloneElement(child, { key: childKey, attributes: this.state.childrenExtraAttributes[childKey] })
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