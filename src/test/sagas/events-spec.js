import chai from 'chai'
import {call,put,take} from 'redux-saga/effects'
import {loadNextEventsSaga, putNewEventSaga} from '../../app/sagas/events'
import {startProcessing,endProcessing,errorProcessing} from '../../app/actions/core'
import {events,nextEvents, putNewEvent,loadNextEvents} from '../../app/actions/events'
import {push} from 'react-router-redux'
import fetchMock from 'fetch-mock'
import configureMockStore from 'redux-mock-store'
import createSagaMiddleware from 'redux-saga'

/**
 * use api module for ext. api
 *  ex: call(api.buyProducts, cart)
 */

describe('Event Sagas', () => {
    it('should pass for loadNextEventsSaga', () => {
        const g = loadNextEventsSaga()

        g.next().value.should.be.deep.equal(take(loadNextEvents.getType()))

        g.next().value.should.be.deep.equal(put(startProcessing()))
        g.next().value.should.be.deep.equal(call(fetch, '/api/events/next'))
        g.next({json:()=>'test-value-1'}).value.should.be.equal('test-value-1')
        g.next({payload:[1]}).value.should.be.deep.equal(call(fetch, `/api/events?ids=${[1].join(',')}`))
        g.next({json:()=>'test-value-2'}).value.should.be.equal('test-value-2')
        g.next({payload:{1:1,2:2}}).value.should.be.deep.equal(put(events({1:1,2:2})))
        g.next().value.should.be.deep.equal(put(nextEvents([1])))
        g.next().value.should.be.deep.equal(put(endProcessing()))
    })
    it('should fail for loadNextEventsSaga', () => {
        const g = loadNextEventsSaga({})

        g.next().value.should.be.deep.equal(take(loadNextEvents.getType()))

        g.next().value.should.be.deep.equal(put(startProcessing()))
        g.throw('test-value').value.should.be.deep.equal(put(errorProcessing('test-value')))
    })

    it('should pass for putNewEventSaga', () => {
        const g = putNewEventSaga()

        g.next().value.should.be.deep.equal(take(putNewEvent.getType()))

        g.next(putNewEvent({x:1,y:2})).value.should.be.deep.equal(put(startProcessing()))
        g.next().value.should.be.deep.equal(
            call(fetch, '/api/events', {
                method: 'put',
                headers: {
                    "Content-type": "application/json"
                },
                body: {x:1,y:2}
            })
        )
        g.next().value.should.be.deep.equal(put(endProcessing()))
        g.next().value.should.be.deep.equal(put(push('/suggestions')))
    })
    it('should fail for putNewEventSaga', () => {
        const g = putNewEventSaga()

        g.next().value.should.be.deep.equal(take(putNewEvent.getType()))

        g.next(putNewEvent({x:1,y:2})).value.should.be.deep.equal(put(startProcessing()))
        g.throw('test-value').value.should.be.deep.equal(put(errorProcessing('test-value')))
    })

    afterEach(() => {
        fetchMock.restore()
    })

    it('should pass for loadNextEventsSaga action. blackbox unit test', () => {
        fetchMock.get('/api/events/next', {payload: ['1']})
        fetchMock.get('/api/events?ids=1', {payload: 'test-value-x'})
        const sagaMiddleware = createSagaMiddleware()
        const store = configureMockStore([sagaMiddleware])({})
        sagaMiddleware.run(loadNextEventsSaga)
        const expectedActions = [
            loadNextEvents(),
            startProcessing(),
            events('test-value-x'),
            nextEvents(['1']),
            endProcessing()
        ]

        store.dispatch(loadNextEvents())
        return new Promise(res => {
            store.subscribe(() => {
                if (store.getActions().length === 5) {
                    store.getActions().should.be.deep.equal(expectedActions)
                    res()
                }
            })
        })
    })
})
