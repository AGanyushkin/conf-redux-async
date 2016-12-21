import fetchMock from 'fetch-mock'
import moment from 'moment'
import { guid } from '../app/util'

export default function mockEvents() {
    let suggestions = ['4']
    let completed = ['1', '2', '3']
    let queue = ['2', '3']
    let next = ['1','3']
    let events = {
        '1': {
            title: "fetchMock 1 CSS Selectors",
            speaker: 444,
            description: "Async satck trace with promise.all",
            createdBy: 666,
            createdAt: moment().valueOf(),
            voters: [666, 555]
        },
        '2': {
            title: "fetchMock 2 CSS Selectors",
            speaker: 555,
            description: "Async satck trace with promise.all",
            createdBy: 666,
            createdAt: moment().valueOf(),
            voters: [666, 555]
        },
        '3': {
            title: "fetchMock 3 CSS Selectors",
            speaker: 444,
            description: "Async satck trace with promise.all",
            createdBy: 666,
            createdAt: moment().valueOf(),
            voters: [666, 555]
        },
        '4': {
            title: "fetchMock 4 Debuging JS & React",
            description: "dfsd sd fsdfsdfsfd",
            createdBy: 666,
            createdAt: moment().valueOf(),
            voters: []
        }
    }

    fetchMock.get('/api/events/suggestions', _ => {
        return {
            body: {
                payload: suggestions
            }
        }
    })
    fetchMock.get('/api/events/completed', {payload: completed})
    fetchMock.get('/api/events/queue', {payload: queue})
    fetchMock.get('/api/events/next', {payload: next})

    fetchMock.get(/\/api\/events\?ids=.*/, url => {
        let payload = {}
        url.substr(url.indexOf('=') + 1).split(',').forEach(i => {
            payload[i] = events[i]
        })
        return {
            body: {
                payload
            }
        }
    })

    fetchMock.put('/api/events', (url,opts) => {
        const id = guid()
        events[id] = Object.assign({}, opts.body, {
            voters: [],
            createdAt: moment().valueOf(),
            eventDate: null
        })
        if (opts.body.speaker) {
            queue.push(id)
        } else {
            suggestions.push(id)
        }
        return {
            body: {
                id
            }
        }
    })

    fetchMock.put('/api/events/vote', (url,opts) => {
        const {eid, aid} = opts.body

        events[eid].voters.push(aid)

        return {
            body: {
                eid
            }
        }
    })

    fetchMock.put('/api/events/unvote', (url,opts) => {
        const {eid, aid} = opts.body

        events[eid].voters = events[eid].voters.filter(v => v !== aid)

        return {
            body: {
                eid
            }
        }
    })

    fetchMock.put('/api/events/assign', (url,opts) => {
        const {eid, aid} = opts.body

        events[eid].speaker = aid
        suggestions = suggestions.filter(e => e !== eid)
        queue.push(eid)

        return {
            body: {
                eid
            }
        }
    })
}
