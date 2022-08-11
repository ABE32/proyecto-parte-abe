//El archivo encargado de la creacion del servidor, para este son necesarias 3 dependencias mas nodemon (para detectar cambios y reiniciar el servidor), ejs (para poder utilizar codigo en formato ejs y archivos ejs) y express (para el servidor, la obtencion de informacion y la creacion de paginas en base a los ejs)
// Se requiere la informacion de todas las paginas para poder utilizar su informacion en ejs

const dataClasses = require('./scripts/form/absenceForm');
const schedulesByTeacher = require('./scripts/form/absenceForm');
const valuesStudents = require('./scripts/mantenimientos/readStudents');
const valuesGrades  = require('./scripts/mantenimientos/readGrades');
const valuesAbsences = require('./scripts/form/getAbsence');

const {routerAbsence} = require('./routes/routeAbsence');
const {routerShowAbsence} = require('./routes/routeShowAbsence');
const {routerUpdate} = require('./routes/routeUpdate');
const {routerTeacher} = require('./routes/routeTeachers');
const {routerGrades} = require('./routes/routeGrades');
const {routerSchedules} = require('./routes/routeSchedules');
const express = require('express');

let data = require('./main')

const absence = require('./scripts/form/absenceForm');
const app = express()



const port = 3000
app.get('/', (req, res)=>{
    res.render('index', data)
})

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static('static'))

app.use('/absence', routerAbsence)
app.use('/showAbsence', routerShowAbsence)
app.use('/updateAbsence', routerUpdate)
app.use('/teachers', routerTeacher)
app.use('/Grades', routerGrades)
app.use('/schedules', routerSchedules)

app.get('/absence:id', (req, res)=>{
    const id = req.params.id
    console.log(id)
    res.render('absence', {dataClasses, schedulesByTeacher, id, valuesStudents})
})

// app.get('/updateAbsence:id', (req, res)=>{
//     const id = req.params.id
//     res.render('updateAbsence', {valuesAbsences,id,dataClasses, schedulesByTeacher, valuesStudents, valuesGrades})
// })
// app.post('/update:id', absence.update)
app.post('/save', absence.save)
app.post('/delete:id', absence.delete)

app.set("view engine","ejs")
app.listen(port)