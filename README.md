# Arquitectura_WEB

Nombre del grupo: Alex Bulfon
Integrante: Alex Bulfon
Tema: Listado de alumnos.
Descripción: esta va a ser una app que instancia una API-REST sobre NodeJs con Express usando MySQL como motor de base de datos.

Rutas:

GET:/alumno ---> Trae los alumnos.
GET:/alumno/id ---> Trae un alumno específico. 

POST:/alumno ---> Se inserta un alumno de la base de datos. Ej: JSON: HEADER: Content-Type - applications/json {"nombre":"Alex","mail":"alexbulfon@gmail.com"}
PUT: /alumno ---> edita un alumno. 

DELETE:/alumno Elimina un alumno. Ejemplo: JSON HEADER: Content-Type - application/json {"id":6}
