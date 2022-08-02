//En este archivo de JavaScript, se van a obtener el cliente y el acceso a los documentos de Google
// Para eso primero se deben instalar las dependencias de Google (Escribiendo en la terminal "npm install googleapis")
// se obtiene el archivo de llaves en formato json (desde el google cloud, se usa una cuenta de servicio y se descargan las claves en formato json, y se agregan a la carpeta)
// Para tener acceso a las funciones de la api de google se usara un require
// El require es una manera de importar datos, la sintaxis es " const variable = require(ruta del archivo donde se encuentra el contenido)"
//Se crean 3 constantes, la primera para el acceso a los servicios, la segunda para obtener los datos del json, y la tercera con el ID de la hoja de calculo (el que se encuentra en la URL del archivo)
const { google } = require('googleapis')
const keys = require('./keys.json')
const spreadsheetId = '1XeW6OVaGNysZcvuogzIT3IVSnMoEjHUTb0K96DoLuis'

//Se crea un nuevo cliente(solo se hara una vez para todo el proyecto)
const client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
  'https://www.googleapis.com/auth/spreadsheets',
])

//Hacer una autorizacion para probar el acceso a las hojas de calculo, si se logra autorizar ejecutara una funcion
client.authorize().then(() => {
  console.log('Is Connected: ' + client.email)
  const email = client.email
  getSheet().then(() => {
    module.exports.data = {
      data,
      email,
    }
  })
})

// La constante sheets permite el acceso a la hoja, porque este envia el cliente a la API de Google para que la valide y permita la utilizacion de la misma
const sheets = google.sheets({ version: 'v4', auth: client })
const drive = google.drive({ version: 'v2', auth: client })

//Funcion de Prueba para la validacion del cliente
async function getSheet() {
  const sheetOptions = {
    spreadsheetId,
    range: 'Absence!A2:I6',
  }

  const sheetData = await sheets.spreadsheets.values.get(sheetOptions)
  data = sheetData.data.values
  // console.log(data)
}

//Se exportan la funcion, la constante Sheets(esto para evitar el tener que crearla en cada archivo), y el ID (para tener que crearlo en todos los archivos)
//Esta informacion se usara en la carpeta "Scripts"
// Aclaracion: en el package.json solo se debe modificar 1 cosa, este se genera automaticamente, pero podemos asignar una propiedad para ejecutar con el npm run
// en el objeto scripts se debe agregar otra propiedad con el nombre (en este caso execution) y el codigo a ejecutar, en las dependencias estaran todos los paquetes
// npm que instalamos (si copiamos eso manualmente no funcionara, se anexaran automaticamente despues de un npm install)
module.exports.getSheet = getSheet
module.exports.sheets = sheets
module.exports.spreadsheetId = spreadsheetId
