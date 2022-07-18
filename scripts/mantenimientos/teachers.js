
// Se crean constantes para el ID de la hoja de calculo y la constante "valueInputOption" para la funcion de creacion (en la linea 10)
const spreadsheetId =  "1XeW6OVaGNysZcvuogzIT3IVSnMoEjHUTb0K96DoLuis"
const valueInputOption =  "USER_ENTERED"
//Se requieren los archivos exportados de ReadTeachers y main
const {getTeachers, sheets} = require('./readTeachers')
const { getSheet} = require('../../main')

//validacion de la obtencion de sheets
if(sheets) getTeachers() 

//funcion para la creacion de una nueva entrada a la hoja de maestros, para facilitarla se utilizan los parametros range (para el rango a actualizar) y value (el valor o los valores que va a agregar a el rango)
async function setTeacher(value, range){
  //Se imprime en consola el rango para verificar si es la posicion correcta 
  console.log(range)
  //Se crea un objeto para las opciones (este se diferencia al de lectura, pues este utiliza 4 propiedades)
  // Las propiedades que recibe son el ID de la hoja, el rango a atualizar(En este caso se agrega el nombre de la Hoja, y las 2 celdas)
  //En el rango se utiliza la variable range, pero se le suma 2, porque al empezar en 0 el valor que iba a utilizar iba a ser menor al que debia utilizar (por ejemplo, para 15 celdas utilizaia 14), si solo se le sumaba uno iba a sobreescribir el valor (En el ejemplo de las 15 celdas, escribiria en la celda 15 donde ya habia un valor, y lo sobreescribirá)
  // El valueInputOption es la constante que se creo arriba, y el requestBody es un objeto con un arreglo bidimensional de lo que se va a agregar (como si fuera un SetValues en gs)
  const sheetOptions = {
    spreadsheetId,
    range: `Teachers!A${range + 2}:B${range + 2}`,
    valueInputOption,
    requestBody: {values: [[`NOTRE-TEACH-${range + 1}`, value]]}
  }
  // la constante que actualiza (update) los valores (values) de la hoja de calculo (spreadsheets), aqui se agrega el objeto con las opciones para la modificacion
  // tambien se le puede agregar una funcion para que envie el error o la respuesta (como un try-catch)
  const update = await sheets.spreadsheets.values.update(sheetOptions,(err, result) => {
    if(err){
      console.log(err)
    } else{
      console.log("Se han actualizado las celdas " + result)
    }
  })
}

//la funcion que guarda la informacion, esta recibe el valor desde el input, o los input, y se requiere la longitud del arreglo (para utilizarlo en el rango)
exports.save = (req, res)=>{
  let value = req.body.inputTeach
  let {dataLength} = require('./readTeachers')
  //Se ejecutan todas las promesas con un then para que se actualicen los datos, luego se refresque el contenido y se redirija a la pagina teachers con el contenido actualizado
  setTeacher(value, dataLength).then(() => getSheet()).then(()=> getTeachers()).then(()=>res.redirect('teachers'))
    }
