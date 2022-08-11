// const { drive } = require('googleapis/build/src/apis/drive');
// const { file } = require('googleapis/build/src/apis/file');

const {drive} = require('../../main');
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

async function filesScout(){
    try{
        const res = await drive.files.list({
            q: 'mimeType=\'image/jpeg\'',
            fields: 'nextPageToken, files(id, name)',
            spaces: 'drive',
        });
        Array.prototype.push.apply(files, res.files)
        res.data.files.forEach(file => {
            console.log('Se encontró: ' + file.name)
        });
        return res.data.files
    }catch(err){
        console.error(err);
    }
}

module.exports.filesScout = filesScout
module.exports.createFile = createFile
