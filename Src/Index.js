/* Api-Rest Alex Bulfon Peliculas */

const express = require ('express'); //requiero el modulo de express y lo guardo en una costante
const morgan = require ('morgan');
const app = express(); // Apartir de aca Ejecuto el Framework de express.

//Settings
app.set('port', process.env.PORT || 3000); //process.env.PORT por si existe un puerto por defecto ej. Azure
app.set('json spaces', 2);// es para espaciar el json , se muestra mejor.

//middlewares - Morgan me permite ver por consola lo que va llegando al servidor-
app.use(morgan('dev')); //dev solo muestra por consola lo basico puedo usar combined te da mas info.
app.use(express.urlencoded({extended: false}));// para entender datos input desde formularios como texto.
app.use(express.json());  /* Mi aplicacion web solo va a estar enviando formato json y tengo que soportar eso.
este metodo json le permite poder empezar a recibir metodos json*/

//routes
app.use(require('./routes'));
app.use('/api/movies',require('./routes/movies'));


//Starting the SERVER
app.listen(app.get('port'), () => {       //applicacion escucha en el puerto 3000
    console.log(`Server on port ${app.get('port')}`);   //Imprimo por consola
});

