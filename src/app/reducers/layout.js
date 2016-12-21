import { createReducer } from 'redux-act'
import { startProcessing, endProcessing, errorProcessing } from '../actions/core'

export default createReducer({
    [startProcessing]: (state, payload) => {
        return Object.assign({}, state, {
            errorProcessing: null,
            processing: true
        })
    },
    [endProcessing]: (state, payload) => {
        return Object.assign({}, state, {
            errorProcessing: null,
            processing: false
        })
    },
    [errorProcessing]: (state, payload) => {
        return Object.assign({}, state, {
            errorProcessing: payload,
            processing: false
        })
    },
    '@@router/LOCATION_CHANGE': (state, payload) => {

        let activeView;
        switch(payload.pathname) {
            case '/suggestions':
                activeView = 'suggestions'
                break;
            case '/':
                activeView = 'dashboard'
                break;
            case '/queue':
                activeView = 'queue'
                break;
            case '/archive':
                activeView = 'archive'
                break;
            case '/new':
                activeView = 'new'
                break;
            default:
                activeView = 'dashboard'
        }

        return Object.assign({}, state, {
            activeView
        })
    }
}, {
    activeView: 'dashboard',
    processing: false,
    errorProcessing: null
})
