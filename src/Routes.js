import React from 'react'
import { Route, Switch } from 'react-router-dom'

import AppliedRoute from './components/AppliedRoute'

import Home from './containers/Home'
import Repo from './containers/Repo'

const Routes = ({ childProps }) => (
  <Switch>
    <Route exact path="/" component={Home} />
    <AppliedRoute path="/:owner/:repo" component={Repo} props={childProps} />
  </Switch>
)

export default Routes
