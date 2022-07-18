// La obtencion de datos sehizo igual que en ReadClasses (ir a revisar ReadClasses si no se ha visto para entender el funcionamiento del codigo)
const {google} = require('googleapis');
const {sheets, getSheet, spreadsheetId} = require('../../main');
let dataLength = 0
let valuesAbsences = []
class Absence{
    constructor(id, idGrade, idClass, idTeacher, idStudent, date, hour, detail, attachment){
      this.id = id
      this.idGrade = idGrade
      this.idClass = idClass
      this.idTeacher= idTeacher
      this.idStudent = idStudent
      this.date = date
      this.hour = hour
      this.detail = detail
      this.attachment = attachment
    }
  }
  if(sheets)getAbsence()

  async function getAbsence(){
      const sheetOptions ={
          spreadsheetId,
          range:"Absence!A2:I20"
      }
      const dataSheet = await sheets.spreadsheets.values.get(sheetOptions)
      const data = await dataSheet.data.values
      valuesAbsences = data.map((el)=> new Absence(el[0], el[1], el[2], el[3], el[4], el[5], el[6], el[7], el[8]))
      module.exports.valuesAbsences = valuesAbsences
      dataLength = valuesAbsences.length
      module.exports.dataLength = dataLength
      return valuesAbsences
  }

  module.exports.getAbsence = getAbsence