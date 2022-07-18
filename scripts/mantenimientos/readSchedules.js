//La explicacion del funcionamiento esta en ReadClasses
const { google } = require("googleapis");
const {sheets, spreadsheetId, getSheet} = require('../../main');
let dataLength = 0;
class Schedule{
  constructor(id,idClass, days){
    this.id = id
    this.idClass =idClass
    this.days = days
  }
}

if(sheets)getSchedules()

let valuesSchedules = []
async function getSchedules(){
  const sheetOptions = {
    spreadsheetId,
    range: "Schedules!A3:N145"
  }
  const dataSheet = await sheets.spreadsheets.values.get(sheetOptions)
  valuesSchedules = await dataSheet.data.values.map((el)=> new Schedule(el[0], el[1], [(["Lunes",el[2] ,  String(el[3]).split(",")]),(["Martes",el[4], String(el[5]).split(",")]),(["Miércoles", el[6], String(el[7]).split(",")]), (["Jueves", el[8], String(el[9]).split(",")]), (["Viernes", el[10], String(el[11]).split(",")]),(["Sábado", el[12], String(el[13]).split(",")]) ]))
  // console.log(valuesSchedules)
      module.exports.valuesSchedules = valuesSchedules
      dataLength = valuesSchedules.length
      module.exports.dataLength = dataLength
      return valuesSchedules
    }
    
    module.exports.getSchedules = getSchedules
