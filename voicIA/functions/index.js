const functions = require('firebase-functions');
const cors = require('cors')({origin: true})
const fs = require('fs')
const uuid = require('uuid-v4')
const {Storage} = require('@google-cloud/storage')
const storage = new Storage({
    projectId: 'voicia',
    keyFilename: 'voicia-firebase'
})

exports.uploadAudio = functions.https.onRequest((request, response) => {
    cors(request, response, () =>{
        
    })
});
