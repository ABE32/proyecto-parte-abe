const routerSchedules = require('express').Router()
const valuesSchedules = require('../scripts/mantenimientos/readSchedules')
const valuesTeachers = require('../scripts/mantenimientos/readTeachers')
const valuesClasses = require('../scripts/mantenimientos/readClasses')
const res = require('express/lib/response')

routerSchedules.get('/', (req, res) => {
	res.render('schedules', {
		valuesSchedules: valuesSchedules.valuesSchedules,
	})
})

routerSchedules.post('/search', async (req, res) => {
	//Validar con que dato se va a filtrar los horarios
	if (req.body.condition == 'teacher') searchByTeacher(req, res)
})

//grados
routerSchedules.post('/search', async (req, res) => {
	//validar con que dato se  va a filtrar los horarios
	if (req.body.condition == 'grade') searchByGrade(req, res)
})

//FILTROS GRADES
const searchByGrade = async (req, res) => {
	const grade = []
}

// FILTROS
const searchByTeacher = async (req, res) => {
	if (req.body.name == '') {
		res.render('schedules', {
			valuesSchedules: valuesSchedules.valuesSchedules,
		})
	}
	// const clases = valuesClasses.valuesClasses.map(el => el)
	// console.log(clases)
	const clases = []
	//Obtener el nombre y validar la inicial a Mayùscula
	const name = `${String(req.body.name).charAt(0).toUpperCase()}${String(
		req.body.name
	)
		.slice(1)
		.toLowerCase()}`
	//Obtener la data del profesor en el caso de que sea encontrado
	const teacher = await valuesTeachers.valuesTeachers.find((el) =>
		el.name.includes(name)
	)

	//Definimos array para los daos filtrados
	let schedulesFiltered = []

	//validamos que exista el profesor
	if (teacher != undefined) {
		// Obtenemos las clasess del profesor y mapeamos los IDS
		const clases = await valuesClasses.valuesClasses
			.filter((el) => el.idTeacher == teacher.id)
			.map((el) => {
				const data = {
					id: el.id,
					detail: el.detail,
				}
				return data
			})

		//Recorremos cada una de las clases y obtenemos su horario y lo agregammos al array
		// de schedulesFiltereds
		clases.forEach((el) => {
			const schedule = valuesSchedules.valuesSchedules.find(
				(e) => e.idClass == el.id
			)
			schedulesFiltered.push(schedule)
		})

		res.render('schedules', { schedulesFiltered, clases })
		schedulesFiltered = []
	} else {
		res.render('schedules', {
			valuesSchedules: valuesSchedules.valuesSchedules,
			clases,
		})
	}
}
// async function searchByGrade(req, res){
// }

module.exports.routerSchedules = routerSchedules
