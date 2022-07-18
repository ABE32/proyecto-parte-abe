//La explicacion del funcionamiento esta en ReadClasses
const { google } = require('googleapis');
const { sheets, getSheet, spreadsheetId} = require("../../main")
let dataLength = 0  

class Teacher{
    constructor(id,name,idFolder,email,form ){
        this.id = id
        this.name = name
        this.idFolder = idFolder
        this.email = email 
        this.form =form
    }
}

if(sheets)getTeachers()
let valuesTeachers = [];

async function getTeachers(){
  
    const sheetOptions = {
        spreadsheetId,
        range: "Teachers!A2:E50"
    }
    const dataSheet = await sheets.spreadsheets.values.get(sheetOptions)
     valuesTeachers = await dataSheet.data.values.map((el) => new Teacher(el[0], el[1], el[2],el[3], el[4]))
     // console.log(dataSheet)
   // console.log(dataSheet.data.values)
   module.exports.valuesTeachers = valuesTeachers
   dataLength = dataSheet.data.values.length
   module.exports.dataLength = dataLength 
   return valuesTeachers
}

module.exports.sheets = sheets
module.exports.getTeachers = getTeachers