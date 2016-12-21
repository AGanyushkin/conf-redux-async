import { createAction } from 'redux-act'

export const startProcessing = createAction('START_PROCESSING')
export const endProcessing = createAction('END_PROCESSING')
export const errorProcessing = createAction('ERROR_PROCESSING')

export const account = createAction()
