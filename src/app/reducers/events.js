import { createReducer } from 'redux-act'
import { events, nextEvents, completed, queue, suggestions} from '../actions/events'

export default createReducer({
    [events]: (state, payload) => Object.assign(
        {}, state, {
            eventById: Object.assign({}, state.eventById, payload)
        }
    ),
    [nextEvents]: (state, payload) => Object.assign({}, state, {nextEvents: payload}),
    [completed]: (state, payload) => Object.assign({}, state, {completed: payload}),
    [queue]: (state, payload) => Object.assign({}, state, {queue: payload}),
    [suggestions]: (state, payload) => Object.assign({}, state, {suggestions: payload})
}, {
    nextEvents: [],
    completed: [],
    suggestions: [],
    queue: [],
    eventById: {}
})
