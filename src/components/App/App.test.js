import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'
import config from './config'
firebase.initializeApp(config)

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Router>
      <App />
    </Router>,
    div
  )
})
