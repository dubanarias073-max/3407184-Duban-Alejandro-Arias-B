Proyecto Semana 3 – Sistema de Gestión de Cementerios

Estudiante: Duban Alejandro Arias Bejarano
Fecha: 24/02/2026
Dominio Asignado: Sistema de Gestión de Cementerios

📋 Información del Proyecto

Este proyecto consiste en implementar un sistema completo para la gestión de cementerios utilizando Programación Orientada a Objetos (POO) con clases ES2023.
El sistema permite gestionar cementerios, tumbas, servicios y usuarios, aplicando herencia, encapsulación y métodos avanzados de clases.

🎯 Objetivos de Aprendizaje Aplicados

Crear clases con constructores y propiedades.

Definir métodos de instancia y métodos estáticos.

Implementar herencia usando extends y super.

Aplicar getters y setters para validar y controlar propiedades.

Utilizar campos privados (#) para proteger datos sensibles.

Emplear static blocks para inicialización compleja de la clase.

Diferenciar clases vs funciones constructoras.

🚀 Funcionalidades Implementadas

Gestión de Cementerios:

Crear, modificar y listar cementerios con propiedades como nombre, ubicación, capacidad y estado.

Métodos estáticos para calcular estadísticas generales, como número total de tumbas o ocupación promedio.

Gestión de Tumbas:

Crear y asignar tumbas a cementerios.

Control de estado de cada tumba (ocupada, disponible).

Validación mediante getters/setters y campos privados para proteger datos sensibles.

Gestión de Servicios:

Registrar servicios ofrecidos por el cementerio (mantenimiento, ceremonias, atención al visitante).

Filtrado por tipo de servicio y nivel de prioridad.

Encapsulación y seguridad:

Campos privados para información crítica como número de ocupaciones, historial de pagos o estado de servicios.

Validaciones automáticas usando getters y setters.

Métodos estáticos y bloques estáticos:

Inicialización de categorías de tumbas y servicios disponibles.

Métodos de utilidad para generar reportes de ocupación y disponibilidad.

📚 Conceptos de POO Aplicados
// Clase básica: Cementerio
class Cemetery {
  #totalTombs = 0;
  constructor(name, location, capacity) {
    this.name = name;
    this.location = location;
    this.capacity = capacity;
    this.tombs = [];
  }
  addTomb(tomb) {
    if(this.tombs.length < this.capacity) this.tombs.push(tomb);
    this.#totalTombs = this.tombs.length;
  }
  get totalTombs() {
    return this.#totalTombs;
  }
}

// Herencia: Tumba
class Tomb extends Cemetery {
  constructor(cemeteryName, location, capacity, ownerName, status = "available") {
    super(cemeteryName, location, capacity);
    this.ownerName = ownerName;
    this.status = status;
  }
}

// Getters/Setters y validación
class Service {
  #priority = 1;
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }
  set priority(value) {
    this.#priority = value > 5 ? 5 : value;
  }
  get priority() {
    return this.#priority;
  }
}
📝 Lo que Aprendí

Diseñar clases y objetos complejos para un sistema real de cementerios.

Aplicar herencia y composición para organizar cementerios, tumbas y servicios.

Usar campos privados (#) para proteger información crítica y sensible.

Implementar getters y setters para validar datos y controlar accesos.

Aplicar métodos estáticos y bloques estáticos para inicialización y estadísticas.

Refuerzo de buenas prácticas de código limpio y moderno (ES2023).

🚀 Cómo Ejecutar

Abrir index.html del proyecto en el navegador.

Probar la gestión de cementerios, tumbas y servicios:

Crear, editar y eliminar cementerios y tumbas.

Registrar y gestionar servicios.

Consultar estadísticas de ocupación.

Revisar consola para verificar validaciones y mensajes de estado.

🎯 Autoevaluación

Funcionalidad: 100%

Código POO ES2023: 100%

Encapsulación y seguridad: 95%

Aplicación de herencia y composición: 100%

Total Estimado: 98%