import { createReducer } from 'redux-act'
import { loadEvents, loadNextEvents, loadCompleted, loadQueue, loadSuggestions} from '../actions/events'

export default createReducer({
    [loadEvents]: (state, payload) => Object.assign(
        {}, state, {
            eventById: Object.assign({}, state.eventById, payload)
        }
    ),
    [loadNextEvents]: (state, payload) => Object.assign({}, state, {nextEvents: payload}),
    [loadCompleted]: (state, payload) => Object.assign({}, state, {completed: payload}),
    [loadQueue]: (state, payload) => Object.assign({}, state, {queue: payload}),
    [loadSuggestions]: (state, payload) => Object.assign({}, state, {suggestions: payload})
}, {
    nextEvents: [],
    completed: [],
    suggestions: [],
    queue: [],
    eventById: {}
})
