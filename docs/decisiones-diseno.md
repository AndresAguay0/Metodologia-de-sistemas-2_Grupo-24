# Código analizado

### Clases

#### Modelos (server/src/models/):

- **HardwareStore.ts:** Modelo de Sucursales/Ferreterías.
- **User.ts:** Modelo de Usuarios con roles diferenciados (`dueño`, `gerente`, `empleado`).
- **UserHardwareStore.ts:** Tabla intermedia para la relación muchos a muchos entre usuarios (`dueño` y `gerente`) y sucursales.
- **Product.ts:** Modelo de inventario con stock, precios y asociación directa a una ferretería (`hardwareStoreId`).

### Controladores

#### (server/src/controllers/):

- **hardwareStore.controller.ts:** Se encarga de gestionar las operaciones CRUD para las ferreterías. `(de momento solo GET y POST)`
- **product.controller.ts:** Se encarga de gestionar las operaciones CRUD para los productos.
- **user.controller.ts:** Se encarga de gestionar las operaciones CRUD para los usuarios. `(de momento solo GET y POST)`

### Middleware

#### Validadores (server/src/middlewares/):

- **validateProduct.ts:** Valida que los datos enviados para el producto tengan el tipo de dato correcto. Si encuentra errores, devuelve un error 400.
- **validateUser.ts:** Valida que los datos enviados para el usuario tengan el tipo de dato correcto. Si encuentra errores, devuelve un error 400.
- **validateHardwareStore.ts:** Valida los datos recibidos para las ferreterías, verificando que los campos name y address tengan el tipo de dato correcto. Si encuentra errores, devuelve un error 400.

### Rutas

#### Enrutadores (server/src/routes/):

- Cada uno se encarga de vincular la operación CRUD correspondiente con la dirección de la api.

# Desiciones de diseño

De momento, por la simplicidad de nuestro proyecto, no vemos necesario incorporar ningún patron de diseño. Creemos que actualmente traerían mas contras que pros.

Si que consideramos utilizar algunos en caso de expandir el proyecto. Por ejemplo, la utilización de Adapter para incorporar un sistema de scan de productos o un Factory para implementar las multiples formas de facturar una venta de manera sencilla.