import React, {Component} from 'react'

class Window extends Component {
    state = {
        width: 200,
        height: 200
    }

    render () {
        return (
            <div style={{width: `${this.state.width}px`, height: `${this.state.height}px`, border: 'solid 2px grey'}}>
            </div>
        )
    }
}

export default Window
