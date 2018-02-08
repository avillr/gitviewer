import React, { Component } from 'react'
import firebase from 'firebase'

const provider = new firebase.auth.GithubAuthProvider()
provider.addScope('repo')

const attemptSignIn = () => {
  firebase.auth().signInWithRedirect(provider)
}

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar is-fixed-top" aria-label="main navigation">
        <div className="navbar-brand">
          <h1>GitViewer</h1>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <p className="control">
              <a className="button is-dark" onClick={attemptSignIn}>
                <span>Sign In With Github</span>
              </a>
            </p>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
