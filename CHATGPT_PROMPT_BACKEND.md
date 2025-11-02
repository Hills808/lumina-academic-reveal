# 🚀 PROMPT COMPLETO PARA CHATGPT - BACKEND PYTHON LUMINA

**COPIE E COLE ESTE PROMPT INTEIRO NO CHATGPT**

---

## 📋 CONTEXTO DO PROJETO

Você é um desenvolvedor backend Python especializado em FastAPI. Preciso que você desenvolva o backend completo para uma plataforma educacional chamada **LUMINA**.

### 🎯 Objetivo
Criar uma API REST completa com FastAPI que gerencia:
- Autenticação de usuários (Alunos e Professores)
- Gestão de matérias e turmas
- Upload e gerenciamento de materiais didáticos
- Sistema de notas
- Mensagens entre professores e alunos

---

## 🔧 STACK TECNOLÓGICA OBRIGATÓRIA

### Backend
- **Framework**: FastAPI
- **Linguagem**: Python 3.10+
- **Autenticação**: JWT (JSON Web Tokens)
- **Hash de Senhas**: bcrypt
- **Validação**: Pydantic
- **CORS**: Configurado para permitir frontend

### Banco de Dados (ESCOLHA UMA)
**Opção 1 (Recomendada)**: PostgreSQL com SQLAlchemy
**Opção 2**: SQLite (para desenvolvimento/testes)
**Opção 3**: MongoDB com Motor (async)

---

## 📁 ESTRUTURA DO PROJETO OBRIGATÓRIA

```
backend-python/
├── main.py                 # Arquivo principal da aplicação
├── requirements.txt        # Dependências Python
├── .env                   # Variáveis de ambiente (NÃO commitar)
├── .env.example           # Template de variáveis
├── config.py              # Configurações centralizadas
├── database/
│   ├── __init__.py
│   ├── connection.py      # Conexão com banco de dados
│   └── models.py          # Modelos do banco de dados
├── schemas/
│   ├── __init__.py
│   ├── user.py           # Schemas Pydantic de usuário
│   ├── subject.py        # Schemas de matérias
│   ├── material.py       # Schemas de materiais
│   └── grade.py          # Schemas de notas
├── routes/
│   ├── __init__.py
│   ├── auth.py           # Rotas de autenticação
│   ├── student.py        # Rotas do aluno
│   └── teacher.py        # Rotas do professor
├── services/
│   ├── __init__.py
│   ├── auth_service.py   # Lógica de autenticação
│   ├── student_service.py # Lógica de aluno
│   └── teacher_service.py # Lógica de professor
├── middleware/
│   ├── __init__.py
│   └── auth_middleware.py # Middleware de autenticação
└── utils/
    ├── __init__.py
    ├── security.py       # Funções de hash/JWT
    └── validators.py     # Validadores customizados
```

---

## 🗄️ MODELO DE DADOS COMPLETO

### Tabela: users
```sql
id: UUID (PK)
name: VARCHAR(100) NOT NULL
email: VARCHAR(255) UNIQUE NOT NULL
password_hash: VARCHAR(255) NOT NULL
user_type: ENUM('student', 'teacher') NOT NULL
created_at: TIMESTAMP DEFAULT NOW()
updated_at: TIMESTAMP DEFAULT NOW()
```

### Tabela: classes
```sql
id: UUID (PK)
name: VARCHAR(200) NOT NULL
teacher_id: UUID (FK -> users.id)
subject: VARCHAR(100) NOT NULL
created_at: TIMESTAMP DEFAULT NOW()
```

### Tabela: class_students (Tabela de relacionamento)
```sql
id: UUID (PK)
class_id: UUID (FK -> classes.id)
student_id: UUID (FK -> users.id)
enrolled_at: TIMESTAMP DEFAULT NOW()
UNIQUE(class_id, student_id)
```

### Tabela: materials
```sql
id: UUID (PK)
class_id: UUID (FK -> classes.id)
title: VARCHAR(200) NOT NULL
file_url: TEXT NOT NULL
uploaded_by: UUID (FK -> users.id)
uploaded_at: TIMESTAMP DEFAULT NOW()
```

### Tabela: grades
```sql
id: UUID (PK)
class_id: UUID (FK -> classes.id)
student_id: UUID (FK -> users.id)
grade: DECIMAL(4,2) CHECK (grade >= 0 AND grade <= 10)
created_by: UUID (FK -> users.id)
created_at: TIMESTAMP DEFAULT NOW()
```

### Tabela: messages
```sql
id: UUID (PK)
class_id: UUID (FK -> classes.id)
from_user_id: UUID (FK -> users.id)
subject: VARCHAR(200) NOT NULL
message: TEXT NOT NULL
created_at: TIMESTAMP DEFAULT NOW()
```

---

## 🔐 API ENDPOINTS COMPLETOS

### **1. AUTENTICAÇÃO** (`/api/auth`)

#### POST /api/auth/register
**Descrição**: Cadastrar novo usuário

**Request Body**:
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123",
  "user_type": "student"
}
```

**Validações obrigatórias**:
- name: 3-100 caracteres
- email: formato válido, único no banco
- password: mínimo 6 caracteres
- user_type: apenas "student" ou "teacher"

**Response 201**:
```json
{
  "success": true,
  "message": "Usuário cadastrado com sucesso",
  "user": {
    "id": "uuid-aqui",
    "name": "João Silva",
    "email": "joao@email.com",
    "user_type": "student"
  }
}
```

**Response 400** (email já existe):
```json
{
  "success": false,
  "error": "Email já cadastrado"
}
```

---

#### POST /api/auth/login
**Descrição**: Fazer login e receber token JWT

**Request Body**:
```json
{
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Response 200**:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-aqui",
    "name": "João Silva",
    "email": "joao@email.com",
    "user_type": "student"
  }
}
```

**Response 401** (credenciais inválidas):
```json
{
  "success": false,
  "error": "Email ou senha incorretos"
}
```

---

### **2. ROTAS DO ALUNO** (`/api/student`)

**Todas as rotas requerem autenticação via header**:
```
Authorization: Bearer {token}
```

#### GET /api/student/subjects
**Descrição**: Buscar matérias do aluno logado

**Response 200**:
```json
{
  "success": true,
  "subjects": [
    {
      "id": "uuid",
      "name": "Matemática - 3º Ano A",
      "subject": "Matemática",
      "teacher": "Prof. Carlos Silva",
      "teacher_id": "uuid",
      "grade": 8.5
    }
  ]
}
```

---

#### GET /api/student/materials
**Descrição**: Buscar materiais de aula do aluno

**Query Params** (opcional):
```
?class_id=uuid
```

**Response 200**:
```json
{
  "success": true,
  "materials": [
    {
      "id": "uuid",
      "class_name": "Matemática - 3º Ano A",
      "subject": "Matemática",
      "title": "Álgebra Linear - Aula 01",
      "file_url": "https://storage.example.com/file.pdf",
      "uploaded_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

#### GET /api/student/messages
**Descrição**: Buscar mensagens recebidas

**Response 200**:
```json
{
  "success": true,
  "messages": [
    {
      "id": "uuid",
      "from": "Prof. Carlos Silva",
      "subject": "Lembrete de Prova",
      "message": "Lembrete: prova de matemática dia 20/01",
      "class_name": "Matemática - 3º Ano A",
      "created_at": "2024-01-10T14:20:00Z"
    }
  ]
}
```

---

### **3. ROTAS DO PROFESSOR** (`/api/teacher`)

**Todas as rotas requerem autenticação via header**:
```
Authorization: Bearer {token}
```

#### GET /api/teacher/classes
**Descrição**: Buscar turmas do professor logado

**Response 200**:
```json
{
  "success": true,
  "classes": [
    {
      "id": "uuid",
      "name": "Matemática - 3º Ano A",
      "subject": "Matemática",
      "students_count": 30,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

#### POST /api/teacher/classes
**Descrição**: Criar nova turma

**Request Body**:
```json
{
  "name": "Matemática - 3º Ano A",
  "subject": "Matemática"
}
```

**Response 201**:
```json
{
  "success": true,
  "message": "Turma criada com sucesso",
  "class": {
    "id": "uuid",
    "name": "Matemática - 3º Ano A",
    "subject": "Matemática"
  }
}
```

---

#### GET /api/teacher/students
**Descrição**: Buscar alunos de uma turma

**Query Params** (obrigatório):
```
?class_id=uuid
```

**Response 200**:
```json
{
  "success": true,
  "students": [
    {
      "id": "uuid",
      "name": "João Silva",
      "email": "joao@email.com",
      "grade": 8.5,
      "enrolled_at": "2024-01-05T00:00:00Z"
    }
  ]
}
```

---

#### POST /api/teacher/students
**Descrição**: Adicionar aluno a uma turma

**Request Body**:
```json
{
  "class_id": "uuid",
  "student_email": "joao@email.com"
}
```

**Response 201**:
```json
{
  "success": true,
  "message": "Aluno adicionado à turma com sucesso"
}
```

---

#### POST /api/teacher/materials
**Descrição**: Upload de material didático

**Headers**:
```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Request Body (FormData)**:
```
class_id: uuid
title: "Álgebra Linear - Aula 01"
file: [arquivo]
```

**Response 201**:
```json
{
  "success": true,
  "message": "Material enviado com sucesso",
  "material": {
    "id": "uuid",
    "title": "Álgebra Linear - Aula 01",
    "file_url": "https://storage.example.com/file.pdf"
  }
}
```

---

#### POST /api/teacher/grades
**Descrição**: Lançar ou atualizar nota de aluno

**Request Body**:
```json
{
  "class_id": "uuid",
  "student_id": "uuid",
  "grade": 8.5
}
```

**Validações**:
- grade: 0-10 com até 2 casas decimais

**Response 201**:
```json
{
  "success": true,
  "message": "Nota lançada com sucesso"
}
```

---

#### POST /api/teacher/messages
**Descrição**: Enviar mensagem para turma

**Request Body**:
```json
{
  "class_id": "uuid",
  "subject": "Lembrete de Prova",
  "message": "Lembrete: prova de matemática dia 20/01"
}
```

**Validações**:
- subject: máximo 200 caracteres
- message: máximo 1000 caracteres

**Response 201**:
```json
{
  "success": true,
  "message": "Mensagem enviada com sucesso"
}
```

---

## 🔒 REQUISITOS DE SEGURANÇA OBRIGATÓRIOS

### 1. Hash de Senhas
```python
import bcrypt

def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode(), salt).decode()

def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode(), hashed.encode())
```

### 2. JWT Token
```python
from jose import jwt
from datetime import datetime, timedelta

SECRET_KEY = "sua-chave-super-secreta-aqui"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 horas

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
```

### 3. Middleware de Autenticação
```python
from fastapi import Depends, HTTPException, Header
from jose import jwt, JWTError

async def verify_token(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Token não fornecido")
    
    try:
        token = authorization.replace("Bearer ", "")
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("user_id")
        if not user_id:
            raise HTTPException(status_code=401, detail="Token inválido")
        return user_id
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido ou expirado")
```

### 4. CORS Configuration
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://seuapp.lovable.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 5. Validação de Dados
```python
from pydantic import BaseModel, EmailStr, constr, confloat, validator

class UserRegister(BaseModel):
    name: constr(min_length=3, max_length=100)
    email: EmailStr
    password: constr(min_length=6)
    user_type: str
    
    @validator('user_type')
    def validate_user_type(cls, v):
        if v not in ['student', 'teacher']:
            raise ValueError('user_type deve ser student ou teacher')
        return v

class GradeCreate(BaseModel):
    class_id: str
    student_id: str
    grade: confloat(ge=0, le=10)
```

---

## 📦 REQUIREMENTS.TXT COMPLETO

```txt
fastapi==0.109.0
uvicorn[standard]==0.27.0
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
bcrypt==4.1.2
pydantic[email]==2.5.3
python-multipart==0.0.6
pyjwt==2.8.0
python-dotenv==1.0.0

# Escolha o banco de dados:
# PostgreSQL:
psycopg2-binary==2.9.9
sqlalchemy==2.0.25

# OU SQLite (já vem com Python)
# OU MongoDB:
# motor==3.3.2
# pymongo==4.6.1
```

---

## 🌐 VARIÁVEIS DE AMBIENTE (.env)

```env
# Segurança
SECRET_KEY=sua-chave-secreta-super-segura-aqui-use-geradora-de-senha
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# Banco de Dados (PostgreSQL)
DATABASE_URL=postgresql://usuario:senha@localhost:5432/lumina

# OU SQLite
# DATABASE_URL=sqlite:///./lumina.db

# CORS
CORS_ORIGINS=http://localhost:5173,https://seuapp.lovable.app

# Servidor
HOST=0.0.0.0
PORT=8000

# Uploads (se usar storage externo)
# STORAGE_BUCKET=lumina-materials
# STORAGE_URL=https://storage.example.com
```

---

## 🧪 INSTRUÇÕES DE IMPLEMENTAÇÃO

### PASSO 1: Estrutura Base
1. Crie a estrutura de pastas completa
2. Configure o `main.py` com FastAPI e CORS
3. Configure o `config.py` com variáveis de ambiente
4. Crie o `requirements.txt`

### PASSO 2: Banco de Dados
1. Configure a conexão em `database/connection.py`
2. Defina todos os modelos em `database/models.py`
3. Crie função para inicializar tabelas

### PASSO 3: Schemas Pydantic
1. Crie schemas de validação em `schemas/`
2. Adicione validators customizados
3. Configure responses

### PASSO 4: Autenticação
1. Implemente funções de hash em `utils/security.py`
2. Implemente JWT em `utils/security.py`
3. Crie middleware de autenticação
4. Implemente rotas de registro e login

### PASSO 5: Rotas de Negócio
1. Implemente rotas do aluno em `routes/student.py`
2. Implemente rotas do professor em `routes/teacher.py`
3. Crie services para lógica de negócio
4. Adicione tratamento de erros

### PASSO 6: Upload de Arquivos
1. Configure storage local ou use serviço externo
2. Implemente rota de upload
3. Valide tipos e tamanhos de arquivo

### PASSO 7: Testes e Validação
1. Teste todos os endpoints
2. Valide autenticação
3. Valide permissões (aluno vs professor)

---

## ✅ CHECKLIST DE VALIDAÇÃO

### Segurança
- [ ] Senhas são hashadas com bcrypt
- [ ] JWT configurado corretamente
- [ ] Middleware de autenticação funciona
- [ ] CORS configurado
- [ ] Validação de dados com Pydantic
- [ ] Variáveis sensíveis em .env

### Endpoints
- [ ] POST /api/auth/register funciona
- [ ] POST /api/auth/login retorna token válido
- [ ] GET /api/student/subjects funciona com auth
- [ ] GET /api/student/materials funciona
- [ ] GET /api/student/messages funciona
- [ ] GET /api/teacher/classes funciona
- [ ] POST /api/teacher/classes funciona
- [ ] GET /api/teacher/students funciona
- [ ] POST /api/teacher/students funciona
- [ ] POST /api/teacher/materials funciona (upload)
- [ ] POST /api/teacher/grades funciona
- [ ] POST /api/teacher/messages funciona

### Banco de Dados
- [ ] Todas as tabelas criadas
- [ ] Relacionamentos corretos
- [ ] Constraints funcionando
- [ ] Queries otimizadas

### Qualidade
- [ ] Código organizado e limpo
- [ ] Comentários em funções complexas
- [ ] Tratamento de erros adequado
- [ ] Logs informativos
- [ ] README.md atualizado

---

## 🚀 COMANDOS PARA EXECUTAR

```bash
# Instalar dependências
pip install -r requirements.txt

# Criar arquivo .env baseado no .env.example
cp .env.example .env

# Executar servidor
python main.py

# Ou com uvicorn diretamente
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

---

## 📝 FORMATO DE RESPOSTA ESPERADO

**POR FAVOR, RETORNE O CÓDIGO COMPLETO DOS SEGUINTES ARQUIVOS**:

1. `main.py` - Arquivo principal completo
2. `config.py` - Configurações
3. `database/connection.py` - Conexão BD
4. `database/models.py` - Modelos completos
5. `utils/security.py` - Funções de segurança
6. `middleware/auth_middleware.py` - Middleware
7. `routes/auth.py` - Rotas de autenticação
8. `routes/student.py` - Rotas do aluno
9. `routes/teacher.py` - Rotas do professor
10. `schemas/` - Todos os schemas necessários
11. `requirements.txt` - Dependências
12. `.env.example` - Template de variáveis

---

## 🎯 IMPORTANTE

- **GERE O CÓDIGO COMPLETO E FUNCIONAL**
- Não use código de exemplo ou TODO comments
- Implemente TODAS as funcionalidades descritas
- Use as melhores práticas de Python e FastAPI
- Comente apenas código complexo
- Siga exatamente a estrutura de pastas especificada
- Valide todos os dados de entrada
- Implemente tratamento de erros adequado
- Configure logging apropriado

---

**CHATGPT, POR FAVOR GERE AGORA O BACKEND COMPLETO SEGUINDO TODAS AS ESPECIFICAÇÕES ACIMA!**
