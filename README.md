# API Usuarios

## Base URL
http://localhost:3000/api/v1

---

## Login

POST /usuarios/login

Body:
{
  "email": "string",
  "password": "string"
}

---

## Obtener usuarios

GET /usuarios

Headers:
Authorization: Bearer TOKEN

Query params:
- page (number)
- limit (number)
- email (string)

---

## Crear usuario

POST /usuarios

Body:
{
  "name": "string",
  "email": "string",
  "password": "string",
  "balance": number,
  "role": "user | admin"
}

---

## Actualizar usuario

PUT /usuarios/:id

---

## Eliminar usuario (solo admin)

DELETE /usuarios/:id