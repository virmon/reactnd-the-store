import checker from './checker'
import logger from './logger'
import notifyer from './notifyer'
import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux'

export default applyMiddleware(
    thunk,
    checker,
    notifyer,
    logger
)