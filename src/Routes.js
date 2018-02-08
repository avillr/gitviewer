import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './containers/Home'
import Repo from './containers/Repo'

const Routes = ({ childProps }) => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/:owner/:repo" component={Repo} />
  </Switch>
)

export default Routes
