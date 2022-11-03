*
WEBSERVER PARA NODE 
REFERENCIA https://developer.mozilla.org/es/docs/Learn/Server-side/Express_Nodejs/Introduction
*/
var express = require('express');
var TpArq = express();
/*
Para manejar HTTP POST Vía Express.js versión 4 o superior, es necesario instalar un package que funcione como middleware -> body-parser.
Este módulo body-parser analiza el JSON, el búfer, la cadena y los datos codificados URL enviados mediante la solicitud HTTP POST. 
*/
var bodyParser = require('body-parser');
//Driver de MYSQL Para Node
var mysql = require('mysql');
  
TpArq.use(bodyParser.json());
TpArq.use(bodyParser.urlencoded({
    extended: true
}));
  
  
// Index para contestar Algou
TpArq.get('/', function (req, res) {
    return res.send({message: 'Hola Este es el Index :D' })
});
// Cargo la array para conectarme a la DB y crear el cursor
var CursorDB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'arqweb'
});
  
// Instanciamos el Driver 
CursorDB.connect(); 
 
 
/*
aca retornamos los alumnos con toda la data vía get,
definimos la ruta GET: http:dominio.local/alumnos  
*/
TpArq.get('/alumno', function (req, res) {
    //querydb
    CursorDB.query('SELECT * FROM alumnos', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Listado de Alumnos' });
    });
});
 
/*
aca retornamos un alumno especitfico con toda la data vía get,
definimos la ruta GET: http:dominio.local/alumnos/$IDALUMNO  
*/
TpArq.get('/alumno/:id', function (req, res) {

    let alumno_id = req.params.id;
     if (isNaN(alumno_id)) {
        return res.status(400).send({ error: true, message: 'aca retornamos un alumno especitfico con toda la data vía get. Definimos la ruta GET: http:dominio.local/alumnos/$IDALUMNO Porfa Manda un numuerín' });
    }
  // query daba
    CursorDB.query('SELECT * FROM alumnos where id=?', alumno_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ data: results[0], message: 'Alumno: ' });
    });
  
});
 
/*
aca creamos un alumno, definimos la ruta POST:http:dominio.local/alumnos/$IDALUMNO 
Ejemplo JSON:
HEADER:  Content-Type - application/json
{
        "nombre": "Julian",
        "mail": "elpuchu@puchin.org"
}
*/
TpArq.post('/alumno', function (req, res) {
  
    let alumno = req.body.nombre;
    let mail = req.body.mail;
    
    if (!alumno) {
        return res.status(400).send({ error:true, message: 'Por favor agregue un alumno, el body esta vacio o invalido revisar readme para info' });
    }
  
    CursorDB.query("INSERT INTO alumnos SET ? ", { nombre: alumno , mail: mail }, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'el alumno se creo exitosamente' });
    });
});
 
 
/*
aca EDITAMOS un alumno, definimos la ruta PUT:http:dominio.local/alumno
En el body del request enviamos:
HEADER:  Content-Type - application/json
{
            "id": 1,
            "mail": "pumon",
            "nombre": "Edgard"
}
*/
TpArq.put('/alumno', function (req, res) {
  
    let alumno_id = req.body.id;
    let mail = req.body.mail;
    let nombre = req.body.nombre;

    if (!alumno_id || !nombre) {
        return res.status(400).send({ error: nombre, message: 'Por favor agregue un alumno, el body esta vacio o invalido revisar readme para info' });
    }
  
    CursorDB.query("UPDATE alumnos SET nombre = ? , mail = ? WHERE id = ?", [nombre, mail, alumno_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'el alumno se edito exitosamente' });
    });
});
 

/*
aca Borramos un alumno, definimos la ruta DELETE:http:dominio.local/alumno
En el body del request enviamos:
Ejemplo JSON
HEADER:  Content-Type - application/json
{
        "id": 6
}
*/
TpArq.delete('/alumno', function (req, res) {
  
    let alumno_id = req.body.id;
    
    if (!alumno_id) {
        return res.status(400).send({ error: true, message: 'Por favor agregue un alumno, el body esta vacio o invalido revisar readme para info' });
    }
    CursorDB.query('DELETE FROM alumnos WHERE id = ?', [alumno_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'el alumno se borro exitosamente' });
    });
}); 
 
// seteamos Puerto del Server
TpArq.listen(3000, function () {
    console.log('La app se esta corriendo en localhost:3000');
});
 
module.exports = TpArq;
