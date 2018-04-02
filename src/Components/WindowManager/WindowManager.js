import React, {Component} from 'react'
import Window from './Window/Window'
import classes from './WindowManager.css'

class WindowsManager extends Component {
    state = {
        windows: [
            {key: 1, zIndex: 100, active: false, width: 300, height: 300, left: 100, top: 100}
        ],
        nextFreeKey: 3,
        nextFreeZIndex: 102
    }

    setToActive = ( key, zIndex ) => {
        const updatedWindows = this.state.windows.reduce( ( accumulator, window, currentIndex ) => {
            accumulator.push( {...window, } )
            accumulator[currentIndex].active = false
            if ( window.key === key ) {
                accumulator[currentIndex].zIndex = this.state.nextFreeZIndex
                accumulator[currentIndex].active = true
            }
            return accumulator
        }, []
        )
        this.setState( {windows: updatedWindows, nextFreeZIndex: this.state.nextFreeZIndex + 1} )
    }

    buildWindows = () => {
        return this.state.windows.map( ( window ) => {
            return <Window
                key={window.key}
                width={window.width}
                height={window.height}
                zIndex={window.zIndex}
                top={window.top}
                active={window.active}
                clickWindow={() => this.setToActive( window.key, this.state.nextFreeZIndex )}
                closeWindow={() => this.closeWindow( window.key )}
                left={window.left} />
        } )
    }
    addWindow = () => {
        const updatedWindows = this.state.windows.reduce( ( accumulator, window, currentIndex ) => {
            accumulator.push( {...window, } )
            accumulator[currentIndex].active = false
            return accumulator
        }, []
        )
        const screenWidth = document.body.clientWidth
        const screenHeight = document.body.clientHeight
        const randWidth = Math.floor(Math.random() * Math.floor(screenWidth - 200) + 100);
        const randLeft = Math.floor(Math.random() * Math.floor(screenWidth - randWidth));
        const randHeight = Math.floor(Math.random() * Math.floor(screenHeight - 200) + 100);
        const randTop = Math.floor(Math.random() * Math.floor(screenHeight - randHeight - 100) + 50);

        const newWindow = {
            key: this.state.nextFreeKey, 
            zIndex: this.state.nextFreeZIndex, 
            active: true, 
            width: randWidth, 
            height: randHeight, 
            left: randLeft , 
            top: randTop}
        updatedWindows.push( newWindow )
        this.setState( {windows: updatedWindows, nextFreeKey: this.state.nextFreeKey + 1, nextFreeZIndex: this.state.nextFreeZIndex + 1} )
    }

    closeWindow = ( key ) => {
        const updatedWindows = this.state.windows.filter( window => window.key !== key )
        this.setState( {windows: updatedWindows} )
    }

    render () {
        return (
            <div className={classes.WindowManager}> 
                <button className="button" onClick={this.addWindow} >click me</button>
                {this.buildWindows()}
            </div>
        )
    }
}

export default WindowsManager
