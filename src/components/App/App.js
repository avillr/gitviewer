import React, { Component } from 'react'
import firebase from 'firebase'
import 'firebase/firestore'
import { Route, Switch } from 'react-router-dom'

import './App.css'
import Navbar from 'Navbar/Navbar'
import Footer from 'Footer/Footer'
import Home from 'Home/Home'
import Repo from 'Repo/Repo'
import Help from 'Help/Help'
import SearchResults from 'SearchResults/SearchResults'
import AppliedRoute from './AppliedRoute'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {}
    }
  }

  componentDidMount () {
    firebase
      .auth()
      .getRedirectResult()
      .then(result => {
        if (result.user) {
          console.log('Successful Redirect', result)
          firebase
            .firestore()
            .collection('users')
            .doc(result.user.uid)
            .set({
              uid: result.user.uid,
              email: result.user.email,
              githubToken: result.credential.accessToken,
              githubUsername: result.additionalUserInfo.username
            })
        }
      })
      .catch(err => {
        console.error('Sign in error:', err)
      })

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

  render () {
    const childProps = {
      user: this.state.user
    }
    return (
      <div className='App'>
        <Navbar username={this.state.user.githubUsername} />
        <div className='Main-container'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/help' component={Help} />
            <AppliedRoute
              path='/search'
              component={SearchResults}
              props={childProps}
            />
            <AppliedRoute
              path='/:owner/:repo'
              component={Repo}
              props={childProps}
            />
          </Switch>
        </div>
        <Footer />
      </div>
    )
  }
}

export default App
