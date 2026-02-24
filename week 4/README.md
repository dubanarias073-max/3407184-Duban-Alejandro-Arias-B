Sistema de Gestión de Cementerios - Duban Alejandro Arias Bejarano
📋 Información

Nombre: Duban Alejandro Arias Bejarano

Fecha: 24/02/2026

Dominio Asignado: Sistema de Gestión de Cementerios

Objetivo del Proyecto: Implementar un sistema modular para gestionar cementerios, tumbas y servicios relacionados, aplicando ES6 Modules, destructuring avanzado y dynamic imports.

🎯 Descripción

Este proyecto consiste en un sistema modular completo para la gestión de cementerios. Permite:

CRUD de elementos principales (tumbas, cementerios, servicios)

Gestión de categorías y filtros

Reportes y estadísticas cargadas bajo demanda (lazy loading)

Persistencia de datos en localStorage

Arquitectura modular clara con ES6 Modules

Se aplicó destructuring avanzado para manejar objetos y arrays, y se implementaron dynamic imports para cargar reportes y funciones de exportación solo cuando se requieren.

📚 Conceptos ES2023 y Técnicas Aplicadas

✅ Destructuring avanzado: En parámetros de funciones, retornos, iteraciones y valores por defecto.

✅ ES6 Modules:

Named exports para utilidades y constantes

Default exports para clases principales

Barrel exports (index.js) para agrupar modelos, servicios y utilidades

✅ Dynamic Imports:

Reportes y exportaciones cargadas bajo demanda

Manejo de errores en imports

✅ Funciones modernas: Arrow functions, template literals y optional chaining (?.)

✅ Persistencia: Uso de localStorage para mantener datos entre sesiones

🚀 Funcionalidades Implementadas

Elementos principales:

Crear, editar, eliminar tumbas o servicios del cementerio

Buscar y filtrar elementos por nombre o categoría

Categorías:

Gestión de categorías como sepultura de tierra,mausoleo, boveda familiar,cenizario

Filtros por categoría

Reportes y estadísticas:

Total de elementos

Promedios, valores máximos y mínimos

Distribución por categoría

Persistencia:

Guardar datos en localStorage y cargar al iniciar la aplicación

UI Interactiva:

Botones para agregar, editar y eliminar elementos

Secciones dinámicas para reportes cargados bajo demanda

Notificaciones tipo toast para acciones realizadas

🗂️ Estructura Modular
3-proyecto/
├── index.html
├── styles.css
├── starter/
│   ├── main.js             # Entrada principal
│   ├── config.js           # Configuración de dominio
│   ├── models/             # Clases y entidades
│   ├── services/           # Lógica de negocio
│   ├── features/           # Reportes y exportación (dynamic import)
│   ├── ui/                 # Renderizado y eventos
│_  └── utils/              # Utilidades y validaciones

🚀 Cómo Ejecutar

Abrir index.html en el navegador

Probar las funcionalidades:

Agregar, editar y eliminar elementos

Filtrar por categoría

Cargar reportes dinámicamente

Revisar consola para errores

🎯 Lo que Aprendí

Organizar un proyecto completo usando ES6 Modules y arquitectura modular.

Aplicar destructuring avanzado para simplificar el manejo de datos complejos.

Implementar dynamic imports para optimizar carga de módulos y funciones solo cuando se necesitan.

Manejar persistencia en localStorage para mantener la información del sistema.

Conectar CRUD, filtros y reportes con una UI funcional e interactiva.

Refuerzo de buenas prácticas de código limpio y moderno (ES2023).

🎯 Autoevaluación

Destructuring: 100%

Módulos ES6: 100%

Dynamic Imports: 95%

Funcionalidad CRUD y persistencia: 100%

Total Estimado: 99%