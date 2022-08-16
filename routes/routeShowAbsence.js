const routerShowAbsence = require('express').Router()
const { getFilesDrive, createFile } = require('../scripts/form/appendImg')
const abscencesByTeacher = require('../scripts/form/absenceForm')
const absence = require('../scripts/form/absenceForm')

routerShowAbsence.get('/', (req, res) => {
	getFilesDrive()
	createFile()
	res.render('showAbsence', { abscencesByTeacher })
})

routerShowAbsence.get('/:id', (req, res) => {
	let id = req.params.id
	res.render('showAbsence', { abscencesByTeacher, id })
})

module.exports.routerShowAbsence = routerShowAbsence
