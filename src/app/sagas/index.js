import {fork} from 'redux-saga/effects'
import {loadNextEventsSaga, loadCompletedSaga, loadQueueSaga, loadSuggestionsSaga,
        putNewEventSaga, likeSaga, dislikeSaga, assignSaga} from './events'

export default function* () {
    yield fork(loadNextEventsSaga)
    yield fork(loadCompletedSaga)
    yield fork(loadQueueSaga)
    yield fork(loadSuggestionsSaga)
    yield fork(putNewEventSaga)
    yield fork(likeSaga)
    yield fork(dislikeSaga)
    yield fork(assignSaga)
}
