# Proyecto 8 [Backend API REST FILES]

## Descripción:

En este proyecto se debe de demostrar los conocimientos del Backend adquiridos e implementar la subida, modificación y eliminación de imágenes a Cloudinary, pero esta vez no se usarán ni autentificaciones ni encriptaciones.

[![N|Solid](https://moonlay.com/wp-content/uploads/2023/01/mongoDB.png)](https://nodesource.com/products/nsolid)
[![N|Solid](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkucnJUfKnyTgCTQ-XEp_CbYIDzXJ_1b4BafS7alYn8v8duI9DMcv3zQvb_WF11dX-95M&usqp=CAU)](https://nodesource.com/products/nsolid)
[![N|Solid](https://moonlay.com/wp-content/uploads/2023/01/node-JS.png)](https://nodesource.com/products/nsolid)

### Requisitos mínimos:

- Realizar el README.md con la documentación del proyecto.
- Servidor con express.
- Conexión a una base de datos de Mongo Atlas mediante mongoose.
- Creación de dos modelos, ambos, con un campo que nos permita almacenar un archivo.
- Una semilla que suba datos a una de las colecciones.
- Una relación entre colecciones.
- CRUD completo de todas colecciones.
- Subida de archivos mediante cloudinary a ambas colecciones.
- Eliminación de archivos en cloudinary cuando se borra el dato en la BBDD.
- Intento de reutilización del storage de cloudinary cambiando la carpeta (puede estar comentado).

## Clonación del Proyecto:

```sh
git clone https://github.com/DanielSalvatierraSanchez/Proyecto-8-Backend-API-REST-FILES.git
```

- Entrega del .env:

```
DB_URL=mongodb+srv://proyect8:proyect8@cluster0.myq5qnx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

- Middlewares:

> upload (Permite la subida de ciertos tipos de archivos a una carpeta de Cloudinary)

- Dependencias del proyecto:

```
npm i -D nodemon
npm i express mongoose dotenv cloudinary multer multer-storage-cloudinary
```

- Scripts del proyecto:

```
npm run start ("node index.js")
npm run dev ("nodemon index.js")
npm run seed ("node ./src/utils/seed/seed.js")
```

### Endpoints Cake

| NAME | METHOD | ENDPOINT | BODY | MIDDLEWARE |
| --- | --- | --- | --- | --- |
| REGISTER CAKE | POST | /api/v1/cake/register | { **name**, **difficulty**, **firstImg**, secondImg, thirdImg, ingredients } | upload |
| ALL CAKE | GET | /api/v1/cake | --- |
| CAKE BY NAME | GET | /api/v1/cake/getBy/:name | { **name** } |
| UPDATE CAKE | PUT | /api/v1/cake/update/:id | { **cake data** } | upload |
| DELETE CAKE | DELETE | /api/v1/cake/delete/:id | --- |
| DELETE INGREDIENT OF CAKE | DELETE | /api/v1/cake/deleteIngredient/:id | { **name** } | --- |

## Resumen de los Endpoints Cake

##### POST /api/v1/cake/register
- Para la creación de los usuarios se crea un Schema, en el que requerimos 3 campos obligatorios, "userName", "email" y "password", también tendremos otros extra que serán "role" (por defecto será "user") y "atms".  
```
    {      
        userName: { type: String, required: true, minLength: 1, maxLength: 25 },
        email: { type: String, required: true },
        password: { type: String, required: true, minLength: 8 },
        role: { type: String, enum: ["admin", "user"], default: "user" },
        atms: [{ type: mongoose.Types.ObjectId, ref: "atms" }]
    }
```
> No se permitirá a ningún usuario crear el "role" de "admin".

##### POST /api/v1/cake/login
- Para hacer el Login de los usuarios se realizará mediante el "email" y la "password".

##### GET /api/v1/cake/
-  Para obtener un listado de todos lo usuarios será necesario haber realizado el Login.

> Dependiendo del "role" mostrará un listado más o menos detallado de los usuarios.

##### PUT /api/v1/cake/update/:id
- Para la actualización de los usuarios será necesario haber realizado el Login.

> Únicamente los usuarios con "role" de "admin" podrán actualizar cualquier usuario y su "role", el resto de usuarios sólo podrán actualizarse a sí mismos.

##### DELETE /api/v1/cake/delete/:id
-  Para eliminar un usuario será necesario haber realizado el Login.

##### DELETE /api/v1/cake/delete/:id
-  Para eliminar un usuario será necesario haber realizado el Login.


## Endpoints Ingredient

| NAME | METHOD | ENDPOINT | BODY | MIDDLEWARE |
| --- | --- | --- | --- | --- |
| POST ATM | POST | /api/v1/atms/register | { **type**, **model**, **ubication**, image, cassettes } | isAdmin |
| GET ATMs BY UBICATION | GET | /api/v1/atms/getBy/:ubication | { **ubication** } | isAuth |
| ALL ATMs | GET | /api/v1/atms/ | --- | isAuth |
| UPDATE ATM | PUT | /api/v1/atms/update/:id | { **atms data** } | isAdmin |
| DELETE ATM | DELETE | /api/v1/atms/delete/:id | --- | isAdmin |

## Resumen de los Endpoints ATMs

##### POST /api/v1/atms/register
- Para la creación de un ATM se crea un Schema, en el que requerimos 3 campos obligatorios, "type", "model" y "ubication", también tendremos otros extra que serán "image" y "cassettes". Será necesario haber realizado el Login como "admin".  
```
    {
        type: { type: String, required: true, enum: [ 'PersonaS', 'SelfServ' ] },
        model: { type: Number, required: true, enum: [ 5870, 5875, 5885, 5886, 5877, 6622, 6626, 6627, 6632, 6634, 6682, 6684 ] },
        ubication: { type: String, required: true, enum: [ 'Front Access', 'Rear Access'] },
        image: { type: String, default: '/assets/Atms.jpeg'},
        cassettes: [{ type: mongoose.Types.ObjectId, ref: 'cassettes' }]
    }
```

##### GET /api/v1/atms/getBy/:ubication
-  Para obtener un listado de ATMs por "ubication" será necesario haber realizado el Login.

##### GET /api/v1/atms/
-  Para obtener un listado de todos los ATMs será necesario haber realizado el Login.

##### PUT /api/v1/atms/update/:id
- Para la actualización de un ATM será necesario haber realizado el Login como "admin".

##### DELETE /api/v1/atms/delete/:id
-  Para eliminar un ATM será necesario haber realizado el Login como "admin".

<!-- 
## Endpoints Cassettes

| NAME | METHOD | ENDPOINT | BODY | MIDDLEWARE |
| --- | --- | --- | --- | --- |
| POST CASSETTE | POST | /api/v1/cassettes/register | { **denomination**, **count**, image } | isAdmin |
| GET CASSETTES BY DENOMINATION | GET | /api/v1/cassettes/getBy/:denomination | { **denomination** } | isAuth |
| ALL CASSETTES | GET | /api/v1/cassettes/ | --- | isAuth |
| UPDATE CASSETTE | PUT | /api/v1/cassettes/update/:id | { **cassettes data** } | isAuth |
| DELETE CASSETTE | DELETE | /api/v1/cassettes/delete/:id | --- | isAdmin |


## Resumen de los Endpoints Cassettes

##### POST /api/v1/cassettes/register
- Para la creación de un Cassette se crea un Schema, en el que requerimos 2 campos obligatorios, "denomination" y "count", también tendremos otro extra que será "image". Será necesario haber realizado el Login como "admin".  
```
    {
        denomination: { type: Number, required: true, enum: [ 5, 10, 20, 50, 100, 200, 500 ] },
        count: { type: Number, required: true },
        image: { type: String, default: '/assets/Cassette.jpg' }
    }
```

##### GET /api/v1/cassettes/getBy/:denomination
-  Para obtener un listado de Cassettes por "denomination" será necesario haber realizado el Login.

##### GET /api/v1/cassettes/
-  Para obtener un listado de todos los Cassettes será necesario haber realizado el Login.

##### PUT /api/v1/cassettes/update/:id
- Para la actualización de un Cassette será necesario haber realizado el Login.

##### DELETE /api/v1/cassettes/delete/:id
-  Para eliminar un Cassette será necesario haber realizado el Login como "admin". -->


