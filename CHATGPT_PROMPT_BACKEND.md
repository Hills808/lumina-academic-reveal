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
- **Linguagem**: Python 3.10, 3.11 ou 3.12 (RECOMENDADO: 3.11)
- **⚠️ IMPORTANTE**: Se estiver usando Python 3.13+ ou 3.14+, algumas dependências podem não ser compatíveis
- **Autenticação**: JWT (JSON Web Tokens)
- **Hash de Senhas**: bcrypt
- **Validação**: Pydantic
- **CORS**: Configurado para permitir frontend

### ⚠️ COMPATIBILIDADE DE VERSÃO DO PYTHON

**Se você está usando Python 3.13+ ou 3.14+:**

1. **Opção 1 (RECOMENDADA)**: Instale Python 3.11 ou 3.12
   - Python 3.11 tem melhor compatibilidade com todas as bibliotecas
   - Download: https://www.python.org/downloads/

2. **Opção 2**: Use pyenv para gerenciar versões
   ```bash
   # Instalar pyenv
   curl https://pyenv.run | bash
   
   # Instalar Python 3.11
   pyenv install 3.11.9
   pyenv local 3.11.9
   ```

3. **Opção 3**: Atualize as dependências (pode ter bugs)
   - Algumas bibliotecas podem não funcionar corretamente
   - Você pode precisar ajustar versões no requirements.txt

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

---

## 💾 IMPLEMENTAÇÃO DE STORAGE DE ARQUIVOS

### Opção 1: Storage Local (Recomendado para início)
```python
import os
import shutil
from fastapi import UploadFile, HTTPException
from datetime import datetime

UPLOAD_DIR = "uploads/materials"
os.makedirs(UPLOAD_DIR, exist_ok=True)

async def save_upload_file(upload_file: UploadFile) -> str:
    # Gerar nome único
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"{timestamp}_{upload_file.filename}"
    file_path = os.path.join(UPLOAD_DIR, filename)
    
    # Salvar arquivo
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)
    
    # Retornar URL relativa
    return f"/uploads/materials/{filename}"

# Validações de arquivo
ALLOWED_EXTENSIONS = {'.pdf', '.doc', '.docx', '.ppt', '.pptx', '.txt', '.xlsx', '.xls'}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

def validate_file(upload_file: UploadFile):
    # Verificar extensão
    ext = os.path.splitext(upload_file.filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(400, detail="Tipo de arquivo não permitido")
    return True
```

**No main.py, adicione para servir arquivos estáticos**:
```python
from fastapi.staticfiles import StaticFiles

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
```

### Opção 2: AWS S3 (Para produção)
```python
import boto3
from botocore.exceptions import ClientError

s3_client = boto3.client(
    's3',
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY'),
    aws_secret_access_key=os.getenv('AWS_SECRET_KEY'),
    region_name=os.getenv('AWS_REGION', 'us-east-1')
)

async def upload_to_s3(upload_file: UploadFile) -> str:
    bucket = os.getenv('S3_BUCKET_NAME')
    filename = f"materials/{datetime.now().strftime('%Y%m%d_%H%M%S')}_{upload_file.filename}"
    
    try:
        s3_client.upload_fileobj(
            upload_file.file,
            bucket,
            filename,
            ExtraArgs={'ContentType': upload_file.content_type}
        )
        return f"https://{bucket}.s3.amazonaws.com/{filename}"
    except ClientError as e:
        raise HTTPException(500, detail="Erro ao fazer upload do arquivo")
```

---

## 🔌 EXEMPLO COMPLETO DE CONEXÃO COM BANCO DE DADOS

### PostgreSQL com SQLAlchemy (RECOMENDADO)

**database/connection.py**:
```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    """Dependency para obter sessão do banco"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    """Criar todas as tabelas"""
    Base.metadata.create_all(bind=engine)
    print("✅ Banco de dados inicializado com sucesso!")
```

**database/models.py**:
```python
from sqlalchemy import Column, String, Enum, ForeignKey, DECIMAL, Text, DateTime, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from .connection import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    user_type = Column(Enum('student', 'teacher', name='user_type_enum'), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    taught_classes = relationship("Class", back_populates="teacher", foreign_keys="Class.teacher_id")
    enrolled_classes = relationship("ClassStudent", back_populates="student")

class Class(Base):
    __tablename__ = "classes"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(200), nullable=False)
    subject = Column(String(100), nullable=False)
    teacher_id = Column(UUID(as_uuid=True), ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    teacher = relationship("User", back_populates="taught_classes", foreign_keys=[teacher_id])
    students = relationship("ClassStudent", back_populates="class_obj")
    materials = relationship("Material", back_populates="class_obj")
    grades = relationship("Grade", back_populates="class_obj")
    messages = relationship("Message", back_populates="class_obj")

class ClassStudent(Base):
    __tablename__ = "class_students"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    class_id = Column(UUID(as_uuid=True), ForeignKey('classes.id', ondelete='CASCADE'), nullable=False)
    student_id = Column(UUID(as_uuid=True), ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    enrolled_at = Column(DateTime, default=datetime.utcnow)
    
    __table_args__ = (UniqueConstraint('class_id', 'student_id', name='unique_class_student'),)
    
    # Relationships
    class_obj = relationship("Class", back_populates="students")
    student = relationship("User", back_populates="enrolled_classes")

class Material(Base):
    __tablename__ = "materials"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    class_id = Column(UUID(as_uuid=True), ForeignKey('classes.id', ondelete='CASCADE'), nullable=False)
    title = Column(String(200), nullable=False)
    file_url = Column(Text, nullable=False)
    uploaded_by = Column(UUID(as_uuid=True), ForeignKey('users.id', ondelete='SET NULL'))
    uploaded_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    class_obj = relationship("Class", back_populates="materials")
    uploader = relationship("User")

class Grade(Base):
    __tablename__ = "grades"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    class_id = Column(UUID(as_uuid=True), ForeignKey('classes.id', ondelete='CASCADE'), nullable=False)
    student_id = Column(UUID(as_uuid=True), ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    grade = Column(DECIMAL(4, 2), nullable=False)
    created_by = Column(UUID(as_uuid=True), ForeignKey('users.id', ondelete='SET NULL'))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    class_obj = relationship("Class", back_populates="grades")
    student = relationship("User", foreign_keys=[student_id])
    creator = relationship("User", foreign_keys=[created_by])

class Message(Base):
    __tablename__ = "messages"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    class_id = Column(UUID(as_uuid=True), ForeignKey('classes.id', ondelete='CASCADE'), nullable=False)
    from_user_id = Column(UUID(as_uuid=True), ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    subject = Column(String(200), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    class_obj = relationship("Class", back_populates="messages")
    sender = relationship("User")
```

---

## 🎯 TRATAMENTO DE ERROS PADRONIZADO

**utils/exceptions.py**:
```python
from fastapi import Request
from fastapi.responses import JSONResponse

class AppException(Exception):
    """Exceção base da aplicação"""
    def __init__(self, status_code: int, message: str):
        self.status_code = status_code
        self.message = message

async def app_exception_handler(request: Request, exc: AppException):
    """Handler para exceções customizadas"""
    return JSONResponse(
        status_code=exc.status_code,
        content={"success": False, "error": exc.message}
    )

# Exceções específicas
class UnauthorizedException(AppException):
    def __init__(self, message: str = "Não autorizado"):
        super().__init__(401, message)

class NotFoundException(AppException):
    def __init__(self, message: str = "Recurso não encontrado"):
        super().__init__(404, message)

class BadRequestException(AppException):
    def __init__(self, message: str = "Requisição inválida"):
        super().__init__(400, message)

class ForbiddenException(AppException):
    def __init__(self, message: str = "Acesso negado"):
        super().__init__(403, message)

class ConflictException(AppException):
    def __init__(self, message: str = "Conflito de dados"):
        super().__init__(409, message)
```

**No main.py, adicione**:
```python
from utils.exceptions import app_exception_handler, AppException

app.add_exception_handler(AppException, app_exception_handler)
```

---

## 📦 SERVICES - EXEMPLO DE ESTRUTURA

**services/student_service.py**:
```python
from sqlalchemy.orm import Session
from database.models import User, Class, ClassStudent, Material, Grade, Message
from utils.exceptions import NotFoundException
from typing import List, Optional
import uuid

class StudentService:
    def __init__(self, db: Session):
        self.db = db
    
    def get_subjects(self, student_id: uuid.UUID) -> List[dict]:
        """Busca matérias do aluno com notas"""
        enrollments = self.db.query(ClassStudent).filter(
            ClassStudent.student_id == student_id
        ).all()
        
        result = []
        for enrollment in enrollments:
            class_obj = self.db.query(Class).filter(Class.id == enrollment.class_id).first()
            if not class_obj:
                continue
                
            teacher = self.db.query(User).filter(User.id == class_obj.teacher_id).first()
            
            grade = self.db.query(Grade).filter(
                Grade.class_id == enrollment.class_id,
                Grade.student_id == student_id
            ).first()
            
            result.append({
                "id": str(class_obj.id),
                "name": class_obj.name,
                "subject": class_obj.subject,
                "teacher": teacher.name if teacher else "N/A",
                "teacher_id": str(class_obj.teacher_id),
                "grade": float(grade.grade) if grade else None
            })
        
        return result
    
    def get_materials(self, student_id: uuid.UUID, class_id: Optional[uuid.UUID] = None) -> List[dict]:
        """Busca materiais disponíveis para o aluno"""
        # Buscar turmas do aluno
        enrollments = self.db.query(ClassStudent.class_id).filter(
            ClassStudent.student_id == student_id
        )
        
        if class_id:
            enrollments = enrollments.filter(ClassStudent.class_id == class_id)
        
        class_ids = [e.class_id for e in enrollments.all()]
        
        materials = self.db.query(Material).filter(
            Material.class_id.in_(class_ids)
        ).order_by(Material.uploaded_at.desc()).all()
        
        result = []
        for material in materials:
            class_obj = self.db.query(Class).filter(Class.id == material.class_id).first()
            
            result.append({
                "id": str(material.id),
                "class_name": class_obj.name if class_obj else "N/A",
                "subject": class_obj.subject if class_obj else "N/A",
                "title": material.title,
                "file_url": material.file_url,
                "uploaded_at": material.uploaded_at.isoformat()
            })
        
        return result
    
    def get_messages(self, student_id: uuid.UUID) -> List[dict]:
        """Busca mensagens recebidas pelo aluno"""
        enrollments = self.db.query(ClassStudent.class_id).filter(
            ClassStudent.student_id == student_id
        )
        class_ids = [e.class_id for e in enrollments.all()]
        
        messages = self.db.query(Message).filter(
            Message.class_id.in_(class_ids)
        ).order_by(Message.created_at.desc()).all()
        
        result = []
        for msg in messages:
            sender = self.db.query(User).filter(User.id == msg.from_user_id).first()
            class_obj = self.db.query(Class).filter(Class.id == msg.class_id).first()
            
            result.append({
                "id": str(msg.id),
                "from": sender.name if sender else "N/A",
                "subject": msg.subject,
                "message": msg.message,
                "class_name": class_obj.name if class_obj else "N/A",
                "created_at": msg.created_at.isoformat()
            })
        
        return result
```

**services/teacher_service.py**:
```python
from sqlalchemy.orm import Session
from database.models import User, Class, ClassStudent, Material, Grade, Message
from utils.exceptions import NotFoundException, BadRequestException, ConflictException
from typing import List, Optional
import uuid

class TeacherService:
    def __init__(self, db: Session):
        self.db = db
    
    def get_classes(self, teacher_id: uuid.UUID) -> List[dict]:
        """Busca turmas do professor"""
        classes = self.db.query(Class).filter(Class.teacher_id == teacher_id).all()
        
        result = []
        for class_obj in classes:
            students_count = self.db.query(ClassStudent).filter(
                ClassStudent.class_id == class_obj.id
            ).count()
            
            result.append({
                "id": str(class_obj.id),
                "name": class_obj.name,
                "subject": class_obj.subject,
                "students_count": students_count,
                "created_at": class_obj.created_at.isoformat()
            })
        
        return result
    
    def create_class(self, teacher_id: uuid.UUID, name: str, subject: str) -> dict:
        """Cria nova turma"""
        new_class = Class(
            name=name,
            subject=subject,
            teacher_id=teacher_id
        )
        self.db.add(new_class)
        self.db.commit()
        self.db.refresh(new_class)
        
        return {
            "id": str(new_class.id),
            "name": new_class.name,
            "subject": new_class.subject
        }
    
    def get_students(self, teacher_id: uuid.UUID, class_id: uuid.UUID) -> List[dict]:
        """Busca alunos de uma turma"""
        # Verificar se a turma pertence ao professor
        class_obj = self.db.query(Class).filter(
            Class.id == class_id,
            Class.teacher_id == teacher_id
        ).first()
        
        if not class_obj:
            raise NotFoundException("Turma não encontrada ou não pertence a você")
        
        enrollments = self.db.query(ClassStudent).filter(
            ClassStudent.class_id == class_id
        ).all()
        
        result = []
        for enrollment in enrollments:
            student = self.db.query(User).filter(User.id == enrollment.student_id).first()
            grade = self.db.query(Grade).filter(
                Grade.class_id == class_id,
                Grade.student_id == enrollment.student_id
            ).first()
            
            result.append({
                "id": str(student.id),
                "name": student.name,
                "email": student.email,
                "grade": float(grade.grade) if grade else None,
                "enrolled_at": enrollment.enrolled_at.isoformat()
            })
        
        return result
    
    def add_student(self, teacher_id: uuid.UUID, class_id: uuid.UUID, student_email: str) -> None:
        """Adiciona aluno a uma turma"""
        # Verificar se a turma pertence ao professor
        class_obj = self.db.query(Class).filter(
            Class.id == class_id,
            Class.teacher_id == teacher_id
        ).first()
        
        if not class_obj:
            raise NotFoundException("Turma não encontrada")
        
        # Buscar aluno por email
        student = self.db.query(User).filter(
            User.email == student_email,
            User.user_type == 'student'
        ).first()
        
        if not student:
            raise NotFoundException("Aluno não encontrado")
        
        # Verificar se já está matriculado
        existing = self.db.query(ClassStudent).filter(
            ClassStudent.class_id == class_id,
            ClassStudent.student_id == student.id
        ).first()
        
        if existing:
            raise ConflictException("Aluno já está matriculado nesta turma")
        
        # Adicionar
        enrollment = ClassStudent(class_id=class_id, student_id=student.id)
        self.db.add(enrollment)
        self.db.commit()
    
    def save_material(self, teacher_id: uuid.UUID, class_id: uuid.UUID, 
                     title: str, file_url: str) -> dict:
        """Salva material de aula"""
        # Verificar se a turma pertence ao professor
        class_obj = self.db.query(Class).filter(
            Class.id == class_id,
            Class.teacher_id == teacher_id
        ).first()
        
        if not class_obj:
            raise NotFoundException("Turma não encontrada")
        
        material = Material(
            class_id=class_id,
            title=title,
            file_url=file_url,
            uploaded_by=teacher_id
        )
        self.db.add(material)
        self.db.commit()
        self.db.refresh(material)
        
        return {
            "id": str(material.id),
            "title": material.title,
            "file_url": material.file_url
        }
    
    def save_grade(self, teacher_id: uuid.UUID, class_id: uuid.UUID,
                   student_id: uuid.UUID, grade_value: float) -> None:
        """Lança ou atualiza nota"""
        # Verificar se a turma pertence ao professor
        class_obj = self.db.query(Class).filter(
            Class.id == class_id,
            Class.teacher_id == teacher_id
        ).first()
        
        if not class_obj:
            raise NotFoundException("Turma não encontrada")
        
        # Verificar se o aluno está na turma
        enrollment = self.db.query(ClassStudent).filter(
            ClassStudent.class_id == class_id,
            ClassStudent.student_id == student_id
        ).first()
        
        if not enrollment:
            raise BadRequestException("Aluno não está matriculado nesta turma")
        
        # Buscar nota existente
        existing_grade = self.db.query(Grade).filter(
            Grade.class_id == class_id,
            Grade.student_id == student_id
        ).first()
        
        if existing_grade:
            existing_grade.grade = grade_value
            existing_grade.created_by = teacher_id
        else:
            new_grade = Grade(
                class_id=class_id,
                student_id=student_id,
                grade=grade_value,
                created_by=teacher_id
            )
            self.db.add(new_grade)
        
        self.db.commit()
    
    def send_message(self, teacher_id: uuid.UUID, class_id: uuid.UUID,
                    subject: str, message: str) -> None:
        """Envia mensagem para turma"""
        # Verificar se a turma pertence ao professor
        class_obj = self.db.query(Class).filter(
            Class.id == class_id,
            Class.teacher_id == teacher_id
        ).first()
        
        if not class_obj:
            raise NotFoundException("Turma não encontrada")
        
        new_message = Message(
            class_id=class_id,
            from_user_id=teacher_id,
            subject=subject,
            message=message
        )
        self.db.add(new_message)
        self.db.commit()
```

---

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

## 💾 IMPLEMENTAÇÃO DE STORAGE DE ARQUIVOS

### Opção 1: Storage Local (Recomendado para início)
```python
import os
import shutil
from fastapi import UploadFile
from datetime import datetime

UPLOAD_DIR = "uploads/materials"
os.makedirs(UPLOAD_DIR, exist_ok=True)

async def save_upload_file(upload_file: UploadFile) -> str:
    # Gerar nome único
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"{timestamp}_{upload_file.filename}"
    file_path = os.path.join(UPLOAD_DIR, filename)
    
    # Salvar arquivo
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)
    
    # Retornar URL relativa
    return f"/uploads/materials/{filename}"

# Validações de arquivo
ALLOWED_EXTENSIONS = {'.pdf', '.doc', '.docx', '.ppt', '.pptx', '.txt'}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

def validate_file(upload_file: UploadFile):
    # Verificar extensão
    ext = os.path.splitext(upload_file.filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(400, "Tipo de arquivo não permitido")
    
    # Verificar tamanho (implementar no endpoint)
    return True
```

### Opção 2: AWS S3 (Para produção)
```python
import boto3
from botocore.exceptions import ClientError

s3_client = boto3.client(
    's3',
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY'),
    aws_secret_access_key=os.getenv('AWS_SECRET_KEY'),
    region_name=os.getenv('AWS_REGION')
)

async def upload_to_s3(upload_file: UploadFile) -> str:
    bucket = os.getenv('S3_BUCKET_NAME')
    filename = f"materials/{datetime.now().strftime('%Y%m%d_%H%M%S')}_{upload_file.filename}"
    
    try:
        s3_client.upload_fileobj(
            upload_file.file,
            bucket,
            filename,
            ExtraArgs={'ContentType': upload_file.content_type}
        )
        return f"https://{bucket}.s3.amazonaws.com/{filename}"
    except ClientError as e:
        raise HTTPException(500, "Erro ao fazer upload do arquivo")
```

---

## 🔌 EXEMPLO COMPLETO DE CONEXÃO COM BANCO DE DADOS

### PostgreSQL com SQLAlchemy (RECOMENDADO)

**database/connection.py**:
```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    Base.metadata.create_all(bind=engine)
```

**database/models.py**:
```python
from sqlalchemy import Column, String, Enum, ForeignKey, DECIMAL, Text, DateTime, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from .connection import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    user_type = Column(Enum('student', 'teacher', name='user_type_enum'), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Class(Base):
    __tablename__ = "classes"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(200), nullable=False)
    subject = Column(String(100), nullable=False)
    teacher_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    teacher = relationship("User", backref="classes")

class ClassStudent(Base):
    __tablename__ = "class_students"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    class_id = Column(UUID(as_uuid=True), ForeignKey('classes.id'), nullable=False)
    student_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    enrolled_at = Column(DateTime, default=datetime.utcnow)
    
    __table_args__ = (UniqueConstraint('class_id', 'student_id'),)

class Material(Base):
    __tablename__ = "materials"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    class_id = Column(UUID(as_uuid=True), ForeignKey('classes.id'), nullable=False)
    title = Column(String(200), nullable=False)
    file_url = Column(Text, nullable=False)
    uploaded_by = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    uploaded_at = Column(DateTime, default=datetime.utcnow)

class Grade(Base):
    __tablename__ = "grades"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    class_id = Column(UUID(as_uuid=True), ForeignKey('classes.id'), nullable=False)
    student_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    grade = Column(DECIMAL(4, 2), nullable=False)
    created_by = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class Message(Base):
    __tablename__ = "messages"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    class_id = Column(UUID(as_uuid=True), ForeignKey('classes.id'), nullable=False)
    from_user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
    subject = Column(String(200), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
```

---

## 🎯 TRATAMENTO DE ERROS PADRONIZADO

Crie um arquivo `utils/exceptions.py`:

```python
from fastapi import HTTPException, Request
from fastapi.responses import JSONResponse

class AppException(Exception):
    def __init__(self, status_code: int, message: str):
        self.status_code = status_code
        self.message = message

async def app_exception_handler(request: Request, exc: AppException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"success": False, "error": exc.message}
    )

# Exceções customizadas
class UnauthorizedException(AppException):
    def __init__(self, message: str = "Não autorizado"):
        super().__init__(401, message)

class NotFoundException(AppException):
    def __init__(self, message: str = "Recurso não encontrado"):
        super().__init__(404, message)

class BadRequestException(AppException):
    def __init__(self, message: str = "Requisição inválida"):
        super().__init__(400, message)

class ForbiddenException(AppException):
    def __init__(self, message: str = "Acesso negado"):
        super().__init__(403, message)
```

No `main.py`, adicione:
```python
from utils.exceptions import app_exception_handler, AppException

app.add_exception_handler(AppException, app_exception_handler)
```

---

## 📦 SERVICES - EXEMPLO DE ESTRUTURA

**services/student_service.py**:
```python
from sqlalchemy.orm import Session
from database.models import User, Class, ClassStudent, Material, Grade, Message
from utils.exceptions import NotFoundException

class StudentService:
    def __init__(self, db: Session):
        self.db = db
    
    def get_subjects(self, student_id: str):
        """Busca matérias do aluno com notas"""
        enrollments = self.db.query(ClassStudent).filter(
            ClassStudent.student_id == student_id
        ).all()
        
        result = []
        for enrollment in enrollments:
            class_obj = enrollment.class_id  # Ajustar conforme relacionamento
            grade = self.db.query(Grade).filter(
                Grade.class_id == enrollment.class_id,
                Grade.student_id == student_id
            ).first()
            
            result.append({
                "id": str(class_obj.id),
                "name": class_obj.name,
                "subject": class_obj.subject,
                "teacher": class_obj.teacher.name,
                "teacher_id": str(class_obj.teacher_id),
                "grade": float(grade.grade) if grade else None
            })
        
        return result
    
    def get_materials(self, student_id: str, class_id: str = None):
        """Busca materiais disponíveis para o aluno"""
        query = self.db.query(Material).join(ClassStudent).filter(
            ClassStudent.student_id == student_id
        )
        
        if class_id:
            query = query.filter(Material.class_id == class_id)
        
        materials = query.all()
        # Formatar resposta conforme API
        return materials
```

---

## 🧪 INSTRUÇÕES DE IMPLEMENTAÇÃO

### IMPORTANTE: GERE CÓDIGO FUNCIONAL COMPLETO

**NÃO deixe comentários como**:
- `# TODO: implementar`
- `# Implementar lógica aqui`
- `# Adicionar validação`

**IMPLEMENTE TUDO de forma funcional e completa!**

### PASSO 1: Estrutura Base
1. Crie TODOS os arquivos da estrutura de pastas
2. Configure o `main.py` com FastAPI, CORS e exception handlers
3. Configure o `config.py` com variáveis de ambiente
4. Crie o `requirements.txt` completo

### PASSO 2: Banco de Dados
1. Implemente `database/connection.py` COMPLETO (use exemplo acima)
2. Implemente `database/models.py` COMPLETO (use exemplo acima)
3. Adicione função `init_db()` funcional

### PASSO 3: Schemas Pydantic
1. Crie TODOS os schemas em `schemas/` com validação completa
2. Adicione validators customizados onde necessário
3. Configure responses models

### PASSO 4: Autenticação
1. Implemente `utils/security.py` COMPLETO (hash, JWT, verify_token)
2. Implemente `middleware/auth_middleware.py` funcional
3. Implemente `routes/auth.py` com registro e login COMPLETOS

### PASSO 5: Rotas de Negócio
1. Implemente `services/student_service.py` COMPLETO
2. Implemente `services/teacher_service.py` COMPLETO
3. Implemente `routes/student.py` usando os services
4. Implemente `routes/teacher.py` usando os services

### PASSO 6: Upload de Arquivos
1. Implemente storage (local ou S3) COMPLETO
2. Adicione validações de arquivo
3. Integre com rota de upload do professor

### PASSO 7: Main.py Final
1. Importe todas as rotas
2. Configure exception handlers
3. Configure CORS
4. Adicione documentação OpenAPI
5. Configure servidor uvicorn

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

## 📝 EXEMPLO DE CÓDIGO - MAIN.PY COMPLETO

Aqui está um exemplo de como o `main.py` deve ficar:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
import os
import uvicorn

# Carregar variáveis de ambiente
load_dotenv()

# Imports locais
from database.connection import init_db
from utils.exceptions import app_exception_handler, AppException
from routes import auth, student, teacher

# Criar aplicação
app = FastAPI(
    title="LUMINA API",
    description="API para plataforma educacional",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "http://localhost:5173").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Handler de exceções customizadas
app.add_exception_handler(AppException, app_exception_handler)

# Servir arquivos estáticos (uploads)
os.makedirs("uploads/materials", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Registrar rotas
app.include_router(auth.router, prefix="/api/auth", tags=["Autenticação"])
app.include_router(student.router, prefix="/api/student", tags=["Aluno"])
app.include_router(teacher.router, prefix="/api/teacher", tags=["Professor"])

# Rota raiz
@app.get("/")
async def root():
    return {
        "message": "LUMINA API - Sistema Educacional",
        "version": "1.0.0",
        "docs": "/docs"
    }

# Rota de health check
@app.get("/health")
async def health():
    return {"status": "ok"}

# Evento de inicialização
@app.on_event("startup")
async def startup_event():
    print("🚀 Iniciando LUMINA API...")
    init_db()
    print("✅ API pronta!")

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    
    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=True
    )
```

---

## 📝 EXEMPLO DE ROTA - routes/auth.py

```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.connection import get_db
from database.models import User
from schemas.user import UserRegister, UserLogin, UserResponse
from utils.security import hash_password, verify_password, create_access_token
from utils.exceptions import BadRequestException, UnauthorizedException

router = APIRouter()

@router.post("/register", response_model=dict, status_code=201)
async def register(user_data: UserRegister, db: Session = Depends(get_db)):
    """Cadastrar novo usuário"""
    
    # Verificar se email já existe
    existing = db.query(User).filter(User.email == user_data.email).first()
    if existing:
        raise BadRequestException("Email já cadastrado")
    
    # Criar usuário
    hashed_pw = hash_password(user_data.password)
    new_user = User(
        name=user_data.name,
        email=user_data.email,
        password_hash=hashed_pw,
        user_type=user_data.user_type
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {
        "success": True,
        "message": "Usuário cadastrado com sucesso",
        "user": {
            "id": str(new_user.id),
            "name": new_user.name,
            "email": new_user.email,
            "user_type": new_user.user_type
        }
    }

@router.post("/login", response_model=dict)
async def login(credentials: UserLogin, db: Session = Depends(get_db)):
    """Fazer login"""
    
    # Buscar usuário
    user = db.query(User).filter(User.email == credentials.email).first()
    if not user:
        raise UnauthorizedException("Email ou senha incorretos")
    
    # Verificar senha
    if not verify_password(credentials.password, user.password_hash):
        raise UnauthorizedException("Email ou senha incorretos")
    
    # Criar token
    token = create_access_token({
        "user_id": str(user.id),
        "email": user.email,
        "user_type": user.user_type
    })
    
    return {
        "success": True,
        "token": token,
        "user": {
            "id": str(user.id),
            "name": user.name,
            "email": user.email,
            "user_type": user.user_type
        }
    }
```

---

## 📝 FORMATO DE RESPOSTA ESPERADO

**POR FAVOR, RETORNE O CÓDIGO COMPLETO E FUNCIONAL DOS SEGUINTES ARQUIVOS**:

### Arquivos Obrigatórios:

1. **main.py** - Arquivo principal completo (use exemplo acima como base)
2. **config.py** - Configurações centralizadas
3. **requirements.txt** - Todas as dependências
4. **.env.example** - Template de variáveis

### Database:
5. **database/__init__.py** - Arquivo vazio ou imports
6. **database/connection.py** - Conexão com banco (use exemplo completo acima)
7. **database/models.py** - Todos os modelos (use exemplo completo acima)

### Schemas (Pydantic):
8. **schemas/__init__.py**
9. **schemas/user.py** - UserRegister, UserLogin, UserResponse
10. **schemas/class_schema.py** - ClassCreate, ClassResponse
11. **schemas/material.py** - MaterialCreate, MaterialResponse
12. **schemas/grade.py** - GradeCreate, GradeResponse
13. **schemas/message.py** - MessageCreate, MessageResponse

### Utils:
14. **utils/__init__.py**
15. **utils/security.py** - hash_password, verify_password, create_access_token, verify_token
16. **utils/exceptions.py** - Exceções customizadas (use exemplo completo acima)
17. **utils/file_storage.py** - save_upload_file, validate_file (use exemplo completo acima)

### Middleware:
18. **middleware/__init__.py**
19. **middleware/auth_middleware.py** - get_current_user (dependency)

### Services:
20. **services/__init__.py**
21. **services/student_service.py** - StudentService completo (use exemplo acima)
22. **services/teacher_service.py** - TeacherService completo (use exemplo acima)

### Routes:
23. **routes/__init__.py**
24. **routes/auth.py** - Registro e login (use exemplo acima)
25. **routes/student.py** - Todas as rotas do aluno
26. **routes/teacher.py** - Todas as rotas do professor

---

## 🎯 INSTRUÇÕES FINAIS CRÍTICAS PARA O CHATGPT

### ⚠️ IMPORTANTE - LEIA ANTES DE GERAR O CÓDIGO:

**1. NÃO FAÇA PERGUNTAS - TOME DECISÕES AUTOMATICAMENTE:**

Se houver dúvidas, use estas respostas padrão:
- **Banco de dados?** → PostgreSQL com SQLAlchemy
- **Storage de arquivos?** → Local (salvar em `uploads/materials/`)
- **Formato de UUID?** → Use `uuid.uuid4()` do Python
- **Timezone?** → UTC (`datetime.utcnow()`)
- **Logs?** → Use `print()` simples (não precisa biblioteca)
- **Validação de email?** → Use Pydantic `EmailStr`
- **Tamanho máximo de arquivo?** → 10MB
- **Formatos permitidos?** → `.pdf, .doc, .docx, .ppt, .pptx, .txt, .xlsx, .xls`

**2. CÓDIGO COMPLETO E FUNCIONAL:**

- ❌ **NÃO escreva**: `# TODO: implementar função`, `# Adicionar aqui`, `pass # implementar`
- ✅ **ESCREVA**: Código funcional completo que pode ser executado imediatamente
- ✅ **IMPLEMENTE**: Todas as funções, todos os endpoints, todas as validações

**3. ESTRUTURA OBRIGATÓRIA:**

Gere EXATAMENTE estes 26 arquivos na ordem:

```
backend-python/
├── main.py ✅
├── config.py ✅
├── requirements.txt ✅
├── .env.example ✅
├── README.md ✅
├── database/
│   ├── __init__.py ✅
│   ├── connection.py ✅
│   └── models.py ✅
├── schemas/
│   ├── __init__.py ✅
│   ├── user.py ✅
│   ├── class_schema.py ✅
│   ├── material.py ✅
│   ├── grade.py ✅
│   └── message.py ✅
├── utils/
│   ├── __init__.py ✅
│   ├── security.py ✅
│   ├── exceptions.py ✅
│   └── file_storage.py ✅
├── middleware/
│   ├── __init__.py ✅
│   └── auth_middleware.py ✅
├── services/
│   ├── __init__.py ✅
│   ├── student_service.py ✅
│   └── teacher_service.py ✅
└── routes/
    ├── __init__.py ✅
    ├── auth.py ✅
    ├── student.py ✅
    └── teacher.py ✅
```

**4. CONTEÚDO MÍNIMO DE CADA ARQUIVO:**

**config.py**:
```python
import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "sua-chave-secreta-super-segura")
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 1440))
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost/lumina")
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
```

**middleware/auth_middleware.py**:
```python
from fastapi import Header, Depends
from sqlalchemy.orm import Session
from utils.security import verify_token
from database.connection import get_db
from database.models import User
from utils.exceptions import UnauthorizedException
import uuid

async def get_current_user(
    authorization: str = Header(None),
    db: Session = Depends(get_db)
) -> User:
    """Dependency para obter usuário autenticado"""
    if not authorization:
        raise UnauthorizedException("Token não fornecido")
    
    # Extrair token
    token = authorization.replace("Bearer ", "")
    
    # Verificar token e obter user_id
    payload = verify_token(token)
    user_id = payload.get("user_id")
    
    # Buscar usuário
    user = db.query(User).filter(User.id == uuid.UUID(user_id)).first()
    if not user:
        raise UnauthorizedException("Usuário não encontrado")
    
    return user
```

**utils/security.py** (COMPLETO):
```python
from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta
from utils.exceptions import UnauthorizedException
import config

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """Hash de senha com bcrypt"""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verificar senha"""
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict) -> str:
    """Criar token JWT"""
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=config.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, config.SECRET_KEY, algorithm=config.JWT_ALGORITHM)

def verify_token(token: str) -> dict:
    """Verificar e decodificar token JWT"""
    try:
        payload = jwt.decode(token, config.SECRET_KEY, algorithms=[config.JWT_ALGORITHM])
        return payload
    except JWTError:
        raise UnauthorizedException("Token inválido ou expirado")
```

**5. ROUTES - IMPLEMENTE TODAS:**

**routes/student.py** - DEVE TER:
- GET `/subjects` - Lista matérias com notas
- GET `/materials` - Lista materiais (com query param opcional class_id)
- GET `/messages` - Lista mensagens recebidas

**routes/teacher.py** - DEVE TER:
- GET `/classes` - Lista turmas do professor
- POST `/classes` - Criar nova turma
- GET `/students?class_id=uuid` - Lista alunos de uma turma
- POST `/students` - Adicionar aluno à turma
- POST `/materials` - Upload de material (multipart/form-data)
- POST `/grades` - Lançar nota
- POST `/messages` - Enviar mensagem para turma

**6. SCHEMAS COMPLETOS:**

Cada schema deve ter validators. Exemplo:

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
```

**7. README.md DO BACKEND:**

Adicione instruções de instalação, execução e teste:

```markdown
# 🚀 LUMINA Backend API

## Instalação

1. Instalar dependências:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

2. Configurar .env:
\`\`\`bash
cp .env.example .env
# Edite o .env com suas configurações
\`\`\`

3. Executar:
\`\`\`bash
python main.py
\`\`\`

API disponível em: http://localhost:8000
Documentação: http://localhost:8000/docs

## Testar

\`\`\`bash
# Cadastrar usuário
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@email.com","password":"123456","user_type":"student"}'

# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@email.com","password":"123456"}'
\`\`\`
```

---

## ✅ CHECKLIST ANTES DE ENTREGAR:

Antes de retornar o código, verifique:

- [ ] Todos os 26 arquivos foram gerados
- [ ] Nenhum arquivo tem `# TODO` ou `pass # implementar`
- [ ] Todos os endpoints da API estão implementados
- [ ] Validações Pydantic estão completas
- [ ] Hash de senha usa bcrypt
- [ ] JWT está configurado corretamente
- [ ] Middleware de autenticação funciona
- [ ] Services têm toda a lógica de negócio
- [ ] Upload de arquivos está implementado
- [ ] Tratamento de erros está completo
- [ ] README.md tem instruções claras
- [ ] .env.example tem todas as variáveis necessárias

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

## 🚀 COMANDO FINAL PARA O CHATGPT:

**Por favor, gere AGORA todos os 26 arquivos do backend Python/FastAPI completo e funcional, seguindo EXATAMENTE todas as especificações acima. NÃO faça perguntas, NÃO deixe TODOs, implemente tudo de forma completa e funcional. Retorne o código de cada arquivo separadamente com o caminho completo.**

**COMECE GERANDO OS ARQUIVOS AGORA!**
