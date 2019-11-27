const functions = require('firebase-functions');
const cors = require('cors')({origin: true})
const fs = require('fs')
const uuid = require('uuid-v4')
const {Storage} = require('@google-cloud/storage')
const storage = new Storage({
    projectId: 'voicia',
    keyFilename: 'voicia-firebase.json'
})

exports.uploadAudio = functions.https.onRequest((request, response) => {
    cors(request, response, () =>{
        try{
            fs.writeFileSync('./tmp/hello.mp4', './tmp/hello.mp4', 'mp4')
            const bucket = storage.bucket('voicia.appspot.com')
            const id = uuid()
            bucket.upload('../tmp/hello.mp4',{
                uploadType: 'media',
                destination: `/audios/${id}`,
                metadata: {
                    metadata: {
                        contentType: 'audio/mp4',
                        firebaseStorageDownloadTokens: id
                    }
                }
            }), (err, file) => {
                if(err) {
                    console.log('heyhey1' + err)
                    return response.status(500).json({error:err})
                } else {
                    const fileName = encodeURIComponent(file.name)
                    const audioUrl = 'https://firebasestorage.googleapis.com/v0/b/'
                    + bucket.name + '/o/' + fileName + '?alt=media&token=' + id
                    return response.status(201).json({audioUrl: audioUrl})
                }
            }
            
        } catch(err){
            console.log('HeuHey2' + err)
            return response.status(500).json({error:err})
        }
    
    })
});
