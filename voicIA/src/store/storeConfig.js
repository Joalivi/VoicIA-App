import {
    createStore, 
    combineReducers,
    compose,
    applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import userReducer from './reducers/user'
import messageReducer from './reducers/message'
import audiosReducer from './reducers/audios'

const reducers = combineReducers({
    user: userReducer,
    message: messageReducer,
    audios: audiosReducer
})

const storeConfig = () => {
    return createStore(reducers, compose(applyMiddleware(thunk)))
}

export default storeConfig