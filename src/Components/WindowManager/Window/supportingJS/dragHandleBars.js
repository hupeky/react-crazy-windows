import React from 'react'

const dragHandleBars = (mouseStats, newLeft, newTop, event ) => {
    let dragLeft = ( updatedWindowSetup ) => {
        let newWindowWidth = mouseStats.startWindowWidth + mouseStats.totalDeltaX
        if ( newWindowWidth < this.state.windowSetup.maxWidth ) {
            newWindowWidth = this.state.windowSetup.maxWidth
            newLeft = mouseStats.maxLeft
        }
        return {...updatedWindowSetup, width: newWindowWidth, left: newLeft}
    }

    let dragRight = ( updatedWindowSetup ) => {
        let newWindowWidth = mouseStats.startWindowWidth - mouseStats.totalDeltaX
        if ( newWindowWidth < this.state.windowSetup.maxWidth ) {
            newWindowWidth = this.state.windowSetup.maxWidth
        }
        return {...updatedWindowSetup, width: newWindowWidth}
    }

    let dragTop = ( updatedWindowSetup ) => {
        let newWindowHeight = mouseStats.startWindowHeight + mouseStats.totalDeltaY
        if ( newWindowHeight < this.state.windowSetup.maxHeight ) {
            newWindowHeight = this.state.windowSetup.maxHeight
            newTop = mouseStats.maxTop
        }
        return {...updatedWindowSetup, height: newWindowHeight, top: newTop}
    }
    let dragBottom = ( updatedWindowSetup ) => {
        let newWindowHeight = mouseStats.startWindowHeight - mouseStats.totalDeltaY
        if ( newWindowHeight < this.state.windowSetup.maxHeight ) {
            newWindowHeight = this.state.windowSetup.maxHeight
        }
        return {...updatedWindowSetup, height: newWindowHeight}
    }

    if ( this.state.currentHandle ) {
        switch ( this.state.currentHandle ) {
            case 'left':
                this.setState( {windowSetup: dragLeft( {...this.state.windowSetup} )} )
                break
            case 'right':
                this.setState( {windowSetup: dragRight( {...this.state.windowSetup} )} )
                break
            case 'top':
                this.setState( {windowSetup: dragTop( {...this.state.windowSetup} )} )
                break
            case 'bottom':
                this.setState( {windowSetup: dragBottom( {...this.state.windowSetup} )} )
                break
            case 'top_left':
                this.setState( {windowSetup: dragTop( {...dragLeft( {...this.state.windowSetup} )} )} )
                break
            case 'top_right':
                this.setState( {windowSetup: dragTop( {...dragRight( {...this.state.windowSetup} )} )} )
                break
            case 'bottom_left':
                this.setState( {windowSetup: dragBottom( {...dragLeft( {...this.state.windowSetup} )} )} )
                break
            case 'bottom_right':
                this.setState( {windowSetup: dragBottom( {...dragRight( {...this.state.windowSetup} )} )} )
                break
            default: break
        }

        mouseStats.previousX = event.clientX
        mouseStats.previousY = event.clientY

    }
}

export default dragHandleBars