import './polyfills'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import { browserHistory } from 'react-router'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer } from 'react-router-redux'
import logger from 'redux-logger'
import router from './routes'
import eventsReducer from './reducers/events'
import layoutReducer from './reducers/layout'
import accountReducer from './reducers/account'
import thunk from 'redux-thunk'
import mocks from '../mock'

const store = createStore(
    combineReducers({
        routing: routerReducer,
        events: eventsReducer,
        layout: layoutReducer,
        account: accountReducer
    }),
    {},
    applyMiddleware(
        logger(),
        routerMiddleware(browserHistory),
        thunk
    )
)

const history = syncHistoryWithStore(browserHistory, store)

mocks()

ReactDOM.render(
    <Provider store={store}>
        {router(history)}
    </Provider>,
    document.getElementById('app-launcher')
)
