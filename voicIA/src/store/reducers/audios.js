import {SET_AUDIOS} from '../actions/actionTypes'
import { Actions } from 'react-native-router-flux'

const initialState = {
    audios: []
    
}

const reducer = (state = initialState, action) => {
    
    switch (action.type) {
        case SET_AUDIOS:
            return {
                ...state,
                audios: action.payload
                }
             
            
        default:
            return state
    }
}

export default reducer