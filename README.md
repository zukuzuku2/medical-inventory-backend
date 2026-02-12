# Backend - Sistema de Inventario

API REST para gestionar el inventario médico.

## Tecnologías

- Node.js
- Express
- Prisma ORM
- SQLite

## Instalación

```bash
npm install
```

## Configuración

El archivo `.env` ya está configurado con:

```
PORT=3000
DATABASE_URL="file:./dev.db"
```

## Base de Datos

Generar el cliente de Prisma y crear la base de datos:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

## Ejecutar

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

## Endpoints

### GET /inventory
Obtiene todos los productos del inventario.

**Respuesta:**
```json
[
  {
    "id": 1,
    "name": "Producto",
    "category": "Preparacion",
    "quantity": 10,
    "price": 0,
    "description": "Descripción"
  }
]
```

### POST /inventory
Crea un nuevo producto.

**Body:**
```json
{
  "name": "Producto",
  "category": "Preparacion",
  "quantity": 10,
  "price": 0,
  "description": "Descripción"
}
```

### PUT /inventory/:id
Actualiza un producto existente.

**Body:**
```json
{
  "name": "Producto Actualizado",
  "category": "Composite",
  "quantity": 15,
  "price": 0,
  "description": "Nueva descripción"
}
```

### DELETE /inventory/:id
Elimina un producto.

## Categorías Disponibles

- Preparacion
- Resinas Fluidas
- Composite
- Ionomeros
- Profilaxis
- Medicamentos
- Insumos
