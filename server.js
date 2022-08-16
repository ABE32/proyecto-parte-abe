//El archivo encargado de la creacion del servidor, para este son necesarias 3 dependencias mas nodemon (para detectar cambios y reiniciar el servidor), ejs (para poder utilizar codigo en formato ejs y archivos ejs) y express (para el servidor, la obtencion de informacion y la creacion de paginas en base a los ejs)
// Se requiere la informacion de todas las paginas para poder utilizar su informacion en ejs

const dataClasses = require('./scripts/form/absenceForm')
const schedulesByTeacher = require('./scripts/form/absenceForm')
const valuesStudents = require('./scripts/mantenimientos/readStudents')
const valuesGrades = require('./scripts/mantenimientos/readGrades')
const valuesAbsences = require('./scripts/form/getAbsence')

const { routerAbsence } = require('./routes/routeAbsence')
const { routerShowAbsence } = require('./routes/routeShowAbsence')
const { routerUpdate } = require('./routes/routeUpdate')
const { routerTeacher } = require('./routes/routeTeachers')
const { routerGrades } = require('./routes/routeGrades')
const { routerSchedules } = require('./routes/routeSchedules')
const express = require('express')
require('dotenv').config()
const driveFunctions = require('./scripts/form/appendImg')

let data = require('./main')
const url = require('url')
const { drive } = require('./main')
const absence = require('./scripts/form/absenceForm')
const app = express()

const port = 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('static'))

app.use('/absence', routerAbsence)
app.use('/showAbsence', routerShowAbsence)
app.use('/updateAbsence', routerUpdate)
app.use('/teachers', routerTeacher)
app.use('/Grades', routerGrades)
app.use('/schedules', routerSchedules)

data.client.oAuth2Client.on('tokens', (tokens) => {
	if (tokens.refresh_token) {
		// store the refresh_token in my database!
		console.log(tokens.refresh_token)
		process.env.TOKEN_AUTH = tokens
	}
	console.log(tokens.access_token)
})

app.get('/', async (req, res, next) => {
	if (process.env.TOKEN_AUTH == null || process.env.TOKEN_AUTH == undefined) {
		console.log('Sin TOKEN')
		const respuesta = await res.writeHead(301, {
			Location: data.client.authUrl,
		})
		if (respuesta) getToken(req, res).then(() => res.end())
	} else {
		res.render('index', data)
		getToken(req, res).then(() => res.end())
	}
})

app.get('/absence:id', (req, res) => {
	const id = req.params.id
	console.log(id)
	res.render('absence', {
		dataClasses,
		schedulesByTeacher,
		id,
		valuesStudents,
	})
})

app.post('/save', absence.save)
app.post('/delete:id', absence.delete)

app.set('view engine', 'ejs')
app.listen(port)

async function getToken(req, res) {
	console.log(`la URI es:` + req.url)
	let q = url.parse(req.url, true).query

	if (process.env.TOKEN_AUTH) {
		data.client.userCredential = process.env.TOKEN_AUTH
		console.log(process.env.TOKEN_AUTH, 'Token guardado')
	} else {
		let { tokens } = await data.client.oAuth2Client.getToken(q.code)
		data.client.oAuth2Client.setCredentials(tokens)
		data.client.userCredential = tokens
		process.env.TOKEN_AUTH = tokens
		console.log(process.env.TOKEN_AUTH, 'Token actualizado')
	}
}
