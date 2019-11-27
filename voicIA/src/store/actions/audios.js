import {ADD_AUDIO} from './actionTypes'
import axios from 'axios'
import { anyTypeAnnotation } from '@babel/types'

export const addAudio = audio =>{
    return dispatch =>{
        axios({
            url: 'uploadAudio',
            baseURL: 'https://us-central1-voicia.cloudfunctions.net/uploadAudio',
            method: 'post',
            data: {
                audio: 'hello.mp4'
            }
        })
            .catch(err => console.log("Amigo estou aqui " + err))
            .then(resp =>{
                audio.uri = audio.uri
                axios.post('/audios.json', {...audio})
                .catch(err => console.log(err))
                .then(res => console.log(res.data))
            })
        
    }
}