import React from 'react'
import classes from './BoxHandle.css'

const boxHandle = ( props ) => {
    const buildClasses = () => {
        return (props.active === true) ? 
            [classes.BoxHandle, classes.active, classes[props.position]].join(' ') :
            [classes.BoxHandle, classes[props.position]].join(' ')
        
    }
    return (
        <div 
            onMouseDown={(e) => props.mousedown(e, props.position) }
            onTouchStart={(e) => props.mousedown(e, props.position) }
            className={buildClasses()}></div>
    )
}

export default boxHandle
