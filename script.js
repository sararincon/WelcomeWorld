const http = require('http')
const url = require('url')
const fs = require('fs')


http
.createServer(function (req, res) {

const params = url.parse(req.url, true).query
const nombreArchvio = params.archivo
const contenido = params.contenido
const nuevoNombre = params.nuevoNombre

//Crear
if (req.url.includes('/crear')) {
    fs.writeFile(nombreArchvio, contenido, (err, data) => {
      if (err){
        res.write('El archivo no se pudo crear.')
        res.end()
      }else {
        res.write('Archivo creado con éxito!')
        res.end()
    }
  })  
}

//Leer
if (req.url.includes('/leer')) {
    fs.readFile(nombreArchvio, (err, data) => {
      if (err){
        res.write('El archivo no se puede leer.')
        res.end()
      }else{
         res.write(data)
         res.end()
     } 
  })
} 

//Renombrar
if (req.url.includes('/renombrar')) {
  fs.rename(nombreArchvio, nuevoNombre, (err, data) => {
    if (err){
      res.write('Error al renombrar el archivo.')
      res.end()
    }else {
     res.write(`El archivo: ${nombreArchvio} ha sido renombrado con exito como: ${nuevoNombre}`)
     res.end()
    }
   })
  }

  //Eliminar    
if (req.url.includes('/eliminar')) {
    fs.unlink(nombreArchvio, (err, data) => {
      if (err){
        res.write('Error al eliminar el archivo.')
        res.end()
      }else{
      res.write(`Archivo ${nombreArchvio} eliminado con éxito`)
      res.end()
     }
   })
  }
  
})
.listen(8080, () => console.log('Server ON'))