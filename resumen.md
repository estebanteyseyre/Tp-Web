# Resumen del Proyecto — Primera Entrega: Backend (NestJS + TypeORM + Postman)

## 1. Información General del Proyecto
- **Materia:** Tecnologías Web (TUARI / UNICEN)
- **Tema del TP:** Competición y Autos (Relación 1 a N)
- **Repositorio GitHub Backend:** [https://github.com/estebanteyseyre/Tp-Web](https://github.com/estebanteyseyre/Tp-Web)
- **Tecnologías utilizadas:**
  - **Node.js & TypeScript**
  - **NestJS** (Framework backend modular, basado en controladores, servicios y proveedores).
  - **TypeORM** (ORM para persistencia de objetos en base de datos relacional).
  - **PostgreSQL** (Motor de base de datos relacional ejecutándose localmente mediante Docker).
  - **@nestjs/config** (Gestión de variables de entorno mediante archivo `.env`).
  - **Postman** (Colección de pruebas para API REST).

---

## 2. Modelado de Entidades y Relaciones
El sistema modela una competencia automovilística:
- **Competición (Entidad 1):** Contiene `id`, `nombre`, `premio`, `fecha`, `lugar` y una relación `@OneToMany` con la entidad Auto.
- **Auto (Entidad N):** Contiene `id`, `modelo`, `marca`, `numero`, `potencia`, `piloto`, `categoria` y una relación `@ManyToOne` con la Competición a la que pertenece (`competicionId`).

---

## 3. Endpoints REST Implementados (CRUD Completo + Filtrado)

### 🏆 Módulo Competiciones (`/competiciones`)
- **GET `/competiciones`**: Lista todas las competiciones con sus autos relacionados.
- **GET `/competiciones?nombre=...`**: Filtra competiciones por coincidencia en el nombre (usando TypeORM `Like`).
- **GET `/competiciones/:id`**: Obtiene una competición específica por su ID.
- **POST `/competiciones`**: Crea una nueva competición.
- **PATCH `/competiciones/:id`**: Edita parcialmente los datos de una competición.
- **DELETE `/competiciones/:id`**: Elimina una competición.

### 🏎️ Módulo Autos (`/autos`)
- **GET `/autos`**: Lista todos los autos con su competición asociada.
- **GET `/autos?piloto=...`**: Filtra autos por nombre de piloto.
- **GET `/autos/:id`**: Obtiene un auto específico por su ID.
- **POST `/autos`**: Crea un auto validando que la `competicionId` exista en la base de datos.
- **PATCH `/autos/:id`**: Edita parcialmente los datos de un auto.
- **DELETE `/autos/:id`**: Elimina un auto.

---

## 4. Decisiones Técnicas y Buenas Prácticas
- **Arquitectura Modular:** Separación clara en módulos (`CompeticionesModule`, `AutosModule`), controladores (`@Controller`), servicios (`@Injectable`) y repositorios (`@InjectRepository`).
- **DTOs y Validación:** Uso de `CreateCompeticionDto`, `CreateAutoDto` y `PartialType` (`@nestjs/mapped-types`) para la actualización segura de datos.
- **Manejo de Errores:** Uso de excepciones HTTP estándar de NestJS (`NotFoundException`, `BadRequestException`) que devuelven códigos de estado correctos (`404`, `400`, `201`, `200`).
- **Variables de Entorno:** Conexión a PostgreSQL desacoplada mediante un archivo `.env` privado y cargada globalmente con `@nestjs/config`.
- **Contenerización:** Base de datos desplegada en contenedor Docker (`docker-compose.yml`).
