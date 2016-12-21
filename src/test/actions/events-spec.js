import chai from 'chai'
const expect = chai.expect
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {startProcessing, endProcessing} from '../../app/actions/core'
import {loadNextEventsAsync, loadNextEvents, loadEvents} from '../../app/actions/events'
import fetchMock from 'fetch-mock'

describe('Event Actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('should pass for loadNextEventsAsync action', () => {
        fetchMock.get('/api/events/next', {payload: ['1']})
        fetchMock.get('/api/events?ids=1', {payload: 'test-value-x'})
        const store = configureMockStore([thunk])({})
        const expectedActions = [
            startProcessing(),
            loadEvents('test-value-x'),
            loadNextEvents(['1']),
            endProcessing()
        ]

        return store.dispatch(loadNextEventsAsync())
            .then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions)
            })
    })
})
