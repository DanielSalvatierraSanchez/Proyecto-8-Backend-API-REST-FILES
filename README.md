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
DB_URL=mongodb+srv://proyect8:<password>@cluster0.myq5qnx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
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
| ALL CAKES | GET | /api/v1/cake | --- |
| CAKE BY NAME | GET | /api/v1/cake/getBy/:name | { **name** } |
| UPDATE CAKE | PUT | /api/v1/cake/update/:id | { **cake data** } | upload |
| DELETE CAKE | DELETE | /api/v1/cake/delete/:id | --- |
| DELETE INGREDIENT OF CAKE | DELETE | /api/v1/cake/deleteIngredient/:id | { **name** } | --- |

## Resumen de los Endpoints Cake

##### POST /api/v1/cake/register
- Para la creación de un Cake se crea un Schema, en el que requerimos 3 campos obligatorios, "name", "difficulty" y "firstImg", también tendremos otros extra que serán "secondImg", "thirdImg" e "ingredients".
```
    {      
        name: { type: String, required: true, trim: true },
        difficulty: { type: String, required: true, enum: ["Baja", "Media", "Alta"] },
        firstImg: { type: String, required: true },
        secondImg: { type: String, required: false },
        thirdImg: { type: String, required: false },
        ingredients: [{ type: mongoose.Types.ObjectId, ref: "ingredients"}]
    }
```

##### GET /api/v1/cake/getBy/:name
-  Para obtener un listado de Cakes por "name" será necesario introducir algún caracter.

##### GET /api/v1/cake/
-  Para obtener un listado de todas las Cakes.

##### PUT /api/v1/cake/update/:id
-  Para la actualización de una Cake mediante su ID.

##### DELETE /api/v1/cake/deleteIngredient/:id
-  Para eliminar un Ingredient por su "name" de una Cake mediante su ID.

##### DELETE /api/v1/cake/delete/:id
-  Para eliminar una Cake por completo mediante su ID.


## Endpoints Ingredient

| NAME | METHOD | ENDPOINT | BODY | MIDDLEWARE |
| --- | --- | --- | --- | --- |
| REGISTER INGREDIENT | POST | /api/v1/ingredient/register | { **name**, **quantity**, **units**, **img** } | upload |
| ALL INGREDIENTS | GET | /api/v1/ingredient | --- |
| INGREDIENT BY NAME | GET | /api/v1/ingredient/getBy/:name | { **name** } |
| UPDATE INGREDIENT | PUT | /api/v1/ingredient/update/:id | { **INGREDIENT data** } | upload |
| DELETE INGREDIENT | DELETE | /api/v1/ingredient/delete/:id | --- |

## Resumen de los Endpoints Ingredient

##### POST /api/v1/ingredient/register
- Para la creación de un Ingredient se crea un Schema, en el que requerimos 4 campos obligatorios, "name", "quantity", "units" e "img".
```
    {
        name: { type: String, required: true, trim: true },
        quantity: { type: Number, required: true, min: 1, trim: true },
        units: { type: String, required: true, enum: ["Gramos", "Mililitros", "Unidad", "Unidades"] },
        img: { type: String, required: true }
    }
```

##### GET /api/v1/ingredient/getBy/:name
-  Para obtener un listado de Ingredients por "name" será necesario introducir algún caracter.

##### GET /api/v1/ingredient/
-  Para obtener un listado de todos los Ingredients.

##### PUT /api/v1/ingredient/update/:id
-  Para la actualización de un Ingredient mediante su ID.

##### DELETE /api/v1/ingredient/delete/:id
-  Para eliminar un Ingredient por completo mediante su ID.
