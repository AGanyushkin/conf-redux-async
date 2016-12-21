import { createReducer } from 'redux-act'
import { account } from '../actions/core'

export default createReducer({
    [account]: (state, payload) => {
        return Object.assign({}, state, {
            aid: null,
            accountById: Object.assign({}, state.accountById)
        })
    }
}, {
    aid: 666,
    accountById: {
        666: {name: "Account 666 name"},
        555: {name: "Account 555 name"},
        444: {name: "Account 444 name"}
    }
})
