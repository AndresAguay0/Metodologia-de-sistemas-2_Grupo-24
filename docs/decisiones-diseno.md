# Código analizado

### Clases

#### Modelos (server/src/models/):

- **HardwareStore.ts:** Modelo de Sucursales/Ferreterías.
- **User.ts:** Modelo de Usuarios con roles diferenciados (`dueño`, `gerente`, `empleado`).
- **UserHardwareStore.ts:** Tabla intermedia para la relación muchos a muchos entre usuarios (`dueño` y `gerente`) y sucursales.
- **Product.ts:** Modelo de inventario con stock, precios y asociación directa a una ferretería (`hardwareStoreId`).