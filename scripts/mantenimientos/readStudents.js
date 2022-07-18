//La explicacion del funcionamiento esta en ReadClasses
const { google} = require('googleapis');
const { sheets, getSheet, spreadsheetId} = require('../../main');
let dataLength = 0;

class Student{
    constructor(id, name, idGrade){
      this.id = id
      this.name = name
      this.idGrade = idGrade
    }
  }

if(sheets)getStudents()
let valuesStudents = []

async function getStudents(){
    const sheetOptions ={
        spreadsheetId,
        range: "Students!A2:C259"
    }
    const data = await sheets.spreadsheets.values.get(sheetOptions)
    valuesStudents =  await data.data.values.map((el)=> new Student(el[0], el[1], el[2])) 
     
    module.exports.valuesStudents = valuesStudents
    dataLength = valuesStudents.length
    module.exports.dataLength = dataLength
    return valuesStudents
}

module.exports.getStudents = getStudents

