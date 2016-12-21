import '../polyfills'
import { createAction } from 'redux-act'
import { push } from 'react-router-redux'
import { endProcessing, startProcessing, errorProcessing } from '../actions/core'

export const loadEvents = createAction('LOAD_EVENTS')
export const loadNextEvents = createAction('LOAD_NEXT_EVENTS')
export const loadCompleted = createAction('LOAD_COMPLETED')
export const loadQueue = createAction('LOAD_QUEUE')
export const loadSuggestions = createAction('LOAD_SUGGESTIONS')
export const putNewEvent = createAction('PUT_NEW_EVENT')

export const events = createAction('EVENTS')
export const nextEvents = createAction('NEXT_EVENTS')
export const completed = createAction('COMPLETED')
export const queue = createAction('QUEUE')
export const suggestions = createAction('SUGGESTIONS')

export const like = createAction('LIKE')
export const dislike = createAction('DISLIKE')
export const assign = createAction('ASSIGN')
