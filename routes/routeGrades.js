const routerGrades = require("express").Router()

const dataGrades = require('../scripts/mantenimientos/Grades');
const valuesGrades  = require('../scripts/mantenimientos/readGrades');

routerGrades.get('/', (req, res)=>{
    res.render('Grades', valuesGrades)
})

module.exports.routerGrades = routerGrades