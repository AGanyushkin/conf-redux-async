import '../polyfills'
import { createAction } from 'redux-act'
import { push } from 'react-router-redux'
import { endProcessing, startProcessing, errorProcessing } from '../actions/core'

export const loadEvents = createAction('LOAD_EVENTS')
export const loadNextEvents = createAction('LOAD_NEXT_EVENTS')
export const loadCompleted = createAction('LOAD_COMPLETED')
export const loadQueue = createAction('LOAD_QUEUE')
export const loadSuggestions = createAction('LOAD_SUGGESTIONS')

export const loadNextEventsAsync = () => loadXAsync('/api/events/next', loadNextEvents)
export const loadCompletedAsync = () => loadXAsync('/api/events/completed', loadCompleted)
export const loadSuggestionsAsync = () => loadXAsync('/api/events/suggestions', loadSuggestions)
export const loadQueueAsync = () => loadXAsync('/api/events/queue', loadQueue)

export function putNewEventAsync(event) {
    return dispatch => {
        dispatch(startProcessing())
        return fetch("/api/events", {
            method: 'put',
            headers: {
                "Content-type": "application/json"
            },
            body: event
        })
            .then(resp => resp.json())
            .then(resp => {
                dispatch(endProcessing())
                dispatch(push('/suggestions'))
            })
            .catch(err => dispatch(errorProcessing(err)))
    }
}

export const voteAsync = (eid, aid) => vote('/api/events/vote', eid, aid)
export const unvoteAsync = (eid, aid) => vote('/api/events/unvote', eid, aid)

export function assignAsync(eid, aid) {
    return dispatch => {
        dispatch(startProcessing())
        return fetch("/api/events/assign", {
            method: 'put',
            headers: {
                "Content-type": "application/json"
            },
            body: {eid, aid}
        })
            .then(resp => resp.json())
            .then(resp =>
                loadEventList(dispatch, [eid])
                    .then(_ => {
                        dispatch(loadSuggestionsAsync())
                            .then(_ => {
                                dispatch(endProcessing())
                            })
                    })
            )
            .catch(err => dispatch(errorProcessing(err)))
    }
}

function vote(type, eid, aid) {
    return dispatch => {
        dispatch(startProcessing())
        return fetch(type, {
            method: 'put',
            headers: {
                "Content-type": "application/json"
            },
            body: {eid, aid}
        })
            .then(resp => resp.json())
            .then(resp =>
                loadEventList(dispatch, [eid])
                    .then(resp => {
                        dispatch(endProcessing())
                    })
            )
            .catch(err => dispatch(errorProcessing(err)))
    }
}

function loadXAsync(apiUrl, action) {
    return dispatch => {
        dispatch(startProcessing())
        return fetch(apiUrl)
            .then(resp => resp.json())
            .then(resp =>
                loadEventList(dispatch, resp.payload)
                    .then(r => {
                        dispatch(action(resp.payload))
                        dispatch(endProcessing())
                    })
            )
            .catch(err => dispatch(errorProcessing(err)))
    }
}

function loadEventList(dispatch, ids) {
    return fetch(`/api/events?ids=${ids.join(',')}`)
        .then(resp => resp.json())
        .then(resp => {
            dispatch(loadEvents(resp.payload))
            return resp
        })
        .catch(err => dispatch(errorProcessing(err)))
}
