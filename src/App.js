import React, {Component} from 'react'
import WindowManager from './Components/WindowManager/WindowManager'
import classes from './App.css'

class App extends Component {

    render () {
        return (
            <div className={classes.App}>
                <WindowManager />
            </div>
        )
    }
}

export default App
