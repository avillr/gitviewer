import React from 'react'
import { Route, Switch } from 'react-router-dom'

import AppliedRoute from './components/AppliedRoute'

import { Home, Repo, Help, SearchResults } from './containers'

const Routes = ({ childProps }) => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/help' component={Help} />
    <AppliedRoute path='/search' component={SearchResults} props={childProps} />
    <AppliedRoute path='/:owner/:repo' component={Repo} props={childProps} />
  </Switch>
)

export default Routes
