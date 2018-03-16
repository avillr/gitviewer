import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'
import { BrowserRouter as Router } from 'react-router-dom'

import 'bulma/css/bulma.css'
import 'github-markdown-css/github-markdown.css'
import './index.css'

import App from 'App/App'
import registerServiceWorker from './registerServiceWorker'

// Initialize Firebase Application
import config from './config'
firebase.initializeApp(config)

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)
registerServiceWorker()
