import {fork} from 'redux-saga/effects'
import {takeEvery} from 'redux-saga'
import {loadNextEventsSaga, loadCompletedSaga, loadQueueSaga, loadSuggestionsSaga,
        putNewEventSaga, likeSaga, dislikeSaga, assignSaga} from './events'
import {loadNextEvents, loadCompleted, loadQueue, loadSuggestions,
        putNewEvent, like, dislike, assign} from '../actions/events'

export default function* () {
    yield fork(function*() {yield* takeEvery(loadNextEvents.getType(), loadNextEventsSaga)})
    yield fork(function*() {yield* takeEvery(loadCompleted.getType(), loadCompletedSaga)})
    yield fork(function*() {yield* takeEvery(loadQueue.getType(), loadQueueSaga)})
    yield fork(function*() {yield* takeEvery(loadSuggestions.getType(), loadSuggestionsSaga)})
    yield fork(function*() {yield* takeEvery(putNewEvent.getType(), putNewEventSaga)})
    yield fork(function*() {yield* takeEvery(like.getType(), likeSaga)})
    yield fork(function*() {yield* takeEvery(dislike.getType(), dislikeSaga)})
    yield fork(function*() {yield* takeEvery(assign.getType(), assignSaga)})
}
