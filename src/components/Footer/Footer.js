import React, { Component } from 'react'

import './Footer.css'

class Footer extends Component {
  render () {
    return (
      <footer>
        <span style={{ marginRight: '10px' }}>
          <strong>GitViewer</strong> by{' '}
          <a
            style={{ color: 'white' }}
            href='https://avill.io/projects/gitviewer'
          >
            Alex Villarreal
          </a>.
        </span>
      </footer>
    )
  }
}

export default Footer
