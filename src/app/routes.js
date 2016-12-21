import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import NewEvent from './containers/newevent'
import Queue from './containers/queue'
import Layout from './containers/layout'
import Suggestions from './containers/suggestions'
import Dashboard from './containers/dashboard'
import Archive from './containers/archive'

export default function router(history) {
    return (
        <Router history={history}>
            <Route path="/" component={Layout}>
                <IndexRoute component={Dashboard} />
                <Route path="/new" component={NewEvent} />
                <Route path="/queue" component={Queue} />
                <Route path="/suggestions" component={Suggestions} />
                <Route path="/archive" component={Archive} />
            </Route>
        </Router>
    )
}
