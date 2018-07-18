import React, {Component} from 'react'

import BoxHandle from './BoxHandle/BoxHandle'
import Header from './Header/Header'
import classes from './Window.css'
import {Elastic, Back, Bounce} from 'gsap'
import CustomEase from "gsap/CustomEase"

//import TweenMax, {Power4} from 'gsap/src/uncompressed/TweenMax';
//import EasePack from 'gsap/src/uncompressed/easing/EasePack';
import TimelineMax from 'gsap/src/uncompressed/TimelineMax'



class Window extends Component {
    state = {
        windowSetup: {
            top: this.props.top,
            left: this.props.left,
            width: this.props.width,
            height: this.props.height,
            maxWidth: 100,
            maxHeight: 100,
            isFullScreen: false
        },
        currentHandle: false,
        headerActive: false,
        headerIsDragging: false,
        handles: {
            top: false, right: false, left: false, bottom: false,
            top_left: false, top_right: false, bottom_left: false, bottom_right: false,
        }
    }

    mouseStats = {
        previousX: 0, previousY: 0,
        frameDeltaX: 0, frameDeltaY: 0,
        totalDeltaX: 0, totalDeltaY: 0,
        startX: 0, startY: 0,
        maxTop: 0, maxLeft: 0,
        startLeft: 0, startRight: 0,
        startWindowWidth: 0, startWindowHeight: 0,
    }

    myTween = new TimelineMax()

    componentDidMount () {
        document.addEventListener( 'mousedown', this.mouseDown )
        document.addEventListener( 'mouseup', this.mouseUp )
        document.addEventListener( 'mousemove', this.mouseDrag )

        document.addEventListener( 'touchstart', this.mouseDown )
        document.addEventListener( 'touchend', this.mouseUp )
        document.addEventListener( 'touchmove', this.mouseDrag )
    }

    componentWillUnmount () {
        document.removeEventListener( 'mousedown', this.mouseDown )
        document.removeEventListener( 'mouseup', this.mouseUp )
        document.removeEventListener( 'mousemove', this.mouseDrag )

        document.removeEventListener( 'touchstart', this.mouseDown )
        document.removeEventListener( 'touchend', this.mouseUp )
        document.removeEventListener( 'touchmove', this.mouseDrag )

        this.myTween.kill()
        
    }

    getClientXY = ( event ) => {
        let clientX, clientY = 0;
        switch ( event.type ) {
            case 'mousedown':
            case 'mousemove':
                clientX = event.clientX
                clientY = event.clientY
                return {X: clientX, Y: clientY}
            case 'touchstart':
            case 'touchmove':
                clientX = event.touches[0].clientX
                clientY = event.touches[0].clientY
                console.log( {X: clientX, Y: clientY} )
                return {X: clientX, Y: clientY}
            default: break
        }

    }

    mouseDown = ( event ) => {
        this.mouseStats = {
            previousX: 0, previousY: 0,
            frameDeltaX: 0, frameDeltaY: 0,
            totalDeltaX: 0, totalDeltaY: 0,
            startX: 0, startY: 0,
            maxTop: 0, maxLeft: 0,
            startLeft: 0, startRight: 0,
            startWindowWidth: 0, startWindowHeight: 0,
        }
        const client = this.getClientXY( event )
        console.log( this.mouseStats )
        this.mouseStats.previousX = this.mouseStats.startX = client.X
        this.mouseStats.previousY = this.mouseStats.startY = client.Y

        this.mouseStats.startWindowWidth = this.state.windowSetup.width
        this.mouseStats.startWindowHeight = this.state.windowSetup.height

        this.mouseStats.maxLeft = ( this.state.windowSetup.width + this.state.windowSetup.left ) - this.state.windowSetup.maxWidth
        this.mouseStats.maxTop = ( this.state.windowSetup.height + this.state.windowSetup.top ) - this.state.windowSetup.maxHeight

        this.mouseStats.startLeft = this.state.windowSetup.left
        this.mouseStats.startTop = this.state.windowSetup.top
    }

    mouseUp = () => {
        let animationEase = CustomEase.create( "custom", "M0,0 C0.098,0.176 0.354,0.963 0.362,1 0.37,0.985 0.414,0.873 0.455,0.811 0.51,0.726 0.573,0.753 0.586,0.762 0.662,0.812 0.719,0.981 0.726,0.998 0.788,0.914 0.84,0.936 0.859,0.95 0.878,0.964 0.897,0.985 0.911,0.998 0.922,0.994 0.939,0.984 0.954,0.984 0.969,0.984 1,1 1,1" )
        //let animationDistance = 10
        //let animationDuration = 0.7


        
        //let animationEase = CustomEase.create( "custom", "M0,0 C0.054,0.106 0.15,0.9 0.374,0.609 0.78,0.082 0.758,1 1,1" )
        //let animationDistance = 10
        //let animationDuration = 1.4


        let animationEase = Elastic.easeOut
        let animationDistance = 6
        let animationDuration = 1.3

        //let animationEase = Bounce.easeOut
        //let animationDistance = 10
        //let animationDuration = 1

        //let animationEase = Back.easeOut.config(4)
        //let animationDistance = 6
        //let animationDuration = 0.6

        let windowSetup = {...this.state.windowSetup}
        let AnimationXDelta = this.mouseStats.frameDeltaX * animationDistance
        let AnimationYDelta = this.mouseStats.frameDeltaY * animationDistance

        this.myTween = new TimelineMax()

        let caseArray = null

        const updateAnimation = ( caseArray ) => {
            let progress = this.myTween.progress()
            if ( windowSetup.width < 100 ) {
                windowSetup.width = 100
                console.log( 'progress', progress )
                this.myTween.kill( {width: true} );
                if ( caseArray[0] === 'right' || caseArray[1] === 'right' ) {
                    this.myTween.to( windowSetup, animationDuration, {ease: animationEase, left: `-=${(AnimationXDelta / 2) * ( 1 - progress ) }`, onUpdate: () => updateAnimation( caseArray )}, 0 )
                    
                }
            }
            if ( windowSetup.height < 100 ) {
                windowSetup.height = 100
                this.myTween.kill( {height: true} );
                if ( caseArray[0] === 'bottom' || caseArray[1] === 'bottom' ) {
                    this.myTween.to( windowSetup, animationDuration, {ease: animationEase, top: `-=${(AnimationYDelta / 2) * ( 1 - progress )}`, onUpdate: () => updateAnimation( caseArray )}, 0 )
                }
            }
            if ( this.state.currentHandle || this.state.headerActive || this.state.windowSetup.isFullScreen ) {
                this.myTween.kill( windowSetup );
            }
            this.setState( {windowSetup: windowSetup} )
        }
        if (this.state.currentHandle)
            caseArray = this.state.currentHandle.split( '_' )
  
        switch ( this.state.currentHandle ) {
            case 'left':
                this.myTween.to( windowSetup, animationDuration, {ease: animationEase, left: `-=${AnimationXDelta}`, width: `+=${AnimationXDelta}`, onUpdate: () => updateAnimation( caseArray )}, 0 )
                break
            case 'right':
                this.myTween.to( windowSetup, animationDuration, {ease: animationEase, width: `-=${AnimationXDelta}`, onUpdate: () => updateAnimation( caseArray )}, 0 )
                break
            case 'top':
                this.myTween.to( windowSetup, animationDuration, {ease: animationEase, top: `-=${AnimationYDelta}`, height: `+=${AnimationYDelta}`, onUpdate: () => updateAnimation( caseArray )}, 0 )
                break
            case 'bottom':
                this.myTween.to( windowSetup, animationDuration, {ease: animationEase, height: `-=${AnimationYDelta}`, onUpdate: () => updateAnimation( caseArray )}, 0 )
                break
            case 'top_left':
                this.myTween.to( windowSetup, animationDuration, {ease: animationEase, left: `-=${AnimationXDelta}`, width: `+=${AnimationXDelta}`, onUpdate: () => updateAnimation( caseArray )}, 0 )
                this.myTween.to( windowSetup, animationDuration, {ease: animationEase, top: `-=${AnimationYDelta}`, height: `+=${AnimationYDelta}`, onUpdate: () => updateAnimation( caseArray )}, 0 )
                break
            case 'top_right':
                this.myTween.to( windowSetup, animationDuration, {ease: animationEase, top: `-=${AnimationYDelta}`, height: `+=${AnimationYDelta}`, onUpdate: () => updateAnimation( caseArray )}, 0 )
                this.myTween.to( windowSetup, animationDuration, {ease: animationEase, width: `-=${AnimationXDelta}`, onUpdate: () => updateAnimation( caseArray )}, 0 )
                break
            case 'bottom_left':
                this.myTween.to( windowSetup, animationDuration, {ease: animationEase, height: `-=${AnimationYDelta}`, onUpdate: () => updateAnimation( caseArray )}, 0 )
                this.myTween.to( windowSetup, animationDuration, {ease: animationEase, left: `-=${AnimationXDelta}`, width: `+=${AnimationXDelta}`, onUpdate: () => updateAnimation( caseArray )}, 0 )
                break
            case 'bottom_right':
                this.myTween.to( windowSetup, animationDuration, {ease: animationEase, height: `-=${AnimationYDelta}`, onUpdate: () => updateAnimation( caseArray )} )
                this.myTween.to( windowSetup, animationDuration, {ease: animationEase, width: `-=${AnimationXDelta}`, onUpdate: () => updateAnimation( caseArray )}, 0 )
                break
            default: break
        }

        if ( this.state.headerIsDragging ) {
            this.myTween.to( windowSetup, animationDuration, {ease: animationEase, left: `-=${AnimationXDelta}`, top: `-=${AnimationYDelta}`, onUpdate: () => updateAnimation( caseArray )} )
        }

        document.body.style.cursor = 'auto'
        this.setState( {currentHandle: false, headerActive: false, headerIsDragging: false} )
    }



    onDraggingHandleBar = () => {
        let newLeft = this.mouseStats.startLeft - this.mouseStats.totalDeltaX
        let newTop = this.mouseStats.startTop - this.mouseStats.totalDeltaY

        let dragLeft = ( updatedWindowSetup ) => {
            let newWindowWidth = this.mouseStats.startWindowWidth + this.mouseStats.totalDeltaX
            if ( newWindowWidth < this.state.windowSetup.maxWidth ) {
                newWindowWidth = this.state.windowSetup.maxWidth
                newLeft = this.mouseStats.maxLeft
            }
            return {...updatedWindowSetup, width: newWindowWidth, left: newLeft}
        }

        let dragRight = ( updatedWindowSetup ) => {
            let newWindowWidth = this.mouseStats.startWindowWidth - this.mouseStats.totalDeltaX
            if ( newWindowWidth < this.state.windowSetup.maxWidth ) {
                newWindowWidth = this.state.windowSetup.maxWidth
            }
            return {...updatedWindowSetup, width: newWindowWidth}
        }

        let dragTop = ( updatedWindowSetup ) => {
            let newWindowHeight = this.mouseStats.startWindowHeight + this.mouseStats.totalDeltaY
            if ( newWindowHeight < this.state.windowSetup.maxHeight ) {
                newWindowHeight = this.state.windowSetup.maxHeight
                newTop = this.mouseStats.maxTop
            }
            return {...updatedWindowSetup, height: newWindowHeight, top: newTop}
        }
        let dragBottom = ( updatedWindowSetup ) => {
            let newWindowHeight = this.mouseStats.startWindowHeight - this.mouseStats.totalDeltaY
            if ( newWindowHeight < this.state.windowSetup.maxHeight ) {
                newWindowHeight = this.state.windowSetup.maxHeight
            }
            return {...updatedWindowSetup, height: newWindowHeight}
        }

        switch ( this.state.currentHandle ) {
            case 'left':
                document.body.style.cursor = 'ew-resize'
                this.setState( {windowSetup: dragLeft( {...this.state.windowSetup} )} )
                break
            case 'right':
                document.body.style.cursor = 'ew-resize'
                this.setState( {windowSetup: dragRight( {...this.state.windowSetup} )} )
                break
            case 'top':
                document.body.style.cursor = 'ns-resize'
                this.setState( {windowSetup: dragTop( {...this.state.windowSetup} )} )
                break
            case 'bottom':
                document.body.style.cursor = 'ns-resize'
                this.setState( {windowSetup: dragBottom( {...this.state.windowSetup} )} )
                break
            case 'top_left':
                document.body.style.cursor = 'nwse-resize'
                this.setState( {windowSetup: dragTop( {...dragLeft( {...this.state.windowSetup} )} )} )
                break
            case 'top_right':
                document.body.style.cursor = 'nesw-resize'
                this.setState( {windowSetup: dragTop( {...dragRight( {...this.state.windowSetup} )} )} )
                break
            case 'bottom_left':
                document.body.style.cursor = 'nesw-resize'
                this.setState( {windowSetup: dragBottom( {...dragLeft( {...this.state.windowSetup} )} )} )
                break
            case 'bottom_right':
                document.body.style.cursor = 'nwse-resize'
                this.setState( {windowSetup: dragBottom( {...dragRight( {...this.state.windowSetup} )} )} )
                break
            default: break
        }

    }

    onDraggingHeader = () => {
        let newLeft = this.mouseStats.startLeft - this.mouseStats.totalDeltaX
        let newTop = this.mouseStats.startTop - this.mouseStats.totalDeltaY

        let updatedWindowSetup = {...this.state.windowSetup}
        updatedWindowSetup.top = newTop
        updatedWindowSetup.left = newLeft

        document.body.style.cursor = 'move'
        this.setState( {headerIsDragging: true} )
        this.setState( {windowSetup: updatedWindowSetup} )

    }

    mouseDrag = ( event ) => {

        const client = this.getClientXY( event )

        this.mouseStats.frameDeltaX = this.mouseStats.previousX - client.X
        this.mouseStats.frameDeltaY = this.mouseStats.previousY - client.Y

        this.mouseStats.totalDeltaX = this.mouseStats.startX - client.X
        this.mouseStats.totalDeltaY = this.mouseStats.startY - client.Y



        this.mouseStats.previousX = client.X
        this.mouseStats.previousY = client.Y

        if ( ( this.state.currentHandle || this.state.headerActive ) && !this.state.windowSetup.isFullScreen ) {
            if ( this.state.currentHandle )
                this.onDraggingHandleBar()
            if ( this.state.headerActive )
                this.onDraggingHeader()
        }

    }

    setHandleHandler = ( event, activeHandle ) => {
        let updatedHandles = {...this.state.handles}
        if ( activeHandle )
            updatedHandles[activeHandle] = true;
        this.setState( {handles: updatedHandles, currentHandle: activeHandle} )
    }

    setHeaderActiveHandler = () => {
        this.setState( {headerActive: true} )
    }

    buildWindowClasses () {
        const activeClass = ( this.props.active ) ? classes.active : null
        return [classes.Window, activeClass, ( this.state.currentHandle ) ? classes[this.state.currentHandle] : null].join( ' ' )
    }

    buildBoxHandles = () => {
        return Object.keys( this.state.handles ).map(
            ( handle ) => {
                return (
                    <BoxHandle key={`${handle}`}
                        active={( handle === this.state.currentHandle ) ? true : false}
                        mousedown={this.setHandleHandler}
                        position={`${handle}`} />
                )
            }
        )
    }

    fullScreenHandler = () => {
        let updatedWindowSetup = {...this.state.windowSetup, isFullScreen: !this.state.windowSetup.isFullScreen}
        this.setState( {windowSetup: updatedWindowSetup} )
    }

    buildInlineStyle = () => {
        return (
            ( this.state.windowSetup.isFullScreen ) ?
                {
                    top: `0px`,
                    left: `0px`,
                    width: `100vw`,
                    height: `99vh`,
                    zIndex: this.props.zIndex,
                }
                :
                {
                    top: `${this.state.windowSetup.top}px`,
                    left: `${this.state.windowSetup.left}px`,
                    width: `${this.state.windowSetup.width}px`,
                    height: `${this.state.windowSetup.height}px`,
                    zIndex: this.props.zIndex,
                }
        )
    }

    render () {
        return (
            <div
                onMouseDown={this.props.clickWindow}
                onTouchStart={this.props.clickWindow}
                className={this.buildWindowClasses()}
                style={this.buildInlineStyle()}
            >
                <Header fullScreen={this.fullScreenHandler} closeWindow={this.props.closeWindow} active={this.props.active} mousedown={this.setHeaderActiveHandler} />
                {this.buildBoxHandles()}
            </div>
        )
    }
}

export default Window
