import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
      <nav className="navbar" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            GitViewer
          </Link>
        </div>
        <div className="navbar-end">
          {this.props.username ? (
            <div className="navbar-item has-dropdown is-hoverable">
              <Link className="navbar-link" to="/account">
                Hey, {this.props.username}
              </Link>
              <div className="navbar-dropdown is-boxed">
                <Link className="navbar-item" to="/">
                  Account
                </Link>
                <Link className="navbar-item" to="/">
                  Preferences
                </Link>
                <hr className="navbar-divider" />
                <a
                  className="navbar-item"
                  onClick={() =>
                    firebase
                      .auth()
                      .signOut()
                      .catch(console.error)
                  }
                >
                  Logout
                </a>
              </div>
            </div>
          ) : (
            <div className="navbar-item">
              <p className="control">
                <button className="button is-dark" onClick={attemptSignIn}>
                  <span>Sign In With Github</span>
                </button>
              </p>
            </div>
          )}
        </div>
      </nav>
    )
  }
}

export default Navbar
