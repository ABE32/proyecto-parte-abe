const routerSchedules = require('express').Router()
const valuesSchedules = require('../scripts/mantenimientos/readSchedules')
const valuesTeachers = require('../scripts/mantenimientos/readTeachers')
const valuesClasses = require('../scripts/mantenimientos/readClasses')

routerSchedules.get('/', (req, res) => {
	res.render('schedules', {
		valuesSchedules: valuesSchedules.valuesSchedules,
	})
})

routerSchedules.post('/search', async (req, res) => {
	if (req.body.condition == 'teacher') searchByTeacher(req, res)
	// if (req.body.condition == 'grade') searchByTeacher(req, res)
})

const searchByTeacher = async (req, res) => {
	const name = `${String(req.body.name).charAt(0).toUpperCase()}${String(
		req.body.name,
	)
		.slice(1)
		.toLowerCase()}`
	const teacher = await valuesTeachers.valuesTeachers.find((el) =>
		el.name.includes(name),
	)

	let schedulesFiltered = []

	if (teacher != undefined) {
		const clases = await valuesClasses.valuesClasses
			.filter((el) => el.idTeacher == teacher.id)
			.map((el) => el.id)

		clases.forEach((el) => {
			const schedule = valuesSchedules.valuesSchedules.find(
				(e) => e.idClass == el,
			)
			schedulesFiltered.push(schedule)
		})

		console.log(schedulesFiltered)
		res.render('schedules', { schedulesFiltered })
	} else {
		res.render('schedules', { schedulesFiltered })
	}
}
module.exports.routerSchedules = routerSchedules
