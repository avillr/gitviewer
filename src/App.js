import React, { Component } from 'react'
import firebase from 'firebase'
import 'firebase/firestore'

import Routes from './Routes'
import './App.css'
import Navbar from './containers/Navbar'
import Footer from './containers/Footer'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    // firebase
    //   .auth()
    //   .getRedirectResult()
    //   .then(result => {
    //     console.log(result)
    //     firebase
    //       .firestore()
    //       .collection('users')
    //       .doc(result.user.uid)
    //       .set({
    //         uid: result.user.uid,
    //         email: result.user.email,
    //         githubToken: result.credential.accessToken,
    //         githubUsername: result.additionalUserInfo.username
    //       })
    //   })
    //   .catch(err => {
    //     console.error('Sign in error:', err)
    //   })

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              this.setState({ user: doc.data() })
            } else {
              console.warn('Error at App cdm, firestore user')
            }
          })
          .catch(console.error)
      } else {
        this.setState({ user: {} })
      }
    })
  }

  render() {
    const childProps = {
      user: this.state.user
    }
    return (
      <div className="App">
        <Navbar username={this.state.user.githubUsername} />
        <div className="Main-container">
          <Routes childProps={childProps} />
        </div>
        <Footer />
      </div>
    )
  }
}

export default App
