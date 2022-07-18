//requerimientos de la api google y de las3 constantes exportadas de main
const { google } = require("googleapis");
const {sheets, spreadsheetId, getSheet} = require('../../main');
//Creacion de una variable para obtener la longitud de los datos
let dataLength = 0

//Definicion de la clase para poder manipular la informacion
class Classes {
    constructor(id, detail, hours, idGrade, idTeacher){
      this.id = id
      this.detail = detail
      this.hours = hours
      this.idGrade = idGrade
      this.idTeacher = idTeacher
    }
  }

//Validacion de la obtencion de Sheets de main para ejecutar la funcion
if(sheets)getClasses()
//Definicion de un arreglo para los elementos obtenidos
let valuesClasses = []

//Funcion para obtener los datos de la hoja
async function getClasses(){
  //Un objeto que utiliza la API de Google para dirigirse a los parametros especificados para obtener informacion (necesita el ID de la hoja(que se requiere desde main), y el rango de celdas)
    const sheetOptions ={
        spreadsheetId,
        range:"Classes!A2:E144"
    }
    // Se crea una constante que esta igualado a la obtencion (get)de los valores (values) de la hoja (spreadsheets), usa como parametro el objeto de arriba
    const dataSheet = await sheets.spreadsheets.values.get(sheetOptions)
    //Igualando el arreglo a un map de los valores obtenidos y anexandolos a la Clase
    valuesClasses = await dataSheet.data.values.map((el)=> new Classes(el[0], el[1], el[2], el[3], el[4]))

    //Exportando los valores para su utilizacion en ejs (la explicacion de ejs estara en Server)
    module.exports.valuesClasses = valuesClasses
    dataLength = valuesClasses.length
    module.exports.dataLength = dataLength
    return valuesClasses
}
//Exportacion de la funcion 
//El codigo es practicamente igual en los otros archivos "Read", las unicas variaciones seran los nombres la Clase y el contenido exportado
module.exports.getClasses = getClasses