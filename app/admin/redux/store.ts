import { legacy_createStore as createStore } from 'redux'
import areaReducer from './reducers/areaReducers'

const store = createStore(areaReducer)

export default store
