import React, { Component } from 'react'
import firebase from 'firebase'
import axios from 'axios'

import Routes from './Routes'
import './App.css'
import Navbar from './containers/Navbar'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    firebase
      .auth()
      .getRedirectResult()
      .then(result => {
        if (result.credential) {
          console.log(result)
        }
      })
      .catch(console.error)
    firebase.auth().onAuthStateChanged(user => this.setState(user))
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="Main-container">
          <Routes />
        </div>
      </div>
    )
  }
}

export default App
