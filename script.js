const http = require('http')
const url = require('url')
const fs = require('fs')


http
.createServer(function (req, res) {

const params = url.parse(req.url, true).query
const {archivo} = params
const {contenido} = params
const {nuevoNombre} = params

//Crear
if (req.url.includes('/crear')) {
    fs.writeFile(archivo, contenido, 'utf-8', (err, data) => {
      const year = new Date().getFullYear();
      const month = new Date().getMonth () 
      const day = new Date().getDay();
      const date = `${day}/${month < 10 ? '0' + month : month}/${year}`;
      console.log({date});
      if (err){

        res.end('El archivo no se pudo crear.')
      }else {
        
        res.end('Archivo creado con exito!')
    }
  })  
}

//Leer
if (req.url.includes('/leer')) {
    fs.readFile(archivo, (err, data) => {
      if (err){
        
        res.end('El archivo no se puede leer.')
      }else{
         
         res.end(data)
     } 
  })
} 

//Renombrar
if (req.url.includes('/renombrar')) {
  fs.rename(archivo, nuevoNombre, (err, data) => {
    if (err){
      res.end('Error al renombrar el archivo.')
    }else {
     res.end(`El archivo: ${archivo} ha sido renombrado con exito como: ${nuevoNombre}`)
    }
   })
  }

  //Eliminar    
if (req.url.includes('/eliminar')) {
  console.log(`Se esta procesando la eliminación del ${archivo}`);
  function eliminar(){
    fs.unlink(archivo, (err, data) => {
      if (err){
      res.end('Error al eliminar el archivo.')
      }else{
      res.end(`Archivo ${archivo} eliminado con exito`)
     }
   })
  }setTimeout(eliminar, 3000);
}

})
.listen(8080, () => console.log('Server ON'))