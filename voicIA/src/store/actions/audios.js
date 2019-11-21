import {ADD_AUDIO} from './actionTypes'
import axios from 'axios'
import { anyTypeAnnotation } from '@babel/types'


export const addAudio = audio =>{
    return dispatch =>{
        axios.post('/audios.json', {...audio})
        .catch(err => console.log(err))
        .then(res => console.log(res.data))
    }
}