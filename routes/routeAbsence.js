const routerAbsence= require("express").Router()
const dataClasses = require('../scripts/form/absenceForm');
const schedulesByTeacher = require('../scripts/form/absenceForm');
const valuesStudents = require('../scripts/mantenimientos/readStudents');
const absence = require('../scripts/form/absenceForm');

routerAbsence.get('/', (req,res)=>{
    res.render('absence', {dataClasses, schedulesByTeacher})
})

// routerAbsence.get('/:id', (req, res)=>{
//     const id = req.params.id
//     console.log(id)
//     res.render('absence', {dataClasses, schedulesByTeacher, id, valuesStudents})
// })



module.exports.routerAbsence = routerAbsence
