# TP Tecnologías Web — Backend: Competición y Autos

API REST para gestionar competiciones automovilísticas y los autos inscriptos en cada una.
Relación **1 a N**: una `Competición` tiene muchos `Auto`, y cada `Auto` pertenece a una competición.

## Stack

- **NestJS** + TypeScript (arquitectura modular: módulos, controladores y servicios).
- **TypeORM** + **PostgreSQL** como base relacional.
- **Docker / Docker Compose** para levantar la base.
- **@nestjs/config** para leer variables de entorno.
- **class-validator** + `ValidationPipe` para validar los datos de entrada.
- **Postman** para probar los endpoints.

## Requisitos

- Node.js 18+ y npm.
- Docker con Docker Compose.

## Puesta en marcha

1. Clonar el repositorio e instalar dependencias:

   ```bash
   git clone https://github.com/estebanteyseyre/Tp-Web.git
   cd Tp-Web
   npm install
   ```

2. Copiar `.env.example` a `.env` y completar los valores reales:

   ```bash
   cp .env.example .env
   ```

   | Variable       | Uso                                                     |
   | -------------- | ------------------------------------------------------- |
   | `DB_HOST`      | Host de PostgreSQL (`localhost` si Docker corre en local) |
   | `DB_PORT`      | Puerto de PostgreSQL (`5432`)                            |
   | `DB_USER`      | Usuario de la base de datos                              |
   | `DB_PASSWORD`  | Contraseña de la base de datos                           |
   | `DB_NAME`      | Nombre de la base de datos                               |

   El `.env` está en `.gitignore`: **nunca se sube al repositorio**. Docker Compose también lee
   esas mismas variables para crear el contenedor, así que base y aplicación siempre coinciden.

3. Levantar la base de datos:

   ```bash
   docker compose up -d
   ```

   El contenedor `competicion_postgres` usa `postgres:15-alpine` y el volumen `pgdata`, por lo que
   los datos sobreviven a reinicios. Para borrar todo y empezar de cero: `docker compose down -v`.

4. Levantar la API:

   ```bash
   npm run start:dev
   ```

   La API queda escuchando en `http://localhost:3000`.

## Endpoints

| Método | Ruta                       | Descripción                                              |
| ------ | -------------------------- | -------------------------------------------------------- |
| GET    | `/competiciones`           | Lista competiciones con sus autos                        |
| GET    | `/competiciones?nombre=F1` | Filtra por nombre (coincidencia parcial)                  |
| GET    | `/competiciones/:id`       | Obtiene una competición por id                           |
| POST   | `/competiciones`           | Crea una competición                                     |
| PATCH  | `/competiciones/:id`       | Edita algunos campos de una competición                  |
| DELETE | `/competiciones/:id`       | Borra una competición (y sus autos, por `CASCADE`)       |
| GET    | `/autos`                   | Lista autos con su competición                           |
| GET    | `/autos?piloto=Colapinto`  | Filtra autos por piloto (coincidencia parcial)            |
| GET    | `/autos/:id`               | Obtiene un auto por id                                   |
| POST   | `/autos`                   | Crea un auto (requiere un `competicionId` existente)     |
| PATCH  | `/autos/:id`               | Edita algunos campos de un auto                          |
| DELETE | `/autos/:id`               | Borra un auto                                            |

Ejemplo de `POST /competiciones`:

```json
{
  "nombre": "Gran Premio de Mónaco",
  "premio": "Trofeo Príncipe",
  "fecha": "2026-05-25",
  "lugar": "Circuito de Mónaco"
}
```

Ejemplo de `POST /autos`:

```json
{
  "modelo": "F1-75",
  "marca": "Ferrari",
  "numero": 16,
  "potencia": 1000,
  "piloto": "Leclerc",
  "categoria": "F1",
  "competicionId": 1
}
```

## Validación y errores

- Los DTO usan `class-validator` y se validan con un `ValidationPipe` global (`whitelist: true`,
  `transform: true`). Campos faltantes o con el tipo equivocado devuelven **400 Bad Request**.
- Los parámetros `:id` pasan por `ParseIntPipe`: si no son numéricos, devuelven **400**.
- Buscar, editar o borrar un id inexistente devuelve **404 Not Found**.
- Crear un auto con un `competicionId` inexistente devuelve **400 Bad Request**.

## Colecciones de Postman

- `competiciones.postman_collection.json`
- `autos.postman_collection.json`

Ambas usan la variable `{{baseUrl}}` (por defecto `http://localhost:3000`): para probar contra
otro entorno alcanza con cambiar esa variable, sin tocar cada request.

## Deploy

El backend está desplegado en Render: **https://tp-web-backend-w7x0.onrender.com**

Para probar la API contra producción alcanza con cambiar la variable `baseUrl` de las colecciones
de Postman por esa URL. El plan gratuito duerme el servicio: la primera request puede tardar cerca
de un minuto en responder.

## Notas

- `synchronize: true` crea las tablas automáticamente al arrancar. Está bien para el TP; en un
  proyecto real se usan migraciones.
- El frontend consume exclusivamente estos endpoints. El backend escucha en `process.env.PORT`,
  que Render inyecta automáticamente.
- El detalle de las decisiones tomadas está en `resumen.md` y en la carpeta `conversaciones/`.
