# 📚 Sistema de Gestión de Biblioteca

Este proyecto corresponde al desarrollo de un sistema completo de gestión bibliotecaria, diseñado como parte de los requerimientos del curso de Bases de Datos II. El sistema integra funcionalidades para el manejo de préstamos, gestión de libros, usuarios y seguridad básica.

## 🔎 Contexto del Proyecto

La Biblioteca Universitaria requiere un sistema web que permita registrar libros, gestionar préstamos y devoluciones, así como controlar a los usuarios autenticados. El enfoque del desarrollo se basa en una arquitectura por capas, con validaciones desde el backend y lógica crítica implementada directamente en la base de datos (funciones y triggers). El login se implementa sin JWT, validando directamente contra la base de datos.

## 🛠️ Tecnologías Utilizadas

| Capa       | Tecnología                      |
|------------|---------------------------------|
| Frontend   | Ionic con React                 |
| Backend    | Java con Spring Boot 3.5        |
| Base de Datos | PostgreSQL                    |
| ORM        | JPA / Hibernate                 |
| Utilidades | Lombok                         |

## 🧩 Arquitectura del Proyecto

- Arquitectura en capas: **Controller → Service → Repository → Entity**
- Comunicación a través de una **API RESTful**
- Validaciones y lógica clave manejadas en **PostgreSQL** (funciones y triggers)

## 🔐 Sistema de Autenticación

Se implementó un sistema de **login básico sin JWT**, cumpliendo con los requerimientos académicos. Las credenciales se validan directamente mediante una función almacenada `verificar_login(username, password)`.

## 🗃️ Estructura de la Base de Datos

### Tablas principales

- `autores(id, nombre, nacionalidad)`
- `categorias(id, nombre, descripcion)`
- `usuarios(id, username, password)`
- `libros(id, titulo, autor_id, categoria_id, disponible, fecha_publicacion)`
- `prestamos(id, libro_id, usuario_id, fecha_prestamo, fecha_devolucion, devuelto)`

### Relaciones

- Un `libro` pertenece a un `autor` y una `categoría`
- Un `préstamo` se relaciona con un `libro` y un `usuario`


![Readme](/Database/Biblioteca.png)


## ⚙️ Funcionalidades Implementadas

### 📦 Préstamos
- Registro con validación de disponibilidad (`prestar_libro`)
- Devolución con actualización automática de estado (`devolver_libro`)

### 🔍 Búsquedas
- Filtro por título, autor, categoría
- Consulta de disponibilidad en tiempo real

### 🔐 Seguridad
- Validación de usuario con función `verificar_login`
- Prevención de eliminación de usuarios con préstamos activos (`tiene_prestamos_activos`)

## ✅ Requisitos Académicos Cumplidos

- [x] Mínimo 5 tablas relacionadas
- [x] Funciones almacenadas en PostgreSQL
- [x] Lógica de negocio (préstamo y devolución) en la base de datos
- [x] CRUD completo por entidad
- [x] Login sin JWT implementado

## 🚀 Instalación y Ejecución

1. Crear base de datos PostgreSQL: `biblioteca`
2. Ejecutar los scripts SQL para crear estructura y funciones
3. Configurar `application.properties` con conexión a PostgreSQL
4. Ejecutar backend con Spring Boot
5. Ejecutar frontend con `ionic serve`


