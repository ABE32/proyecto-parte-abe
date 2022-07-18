//El archivo encargado de la creacion del servidor, para este son necesarias 3 dependencias mas nodemon (para detectar cambios y reiniciar el servidor), ejs (para poder utilizar codigo en formato ejs y archivos ejs) y express (para el servidor, la obtencion de informacion y la creacion de paginas en base a los ejs)
// Se requiere la informacion de todas las paginas para poder utilizar su informacion en ejs
const dataGrades = require('./scripts/mantenimientos/Grades');
const dataClasses = require('./scripts/form/absenceForm');
const valuesGrades  = require('./scripts/mantenimientos/readGrades');
const valuesTeachers = require('./scripts/mantenimientos/readTeachers')
const valuesSchedules = require('./scripts/mantenimientos/readSchedules');
const schedulesByTeacher = require('./scripts/form/absenceForm');
const valuesAbsences = require('./scripts/form/getAbsence');
const valuesStudents = require('./scripts/mantenimientos/readStudents');
const abscencesByTeacher = require('./scripts/form/absenceForm');
//Se requiere la libreria express
const express = require('express');
//const { json } = require('express/lib/response');
let data = require('./main')
//Se abre la app web con la funcion express
const app = express()
//se define una constante para que el servidor despues entre a ese puerto en la web local
const port = 3000

// Para la app se utiliza un metodo get, que permite agarrar el contenido de una vista (que debe estar en la carpeta views), con un metodo render, que como su nombre lo indica, se renderiza el contenido de lo que se le envia a la vista (la explicacion del renderizado estara en las vistas)
app.get('/', (req, res)=>{
    res.render('index', data)
})

// Se utilizan los metodos use para el post de un formulario, es decir, recibe la informacion para que pueda ser utilizada en el exports save (utilizad en el archivo teachers, linea 38)
app.use(express.urlencoded({extended:false}))
app.use(express.json())
//Este metodo se utiliza para recopilar informacion de la carpeta static, donde estaran guardados los archivos css para el diseño de las paginas del servidor
app.use(express.static('static'))

//Datos de los maestros con app get (igual que la linea 18)
app.get('/teachers', (req, res)=>{
    res.render('teachers', valuesTeachers)
})


const absence = require('./scripts/form/absenceForm');
const res = require('express/lib/response');
// Se hace el post aqui con el .save del exports.save en la hoja absence, para enviar el dato del formulario
app.post('/save', absence.save)
app.post('/update:id', absence.update)
app.post('/delete:id', absence.delete)

//Get para la informacion de los horarios
app.get('/schedules', (req,res)=>{
    res.render('schedules', valuesSchedules) 
})

//Datos de los grados
app.get('/Grades', (req, res)=>{
    res.render('Grades', valuesGrades)
})

// Datos de las ausencias, este get es un caso especial, debido a que para comodidad del renderizado, se enviara un objeto con propiedades (que se anexaran mas adelante), de esa manera, se pueden enviar mas datos
app.get('/absence', (req, res)=>{
    res.render('absence', {dataClasses, schedulesByTeacher})
})

app.get('/showAbsence', (req,res)=>{
    res.render('showAbsence', {abscencesByTeacher})
})

app.get('/showAbsence:id', (req,res)=>{
    let id= req.params.id
    res.render('showAbsence', {abscencesByTeacher, id})
})

// const res = require('express/lib/response');
// app.post('/save', dataGrades.save)

app.get('/updateAbsence', (req, res)=>{
    res.render('updateAbsence', valuesAbsences )
})

app.get('/updateAbsence:id', (req, res)=>{
    const id = req.params.id
    res.render('updateAbsence', {valuesAbsences,id,dataClasses, schedulesByTeacher, valuesStudents})
})

//Esto permite definir el tipo de vista que queremos usar y que formato
app.set("view engine","ejs")
//Y aqui asignamos el puerto, que etsaba definido en la constante
app.listen(port)

//Esta es la segunda vista de las ausencias, aqui se recibe un id que se envia del ejs de las ausencias, y se renderiza, junto a otros datos, que son los horarios filtrados por el email del maestro y el id de la clase que se selecciono
app.get('/absence:id', (req, res)=>{
    const id = req.params.id
    console.log(id)
    res.render('absence', {dataClasses, schedulesByTeacher, id, valuesStudents})
})