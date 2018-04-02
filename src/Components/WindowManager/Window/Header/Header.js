import React from 'react'
import classes from './Header.css'

const header = ( props ) => {
    const buildClasses = () => {
        return ( props.active === true ) ?
            [classes.Header, classes.active, classes[props.position]].join( ' ' ) :
            [classes.Header]

    }
    return (
        <div onDoubleClick={props.fullScreen} 
            className={buildClasses()}
            onMouseDown={props.mousedown}
            onTouchStart={props.mousedown}>
            <div className={classes.headerButtons}>
                <button onClick={props.fullScreen} className={[classes.button, classes.fullScreen].join(' ')}>o</button>
                <button onClick={props.closeWindow} className={[classes.button, classes.close].join(' ')}>x</button>
            </div>
        </div>
    )
}

export default header
