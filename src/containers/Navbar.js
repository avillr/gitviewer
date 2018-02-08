import React, { Component } from 'react'
import firebase from 'firebase'

import './Navbar.css'

const provider = new firebase.auth.GithubAuthProvider()
provider.addScope('repo')

const attemptSignIn = () => {
  firebase.auth().signInWithRedirect(provider)
}

class Navbar extends Component {
  render() {
    return (
      <nav className="Navbar" aria-label="main navigation">
        <div className="logo">GitViewer</div>
        <div className="end-navbar">
          <div className="navbar-item">
            <p className="control">
              {this.props.username ? (
                <span>Hey, {this.props.username}</span>
              ) : (
                <a className="button is-dark" onClick={attemptSignIn}>
                  <span>Sign In With Github</span>
                </a>
              )}
            </p>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
