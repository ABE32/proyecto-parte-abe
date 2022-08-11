const routerUpdate = require("express").Router();
const dataClasses = require('../scripts/form/absenceForm');
const valuesGrades  = require('../scripts/mantenimientos/readGrades');
const schedulesByTeacher = require('../scripts/form/absenceForm');
const valuesAbsences = require('../scripts/form/getAbsence');
const valuesStudents = require('../scripts/mantenimientos/readStudents');
const absence = require('../scripts/form/absenceForm');


// routerUpdate.get('/', (req, res)=>{
//     res.render('updateAbsence', valuesAbsences)
// })
routerUpdate.get('/:id', (req, res)=>{
    const id = req.params.id
    console.log(id)
    res.render('updateAbsence', {valuesAbsences,id,dataClasses, schedulesByTeacher, valuesStudents, valuesGrades})
})
routerUpdate.post('/update:id', absence.update)

module.exports.routerUpdate = routerUpdate