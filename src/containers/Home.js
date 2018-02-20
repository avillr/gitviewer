import React, { Component } from 'react'

import './Home.css'

class Home extends Component {
  handleChange(evt) {
    evt.preventDefault()
    alert('ayo')
  }

  render() {
    return (
      <div className="Home">
        <div className="container">
          <h1 className="title">Welcome to GitViewer</h1>
          <h2 className="subtitle">
            Look through Github repos with file trees and full search.
          </h2>
          <form onSubmit={this.handleChange}>
            <div className="field">
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Go on, check it out!"
                />
              </div>
            </div>
            <div className="field">
              <div className="control" style={{textAlign: 'center'}}>
                <button type="submit" className="button is-light is-outlined">
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Home
