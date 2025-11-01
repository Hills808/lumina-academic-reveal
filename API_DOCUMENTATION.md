# 📚 Documentação API Backend - LUMINA

## Base URL
```
http://localhost:8000/api
```

---

## 🔐 Autenticação

### POST /auth/register
Cadastrar novo usuário (aluno ou professor)

**Request Body:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123",
  "user_type": "student" // ou "teacher"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Usuário cadastrado com sucesso",
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com",
    "user_type": "student"
  }
}
```

---

### POST /auth/login
Fazer login

**Request Body:**
```json
{
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com",
    "user_type": "student"
  }
}
```

---

## 👨‍🎓 Rotas do Aluno

### GET /student/subjects
Buscar matérias do aluno

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "subjects": [
    {
      "id": 1,
      "name": "Matemática",
      "teacher": "Prof. Carlos",
      "grade": 8.5
    },
    {
      "id": 2,
      "name": "Português",
      "teacher": "Prof. Ana",
      "grade": 9.0
    }
  ]
}
```

---

### GET /student/materials
Buscar materiais de aula

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "materials": [
    {
      "id": 1,
      "subject": "Matemática",
      "title": "Álgebra Linear",
      "date": "2024-01-15",
      "file_url": "https://..."
    }
  ]
}
```

---

### GET /student/messages
Buscar mensagens do professor

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "messages": [
    {
      "id": 1,
      "from": "Prof. Carlos",
      "subject": "Matemática",
      "message": "Lembrete: prova dia 20/01",
      "date": "2024-01-10"
    }
  ]
}
```

---

## 👨‍🏫 Rotas do Professor

### GET /teacher/classes
Buscar turmas do professor

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "classes": [
    {
      "id": 1,
      "name": "Matemática - 3º Ano A",
      "students_count": 30
    }
  ]
}
```

---

### GET /teacher/students
Buscar alunos de uma turma

**Headers:**
```
Authorization: Bearer {token}
```

**Query Params:**
```
?class_id=1
```

**Response (200):**
```json
{
  "success": true,
  "students": [
    {
      "id": 1,
      "name": "João Silva",
      "email": "joao@email.com"
    }
  ]
}
```

---

### POST /teacher/materials
Upload de material

**Headers:**
```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Request Body (FormData):**
```
class_id: 1
title: "Álgebra Linear"
file: [arquivo]
```

**Response (201):**
```json
{
  "success": true,
  "message": "Material enviado com sucesso",
  "material": {
    "id": 1,
    "title": "Álgebra Linear",
    "file_url": "https://..."
  }
}
```

---

### POST /teacher/grades
Lançar notas

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "class_id": 1,
  "student_id": 1,
  "subject": "Matemática",
  "grade": 8.5
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Nota lançada com sucesso"
}
```

---

### POST /teacher/messages
Enviar mensagem

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "class_id": 1,
  "subject": "Matemática",
  "message": "Lembrete: prova dia 20/01"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Mensagem enviada com sucesso"
}
```

---

## 🔒 Validação de Dados

### Limites recomendados:
- **name**: 3-100 caracteres
- **email**: formato válido, max 255 caracteres
- **password**: mínimo 6 caracteres
- **message**: max 1000 caracteres
- **title**: max 200 caracteres
- **grade**: 0-10

### Erros comuns:
```json
{
  "success": false,
  "error": "Email já cadastrado"
}
```

```json
{
  "success": false,
  "error": "Token inválido ou expirado"
}
```
