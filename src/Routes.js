import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Repo from './containers/Repo'

const Routes = ({ childProps }) => (
  <Switch>
    <Route path="/:owner/:repo" component={Repo} />
  </Switch>
)

export default Routes
