import React, { Component } from 'react'
import firebase from 'firebase'

import Routes from './Routes'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => this.setState(user))
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-title">Welcome to Git Viewer</h1>
        <Routes />
      </div>
    )
  }
}

export default App
