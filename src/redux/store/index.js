/* eslint-disable no-undefined */

import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducers from '../reducers'

//here is our initial state
let initState = {
}

const middelwares = [thunk]

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production') {
  middelwares.push(logger)
}

const store = createStore(rootReducers, initState, applyMiddleware(...middelwares))
//here we are subscribing any change into the store and will store that into our local store
export default store
