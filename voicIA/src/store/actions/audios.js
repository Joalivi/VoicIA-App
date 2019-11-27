import {SET_AUDIOS} from './actionTypes'
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
                .then(res => {
                    dispatch (fetchAudios())
                })
            })
        
    }
    
}

export const setAudios = audios => {
    return {
        type: SET_AUDIOS,
        payload: audios
    }
}

export const fetchAudios = () => {
    return dispatch => {
        axios.get('/audios.json')
            .catch(err => console.log(err))
            .then(res =>{
                const rawAudios = res.data
                const audios = []
                for(let key in rawAudios){
                    audios.push({
                        ...rawAudios[key],
                        id: key  
                    })
                }
                dispatch(setAudios(audios.reverse()))
            })
    }
}