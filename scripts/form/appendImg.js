const { drive } = require('../../main')
const data = require('../../main')
async function createFile() {
	const fs = require('fs')
	const metaData = {
		title: 'grados.jpg',
	}
	const media = {
		mimeType: 'image/jpeg',
		body: fs.createReadStream('./static/img/grados.jpg'),
	}

	try {
		const file = await drive.files.create({
			resource: metaData,
			media,
			fields: 'id',
		})
		console.log('File ID:' + file.data)
		return file.data
	} catch (err) {
		console.error(err)
	}
}
let files = []

function getFilesDrive() {
	try {
		drive.files.list(
			{
				auth: data.client.oAuth2Client,
				pageSize: 10,
				fields: 'nextPageToken, files(id,name)',
			},
			(err1, res1) => {
				if (err1) {
					console.error('La API ha retornado un error: ' + err1)
				} else {
				}
				files = res1.data.files || []
				if (files.length) {
					console.log('files: ')
					files.map((el) => {
						console.log(`${el.name}  ${el.id}`)
					})
				} else {
					console.log('No files?')
				}
			},
		)
	} catch (err) {
		console.error(err)
	}
}

module.exports.getFilesDrive = getFilesDrive
module.exports.createFile = createFile
