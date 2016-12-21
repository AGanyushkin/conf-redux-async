import {put,call} from 'redux-saga/effects'
import {push} from 'react-router-redux'
import {startProcessing, endProcessing, errorProcessing} from '../actions/core'
import {nextEvents, events, completed, queue, suggestions, loadSuggestions} from '../actions/events'

export function* loadNextEventsSaga() {
    try {
        yield put(startProcessing())
        const resp = yield call(fetch, '/api/events/next')
        const ids = (yield resp.json()).payload
        yield* loadEvents(ids)
        yield put(nextEvents(ids))
        yield put(endProcessing())
    } catch (e) {
        yield put(errorProcessing(e))
    }
}

export function* loadCompletedSaga() {
    try {
        yield put(startProcessing())
        const resp = yield call(fetch, '/api/events/completed')
        const ids = (yield resp.json()).payload
        yield* loadEvents(ids)
        yield put(completed(ids))
        yield put(endProcessing())
    } catch (e) {
        yield put(errorProcessing(e))
    }
}

export function* loadQueueSaga() {
    try {
        yield put(startProcessing())
        const resp = yield call(fetch, '/api/events/queue')
        const ids = (yield resp.json()).payload
        yield* loadEvents(ids)
        yield put(queue(ids))
        yield put(endProcessing())
    } catch (e) {
        yield put(errorProcessing(e))
    }
}

export function* loadSuggestionsSaga() {
    try {
        yield put(startProcessing())
        const resp = yield call(fetch, '/api/events/suggestions')
        const ids = (yield resp.json()).payload
        yield* loadEvents(ids)
        yield put(suggestions(ids))
        yield put(endProcessing())
    } catch (e) {
        yield put(errorProcessing(e))
    }
}

export function* putNewEventSaga(action) {
    try {
        yield put(startProcessing())
        yield call(fetch, '/api/events', {
            method: 'put',
            headers: {
                "Content-type": "application/json"
            },
            body: action.payload
        })
        yield put(endProcessing())
        yield put(push('/suggestions'))
    } catch (e) {
        yield put(errorProcessing(e))
    }
}

export function* likeSaga(action) {
    try {
        yield put(startProcessing())
        const {eid, aid} = action.payload
        yield call(fetch, '/api/events/like', {
            method: 'put',
            headers: {
                "Content-type": "application/json"
            },
            body: {eid, aid}
        })
        yield* loadEvents([eid])
        yield put(endProcessing())
    } catch (e) {
        yield put(errorProcessing(e))
    }
}

export function* dislikeSaga(action) {
    try {
        yield put(startProcessing())
        const {eid, aid} = action.payload
        yield call(fetch, '/api/events/dislike', {
            method: 'put',
            headers: {
                "Content-type": "application/json"
            },
            body: {eid, aid}
        })
        yield* loadEvents([eid])
        yield put(endProcessing())
    } catch (e) {
        yield put(errorProcessing(e))
    }
}

export function* assignSaga(action) {
    try {
        yield put(startProcessing())
        const {eid, aid} = action.payload
        yield call(fetch, '/api/events/assign', {
            method: 'put',
            headers: {
                "Content-type": "application/json"
            },
            body: {eid, aid}
        })
        yield* loadEvents([eid])
        yield put(loadSuggestions())
    } catch (e) {
        yield put(errorProcessing(e))
    }
}

function* loadEvents(ids) {
    const resp = yield call(fetch, `/api/events?ids=${ids.join(',')}`)
    const _events = (yield resp.json()).payload
    yield put(events(_events))
}
