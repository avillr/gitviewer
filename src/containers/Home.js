import React, { Component } from 'react'

import './Home.css'

class Home extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt) {
    evt.preventDefault()
    this.props.history.push('/search?q=' + evt.target.search.value)
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
            <div className="field is-grouped">
              <div className="control is-expanded">
                <input
                  className="input"
                  name="search"
                  type="text"
                  placeholder="Go on, check it out!"
                />
              </div>

              <div className="control">
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
