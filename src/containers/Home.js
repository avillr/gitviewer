import React, { Component } from 'react'

import './Home.css'
import logo from '../assets/gitviewerWhite.svg'

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
          <div style={{ display: 'flex', width: '700px' }}>
            <div style={{height: '150px', width: '150px'}}>
              <img
                alt="This is Github's Octocat with binoculars, get it?"
                src={logo}
              />
            </div>
            <div style={{ marginLeft: '20px' }}>
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
                    <button
                      type="submit"
                      className="button is-light is-outlined"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
