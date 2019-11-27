import {ADD_AUDIO} from '../actions/actionTypes'
import { Actions } from 'react-native-router-flux'

const initialState = {
    audios: [{
        id: Math.random(),
        user_id: '',
        uri: null
    }]
    
}

const reducer = (state = initialState, action) => {
    
    switch (action.type) {
        case ADD_AUDIO:
            return {
                ...state,
                audios: state.audios.concat({
                    ...action.payload
                })
                
            }
        default:
            return state
    }
}

export default reducer