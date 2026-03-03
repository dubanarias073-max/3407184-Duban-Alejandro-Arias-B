Dashboard Analítico - Sistema de Gestión de Cementerios
Autor

Duban Alejandro Arias

Descripción

Este proyecto consiste en un Dashboard de Análisis de Datos aplicado al sistema de gestión de cementerios.
El objetivo fue aplicar métodos avanzados de arrays en JavaScript ES2023 para procesar y visualizar información de servicios funerarios, incluyendo estadísticas, rankings y tendencias.

Objetivos de Aprendizaje

Durante esta semana, se trabajó en:

Aplanar estructuras de datos anidadas usando flat() y flatMap().

Generar rangos y colecciones dinámicas con Array.from().

Ordenar e invertir arrays de forma inmutable con toSorted() y toReversed().

Actualizar arrays sin mutar con with().

Buscar elementos desde el final usando findLast() y findLastIndex().

Chaining de métodos para pipelines de transformación de datos.

Agregaciones y agrupaciones con reduce().

Funcionalidades Implementadas

Obtener todos los servicios (flatMap) con contexto (orden, cliente, región).

Calcular total por servicio funerario (map + reduce).

Top clientes según total de compras completadas.

Ingresos por región (agrupación con reduce).

Ingresos por categoría de servicio (flatMap + reduce).

Servicios más solicitados (flatMap + reduce + toSorted()).

Filtrar servicios por rango de fechas (filter + chaining).

Estadísticas generales: total de ventas, promedio, máximo, mínimo, total de ítems.

Tendencia mensual de ingresos (agrupación por mes).

Reporte completo combinando todas las funciones y demostrando findLast, findLastIndex y with.

Estructura de Archivos
3-proyecto/
├── index.html          # Página principal con el dashboard
├── styles.css          # Estilos para el dashboard
├── starter/
│   └── script.js       # Lógica de análisis y renderizado
└── README.md           # Este archivo
Tecnologías Aprendidas

HTML5 y CSS3 (estructura y diseño)

JavaScript ES2023:

Métodos inmutables (toSorted, toReversed, with)

Métodos avanzados de arrays (flatMap, reduce, findLast, findLastIndex)

Chaining de métodos para pipelines de datos

Conclusión

Con este proyecto se consolidó la capacidad de procesar y analizar datos complejos en arrays, aplicando buenas prácticas de inmutabilidad y pipelines en JavaScript.
Además, se aprendió a adaptar técnicas de análisis de datos a un dominio específico, en este caso, el sistema de gestión de cementerios.