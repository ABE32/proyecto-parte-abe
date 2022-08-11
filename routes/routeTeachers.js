const routerTeacher = require("express").Router()

const valuesTeachers = require('../scripts/mantenimientos/readTeachers')


routerTeacher.get('/', (req, res)=>{
    res.render('teachers', valuesTeachers)
})

module.exports.routerTeacher = routerTeacher