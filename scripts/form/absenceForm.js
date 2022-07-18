//se requieren datos de todos los archivos para utilizarlos
const {getAbsence} = require('./getAbsence');
const {sheets, spreadsheetId, data, getSheet} = require('../../main');
const {valueInputOption} = require('../mantenimientos/teachers');
const {getGrades} = require('../mantenimientos/readGrades')
const {getTeachers} = require('../mantenimientos/readTeachers')
const {getSchedules} = require('../mantenimientos/readSchedules');
const {getStudents} = require('../mantenimientos/readStudents');
const {getClasses} = require('../mantenimientos/readClasses');
const { servicebroker } = require('googleapis/build/src/apis/servicebroker');
const email = "serlismaldonado@gmail.com"
let fecha = new Date()

let idTeacher 
//  getTeachers().then((r)=> {idTeacher = r.find((el)=>el.email == email).id
//     console.log(idTeacher)
// })
if(sheets)getAbsence()

getClassByIdTeacher()
//Funcion asincrona que se utiliza para filtrar las clases en base al email del maestro
async function getClassByIdTeacher(){
    //la variable idTeacher (definidaen la linea 13) recibe el resultado de la funcion getTeachers
    //Se debe poner un await porque es una funcion asincrona, y con el resultado luego se buscara con un find el id del maestro que tenga el mismo email 
    //Se utiliza find porque solo se necesita 1 coincidencia
    idTeacher = await  getTeachers().then((r)=>idTeacher = r.find((el)=>el.email == email).id)
    //Se define una constante que es el filtro de todas las clases que son impartidas por ese maestro (utilizando su id)
    const dataClasses = await getClasses().then((r)=>r.filter((el)=> el.idTeacher == idTeacher))
    //Se crea una nueva instancia del arreglo de las clases filtradas para usar solo su id, que esta en la hoja de horarios (revisar en la hoja de datos)
    const classesById = dataClasses.map((el)=> el.id)
    // Se define un arreglo vacio para anexar los horarios filtrados
    const schedulesByTeacher =[]
    // Se hace un await para recibir los horarios (es una funcion asincrona), y luego de recibir la respuesta, se ejecuta un forEach al arreglo de id de las clases, para que se recorra cada elemento del arreglo, y dentro del ciclo forEach se hara un find, para encontrar una coincidencia
    // Como el find se hace dentro de un forEach, para cada elemento se busacara un id que coincida, y eso se anexara al areglo con un push
    await getSchedules().then((r)=> classesById.forEach((el)=>{schedulesByTeacher.push(r.find((e)=> e.idClass == el))}))
    const abscencesByTeacher = await getAbsence().then(r=> r.filter((el)=> el.idTeacher == idTeacher))
    module.exports.abscencesByTeacher = abscencesByTeacher
    module.exports.dataClasses = dataClasses
    module.exports.schedulesByTeacher = schedulesByTeacher
}

//funcion para anexar las ausencias (Se utilizara mas adelante en el proyecto)
async function setAbsence(name,grade, idClass , teacher, date,hour,range,detail, attachment){
    let sheetOptions = {
        spreadsheetId,
        range: `Absence!A${range + 2}:I${range + 2}`,
        valueInputOption : "USER_ENTERED",
        requestBody: {values: [[`NOTRE-ASIST-${range+1}-${new Date().getDate()}-${new Date().getMonth() +1}`,grade,idClass,teacher,name,date,hour,detail,attachment]]}
    }
    const update = await sheets.spreadsheets.values.update(sheetOptions, (err, result)=>{
        if(err){
            console.log(err)
        }else{
            console.log("Never Gonna give You Up")
        }
    })
}




    async function getGrade(value){
        let clases =await getClasses().then((r)=> r.find((el)=> el.id == value))
        let grade = clases.idGrade
        return grade
    }

    async function getClass(value){
        let res = await (await getClasses().then((r)=> r.find((el) => el.id  == value))).id
        return res
    }
    
exports.save = (req,res)=>{
    let valueClass = req.body.class
    let valueDate = req.body.date
    let valueHour = req.body.classHour
    let valueName = req.body.name
    let attachment = req.body.attachment
    let valueDetail = req.body.detail
    let {dataLength} = require('./getAbsence');
    
    //Promesas: grade, name, idClass
    // async function getPromises(){
    //     let grade = await getGrade(valueClass)
    //     let idClass = await getClass(valueClass)
    //     let name = await getStudents().then((r)=> r.find((el)=> el.name == valueName).id)
    //     let idTeacher = await getClasses().then((r)=> r.find((el)=> el.id == idClass).idTeacher)
    //     return {grade,idClass,name, idTeacher}
    // }
    // getPromises().then((r)=>setAbsence(r.name, r.grade, r.idClass, r.idTeacher, valueDate, valueHour, dataLength, valueDetail, attachment).then(()=>getSheet()).then(()=> getAbsence()).then(()=>getClassByIdTeacher()).then(()=> res.redirect('showAbsence')))
}

exports.update = (req,res)=>{
    let idStudent = req.body.student
    let date = req.body.date
    let hour = req.body.hour
    let detailValue = req.body.info
    let attachment = req.body.attach
    let idAbsence = String(req.url).slice(8,)
    console.log(idAbsence)
    async function getAbsenceInfo(){
        let index
        let data
        let idTeacher
        let idClass
        let idGrade;
        await getAbsence().then((r)=> r.forEach((el,i)=> {if(el.id == idAbsence){index = i, idTeacher = el.idTeacher, idClass = el.idClass, idGrade = el.idGrade}}))
        return {index, idTeacher, idClass, idGrade}
    }
    getAbsenceInfo().then((r)=>{console.log("\n nombre:" + idStudent, "\n grado:" + r.idGrade, "\n clase:" + r.idClass, "\n teacher:" + r.idTeacher, "\n fecha:"+ date, "\n hora:"+ hour, "\n rango:" + r.index, "\n detalle:" + detailValue)})

    getAbsenceInfo().then((r)=>setAbsence(idStudent, r.idGrade, r.idClass, r.idTeacher, date, hour, r.index, detailValue, attachment).then(()=>getSheet()).then(()=>getAbsence()).then(()=>getClassByIdTeacher()).then(()=> res.redirect('showAbsence')))
}

exports.delete = (req,res)=>{
    let url = String(req.url).slice(8,)
    console.log(url)
    async function getCell(){
        let index
        await getAbsence().then((r)=>r.forEach((el, i)=>{if(el.id == url){index = i + 1}}))
        return {index}
    }
  async function doRequest(index){
    const requests = {"requests":[{
        deleteDimension:{
            range:{
                sheetId: 0,
                dimension: "ROWS",
                startIndex: index.index,
                endIndex :index.index + 1
            }
        }
    }]}
    return requests
}


async function deleteCells(body){
    const request = body
    try{
        const response = await sheets.spreadsheets.batchUpdate({
            spreadsheetId,
            requestBody:request
        })
        console.log('Se ha eliminado la celda')
    }catch(err){
        console.error(err)
    }
}

getCell().then((r)=> doRequest(r).then((re)=>deleteCells(re).then(()=>getSheet()).then(()=>getAbsence()).then(()=>getClassByIdTeacher()).then(()=> res.redirect('showAbsence'))))
}

