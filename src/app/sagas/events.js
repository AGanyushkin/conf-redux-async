import {put,call,take} from 'redux-saga/effects'
import {push} from 'react-router-redux'
import {startProcessing, endProcessing, errorProcessing} from '../actions/core'
import {nextEvents, events, completed, queue, suggestions,
        loadNextEvents, loadCompleted, loadQueue, loadSuggestions,
        putNewEvent, like, dislike, assign} from '../actions/events'
import {delay} from 'redux-saga'

export function* loadNextEventsSaga() {
    while(true) {
        try {
            yield take(loadNextEvents.getType())

            yield put(startProcessing())
            const resp = yield call(fetch, '/api/events/next')
            const ids = (yield resp.json()).payload
            yield* _loadEvents(ids)
            yield put(nextEvents(ids))
            yield put(endProcessing())
        } catch (e) {
            yield put(errorProcessing(e))
        }
    }
}

export function* loadCompletedSaga() {
    while(true) {
        try {
            yield take(loadCompleted.getType())

            yield put(startProcessing())
            const resp = yield call(fetch, '/api/events/completed')
            const ids = (yield resp.json()).payload
            yield* _loadEvents(ids)
            yield put(completed(ids))
            yield put(endProcessing())
        } catch (e) {
            yield put(errorProcessing(e))
        }
    }
}

export function* loadQueueSaga() {
    while(true) {
        try {
            console.log('LOAD_QUEUE wait')
            yield take(loadQueue.getType())
            console.log('LOAD_QUEUE start')
            yield put(startProcessing())
            const resp = yield call(fetch, '/api/events/queue')
            const ids = (yield resp.json()).payload
            yield* _loadEvents(ids)
            yield put(queue(ids))
            yield put(endProcessing())
            console.log('LOAD_QUEUE delay')
            yield delay(5000)
            console.log('LOAD_QUEUE next')
        } catch (e) {
            yield put(errorProcessing(e))
        }
    }
}

export function* loadSuggestionsSaga() {
    while(true) {
        try {
            yield take(loadSuggestions.getType())

            yield put(startProcessing())
            const resp = yield call(fetch, '/api/events/suggestions')
            const ids = (yield resp.json()).payload
            yield* _loadEvents(ids)
            yield put(suggestions(ids))
            yield put(endProcessing())
        } catch (e) {
            yield put(errorProcessing(e))
        }
    }
}

export function* putNewEventSaga() {
    while(true) {
        try {
            const action = yield take(putNewEvent.getType())

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
}

export function* likeSaga() {
    while(true) {
        try {
            const action = yield take(like.getType())

            yield put(startProcessing())
            const {eid, aid} = action.payload
            yield call(fetch, '/api/events/like', {
                method: 'put',
                headers: {
                    "Content-type": "application/json"
                },
                body: {eid, aid}
            })
            yield* _loadEvents([eid])
            yield put(endProcessing())
        } catch (e) {
            yield put(errorProcessing(e))
        }
    }
}

export function* dislikeSaga() {
    while(true) {
        try {
            const action = yield take(dislike.getType())

            yield put(startProcessing())
            const {eid, aid} = action.payload
            yield call(fetch, '/api/events/dislike', {
                method: 'put',
                headers: {
                    "Content-type": "application/json"
                },
                body: {eid, aid}
            })
            yield* _loadEvents([eid])
            yield put(endProcessing())
        } catch (e) {
            yield put(errorProcessing(e))
        }
    }
}

export function* assignSaga() {
    while(true) {
        try {
            const action = yield take(assign.getType())

            yield put(startProcessing())
            const {eid, aid} = action.payload
            yield call(fetch, '/api/events/assign', {
                method: 'put',
                headers: {
                    "Content-type": "application/json"
                },
                body: {eid, aid}
            })
            yield* _loadEvents([eid])
            yield put(loadSuggestions())
        } catch (e) {
            yield put(errorProcessing(e))
        }
    }
}

function* _loadEvents(ids) {
    const resp = yield call(fetch, `/api/events?ids=${ids.join(',')}`)
    const _events = (yield resp.json()).payload
    yield put(events(_events))
}
