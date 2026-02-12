⚰️ Sistema de Gestión de Cementerios
📌 Descripción

Este proyecto consiste en el desarrollo de una aplicación web para la gestión de registros funerarios en un cementerio.
Fue desarrollado utilizando HTML, CSS y JavaScript puro (Vanilla JS), implementando manipulación del DOM, almacenamiento en localStorage y operaciones CRUD completas.

El sistema permite registrar fallecidos, clasificar las sepulturas, controlar su estado y visualizar estadísticas en tiempo real.

🎯 Objetivo del Proyecto

El objetivo fue aplicar los conceptos vistos en clase:

Manipulación del DOM

Uso de eventos

Arrays y objetos en JavaScript

Funciones

Persistencia de datos con localStorage

Filtros dinámicos

Renderizado dinámico de información

🛠️ Mi Implementación
📌 1. Modelo de Datos

Cada registro funerario lo estructuré como un objeto con la siguiente forma:

{
  id: string,
  name: string,
  description: string,
  category: string,
  priority: string,
  active: boolean,
  createdAt: string
}


Donde:

id: identificador único generado con Date.now()

name: nombre del fallecido

description: observaciones adicionales

category: tipo de sepultura (bóveda, lote, nicho, otro)

priority: nivel de urgencia (baja, media, alta)

active: estado de ocupación (true = ocupada, false = disponible)

createdAt: fecha de registro

📌 2. Almacenamiento

Implementé persistencia usando localStorage:

Al iniciar la aplicación, cargo los datos guardados con:

JSON.parse(localStorage.getItem("cemeteryItems"))


Cada vez que agrego, edito o elimino un registro, actualizo el almacenamiento con:

localStorage.setItem("cemeteryItems", JSON.stringify(cemeteryItems))


Esto permite que la información no se pierda al recargar la página.

📌 3. Funcionalidades CRUD

Implementé las siguientes funciones:

addItem() → Agregar nuevo registro

updateItem() → Editar registro existente

deleteItem() → Eliminar registro

toggleStatus() → Cambiar estado (ocupada/disponible)

Cada operación actualiza el arreglo principal y vuelve a renderizar la lista.

📌 4. Renderizado Dinámico

La función renderItems():

Limpia el contenedor

Aplica filtros activos

Genera dinámicamente los elementos con createElement

Asigna eventos a botones de editar, eliminar y checkbox

Esto asegura que la interfaz siempre refleje el estado actual de los datos.

📌 5. Sistema de Filtros y Búsqueda

Implementé filtrado por:

Estado (ocupadas/disponibles)

Tipo de sepultura

Nivel de urgencia

Búsqueda por nombre o descripción

Los filtros funcionan en tiempo real usando addEventListener sobre los select e input.

📌 6. Estadísticas

La función updateStats() calcula:

Total de registros

Cantidad de ocupadas

Cantidad de disponibles

Las estadísticas se actualizan automáticamente cada vez que hay un cambio en los datos.

🧠 Decisiones Técnicas

Utilicé funciones separadas para mantener el código organizado.

Centralicé la actualización visual dentro de renderItems() para evitar duplicación.

Usé map() y filter() para mantener un estilo de programación funcional.

Evité modificar el CSS y mantuve la estructura base del HTML, adaptándolo únicamente al dominio solicitado.

📂 Estructura del Proyecto
📁 proyecto
 ├── index.html
 ├── styles.css
 └── 📁 starter
     └── script.js

🚀 Posibles Mejoras

Si continuara el proyecto, agregaría:

Ubicación exacta (sector, fila, número)

Fecha de fallecimiento

Validaciones adicionales

Exportación de datos

Base de datos real con backend

✅ Conclusión

Con este proyecto logré aplicar correctamente los conceptos fundamentales de JavaScript para crear una aplicación funcional, organizada y con persistencia de datos, adaptada al dominio de gestión de cementerios.

El sistema cumple con los requisitos solicitados: CRUD completo, filtros, búsqueda, estadísticas y almacenamiento persistente.