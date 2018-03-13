import React from 'react'
import { Route, Switch } from 'react-router-dom'

import AppliedRoute from './components/AppliedRoute'

import Home from './containers/Home'
import Repo from './containers/Repo'
import Help from './containers/Help'
import SearchResults from './containers/SearchResults'

const Routes = ({ childProps }) => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/help" component={Help}/>
    <AppliedRoute path="/search" component={SearchResults} props={childProps}/>
    <AppliedRoute path="/:owner/:repo" component={Repo} props={childProps} />
  </Switch>
)

export default Routes
