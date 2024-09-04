# Parte 1: Backend - Laravel o Spring Boot (50%)
## Opción A: Sistema de tareas (to-do list)
### Tarea: Construir una `API RESTful` para la gestión de un sistema de tareas (to-do list).
#### Requisitos:
* Crear un **CRUD** para tareas que incluya campos como `title`, `description`, `status`, `due_date`.
* Implementar autenticación con Laravel **Passport**, **JWT** o **Spring Security**.
* Crear un middleware que verifique que el usuario autenticado es el propietario de la tarea.
* Implementar validaciones para los campos, ejemplo: `due_date` debe ser una fecha futura.
          
#### Puntos Adicionales:
* Utilizar **Eloquent ORM** o **JPA** para las operaciones de base de datos.
* Implementar paginación y ordenación en las consultas.
* Utilizar migraciones.

## Opción B: Productos de tienda en línea
### Tarea: Crear una `API RESTful` para la gestión de productos en una tienda en línea.
#### Requisitos:
* Crear un **CRUD** para productos con campos como `name`, `description`, `price`, `stock`.
* Implementar autenticación con Laravel **Passport**, **JWT** o **Spring Security**.
* Implementar un servicio que calcule el impuesto sobre el valor añadido (IVA) para cada producto.

#### Puntos Adicionales:
* Utilizar **Eloquent ORM** o **JPA** para las operaciones de base de datos.
* Implementar paginación y ordenación en las consultas.
