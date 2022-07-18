//Se hacen importaciones require al archivo de lectura, al archivo teachers (ir al archivo teachers para revisar lo que se importo), y al archivo main (ir al archivo main para revisar lo que se importo)
//Aclaracion: En la explicacion de main, se explica acerca del require (ir a main a revisar de ser necesario), pero si se agrega el nombre entre llaves de la variable en el require, se obtiene solo esa 
// variable del archivo requerido
const {valueInputOption} = require('./teachers')
const {getGrades} = require('./readGrades')
const { getSheet, sheets, spreadsheetId} = require('../../main')

//Validacion para verificar que se esta obteniendo el contenido del archivo main
if(sheets)getGrades()

//Funcion para actualizar el Grado (de ser necesario)
async function setGrade(value,range){
    const sheetOptions = {
        spreadsheetId,
        range: `Grades!A${range + 2}:D${range + 2}`,
        valueInputOption,
        requestBody: {values: [[value]]}
    }
    const update = await sheets.spreadsheets.values.update(sheetOptions, (err, result)=>{
        if(err){console.log(err)} else console.log(result)
    })

}

//Utilizacion de ejs para actualizar la informacion (de ser necesario, la explicacion esta en teachers)
exports.save = (req,res)=>{
    let value = req.body.inputGrade
    let {dataLength} = require('./readGrades')
    setGrade(value,dataLength).then(()=>getSheet()).then(()=>getGrades()).then(()=> res.redirect('Grades'))
}