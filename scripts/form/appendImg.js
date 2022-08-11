// const { drive } = require('googleapis/build/src/apis/drive');
// const { file } = require('googleapis/build/src/apis/file');

const { file } = require('googleapis/build/src/apis/file');
const {drive} = require('../../main');
const data = require('../../main');
async function createFile(){
const fs = require('fs')
const metaData = {
    'title': 'grados.jpg'
}
const media = {
    mimeType: 'image/jpeg',
    body: fs.createReadStream('./static/img/grados.jpg')
}

try{
    const file = await drive.files.create({
        resource: metaData,
        media,
        fields: 'id'
    })
    console.log('File ID:' + file.data.id)
    return file.data.id
}catch(err){
    console.error(err)
}
}
const files = []


function filesScout(){
    try{
        drive.files.list({
            auth: data.client.oAuth2Client,
            pageSize: 10,
            fields: 'nextPageToken, files(id,name)'
        }, (err1, res1)=>{
            if(err1){
                console.error('La API ha retornado un error: '+ err1)
            }
            const files = res1.data.files
            if(files.length){
                console.log('files: ')
                files.map((el)=>{console.log(`${el.name}  ${el.id}`)})

            }else{
                console.log('No files?')
            }
        });
        // Array.prototype.push.apply(files, res.files)
        // res.data.files.forEach(file => {
        //     console.log('Se encontró: ' + file.name)
        // });
        // return res.data.files
    }catch(err){
        console.error(err);
    }
}

module.exports.filesScout = filesScout
module.exports.createFile = createFile
