# Tpitulo
​
## royecto Módulo Backend Avanzado (NoSQL - MongoDB)
​
# Descripción:
​
Crear un sistema (API REST) de un e-commerce para una tienda en linea con express.js conectado a una base de datos de MongoDB en Atlas
​
# Pseudo requerimientos:
​
- Existen dos roles en el sistema, el administrador de la tienda y los clientes que compran en ella:
​
  El administrador puede registrar productos tanto como editarlos y borrarlos
​
  El cliente es quien puede comprar en la plataforma unicamente con una cuenta registrada.
​
  Los datos para registrar a un adminsitrador, son:
​
  - Nombre
  - Apellidos
  - Fecha de nacimiento
  - ID(identificación)
  - Dirección
  - Teléfono
​
- Para que un cliente se pueda registrar, necesita ingresar los siguientes datos
​
  - Nombre
  - Apellidos
  - Fecha de nacimiento
  - Teléfono
  - Correo
  - Contraseña
  - Dirección de envio
​
- Para que un administrador registre un producto en el sistema, se necesitan los siguentes datos:
​
  - Nombre del producto
  - Proveedor
  - Stock
  - Precio
  - Categoría
  - Especificaciones
  - Descripción del producto
​
- Los administradores pueden crear cupones de descuento de los cuales necesitamos los siguientes datos
​
  - Tipo de cupon (% o monto)
  - Límite de usos
​
- Los clientes pueden buscar los productos por uno o varios filtros simultaneos tales como:
​
  - Un rango de precio
  - Buscar por categoría
  - Por nombre
  - Por proveedor
  - Disponibilidad
​
- El proceso de compra es el siguiente:
​
  1. El usuario agrega productos al carrito de compras
  2. Cuando el usuario haya encontrado todos los productos que desee se dirige al funel de pago
  3. Se puede registrar un cupón de descuento
  4. Ingresa su información de pago (tarjeta)
  5. Se guarda la informacion del pedido y se registra en el historial de pedidos del cliente
​
- Un cliente puede ver su historial de pedidos al igual que los pedidos pendientes que tenga
​
- En el historial de pedidos se pueden ver los productos que fueron seleccionados así como la cantidad y el precio en el que fueron comprados (Los precios del producto se pueden actualizar cuadno el admisnitrador lo desee pero una vez se haya realizado el pago, cualquier actualización del precio no se verá reflejado en la compra del cliente ya pagada)
​
- Para que un usuario pueda realizar un compra o editar un carrito, necesita tener una sesión iniciada (authenticated, authorizaed)