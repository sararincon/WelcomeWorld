const http = require('http')
const url = require('url')
const fs = require('fs')


http
.createServer(function (req, res) {

const params = url.parse(req.url, true).query
const nombre = params.archivo
const contenido = params.contenido
const nuevoNombre = params.nuevoNombre

if (req.url.includes('/crear')) {
    fs.writeFile(nombre, contenido, () => {
    res.write('Archivo creado con éxito!')
    res.end()
  })
  
}

if (req.url.includes('/leer')) {
    fs.readFile(nombre, (err, data) => {
    res.write(data)
    res.end()
})
} 

if (req.url.includes('/renombrar')) {
  fs.rename(nombre, nuevoNombre, (err, data) => {
     res.write(`archivo ${nombre} renombrado con exito como: ${nuevoNombre}`)
    res.end()
   })
  }

    
if (req.url.includes('/eliminar')) {
    fs.unlink(nuevoNombre, (err, data) => {
    res.write(`Archivo ${nuevoNombre} eliminado con éxito`)
    res.end()
    })
  }
})
.listen(8080, () => console.log('Server ON'))