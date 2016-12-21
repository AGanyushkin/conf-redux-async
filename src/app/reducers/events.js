import { createReducer } from 'redux-act'
import { loadQueue, events, nextEvents, completed, queue, suggestions} from '../actions/events'

export default createReducer({
    [events]: (state, payload) => Object.assign(
        {}, state, {
            eventById: Object.assign({}, state.eventById, payload)
        }
    ),
    [nextEvents]: (state, payload) => Object.assign({}, state, {nextEvents: payload}),
    [completed]: (state, payload) => Object.assign({}, state, {completed: payload}),
    [queue]: (state, payload) => Object.assign({}, state, {queue: payload}),
    [suggestions]: (state, payload) => Object.assign({}, state, {suggestions: payload}),
    [loadQueue]: (state) => { console.log('LOAD_QUEUE reducer'); return state }
}, {
    nextEvents: [],
    completed: [],
    suggestions: [],
    queue: [],
    eventById: {}
})
