const routerSchedules = require("express").Router();
const valuesSchedules = require('../scripts/mantenimientos/readSchedules');

routerSchedules.get('/', (req,res)=>{
    res.render('schedules', valuesSchedules) 
})

module.exports.routerSchedules = routerSchedules
