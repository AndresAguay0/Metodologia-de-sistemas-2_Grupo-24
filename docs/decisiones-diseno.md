# Código analizado

### Clases

#### Modelos (server/src/models/):

- **HardwareStore.ts:** Modelo de Sucursales/Ferreterías.
- **User.ts:** Modelo de Usuarios con roles diferenciados (`dueño`, `gerente`, `empleado`).
- **UserHardwareStore.ts:** Tabla intermedia para la relación muchos a muchos entre usuarios (`dueño` y `gerente`) y sucursales.
- **Product.ts:** Modelo de inventario con stock, precios y asociación directa a una ferretería (`hardwareStoreId`).

#### Modelos (server/src/middlewares/):
-**validateProduct.ts:** Valida que los datos enviados para el producto tengan el tipo de dato correcto. Si encuentra errores, devuelve un error 400.
-**validateUser.ts:** Valida que los datos enviados para el usuario tengan el tipo de dato correcto. Si encuentra errores, devuelve un error 400.
-**validateHardwareStore.ts:** Valida los datos recibidos para las ferreterías, verificando que los campos name y address tengan el tipo de dato correcto. Si encuentra errores, devuelve un error 400.