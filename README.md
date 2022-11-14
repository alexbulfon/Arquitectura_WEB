# Arquitectura_WEB

Nombre del grupo: Alex Bulfon
Integrante: Alex Bulfon
Tema: Listado de Peliculas
Descripción:  app que instancia una API-REST sobre NodeJs con Express usando datos hardcoded

Rutas:

GET: localhost:3000/api/movies ---> Trae las peliculas .
GET:localhost:3000/api/movies/id ---> Trae una pelicula específica. 

POST:localhost:3000/api/movies ---> Se inserta una pelicula en el archivo sample.json . Ej: JSON: HEADER: Content-Type - applications/json  {
        "id": "5",
        "title": "Rapido y Furioso",
        "director": "Rob Cohen",
        "year": "2001",
        "rating": "8"
    }
PUT: localhost:3000/api/movies/id ---> edita una pelicula. 

DELETE:localhost:3000/api/movies/id Elimina una pelicula. 
