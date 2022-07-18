
//La explicacion del funcionamiento esta en ReadClasses
const { google } = require('googleapis');
const { sheets, getSheet, spreadsheetId } = require("../../main")
let dataLength = 0  

class Grades{
    constructor(id, grade, detail, section){
      this.id = id
      this.grade = grade
      this.detail = detail
      this.section = section
    }
  }
  

if(sheets)getGrades()
let valuesGrades = [];

async function getGrades(){
  
    const sheetOptions = {
        spreadsheetId:spreadsheetId,
        range: "Grades!A2:E14"
    }
    const dataSheet = await sheets.spreadsheets.values.get(sheetOptions)
     valuesGrades = await dataSheet.data.values.map((el) => new Grades(el[0], el[1], el[2],el[3]))
     // console.log(dataSheet)
    //console.log(dataSheet.data.values)

    module.exports.valuesGrades = valuesGrades
    dataLength = dataSheet.data.values.length
    module.exports.dataLength = dataLength
    return valuesGrades
}

module.exports.sheets = sheets
module.exports.getGrades = getGrades