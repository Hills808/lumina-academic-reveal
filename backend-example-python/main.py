# 🐍 EXEMPLO DE BACKEND PYTHON - LUMINA
# Framework: FastAPI (recomendado) ou Flask

from fastapi import FastAPI, HTTPException, Depends, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, validator
from typing import Optional, List
import jwt
from datetime import datetime, timedelta
import bcrypt

app = FastAPI(title="LUMINA API")

# Configurar CORS para aceitar requisições do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://seuapp.lovable.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===== CONFIGURAÇÕES =====
SECRET_KEY = "sua-chave-secreta-aqui"  # Use variável de ambiente em produção
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# ===== MODELOS DE DADOS =====

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    user_type: str  # "student" ou "teacher"
    
    @validator('name')
    def name_length(cls, v):
        if len(v) < 3 or len(v) > 100:
            raise ValueError('Nome deve ter entre 3 e 100 caracteres')
        return v
    
    @validator('password')
    def password_length(cls, v):
        if len(v) < 6:
            raise ValueError('Senha deve ter no mínimo 6 caracteres')
        return v

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class GradeCreate(BaseModel):
    class_id: int
    student_id: int
    subject: str
    grade: float
    
    @validator('grade')
    def grade_range(cls, v):
        if v < 0 or v > 10:
            raise ValueError('Nota deve estar entre 0 e 10')
        return v

class MessageCreate(BaseModel):
    class_id: int
    subject: str
    message: str
    
    @validator('message')
    def message_length(cls, v):
        if len(v) > 1000:
            raise ValueError('Mensagem deve ter no máximo 1000 caracteres')
        return v

# ===== FUNÇÕES AUXILIARES =====

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

# ===== ROTAS DE AUTENTICAÇÃO =====

@app.post("/api/auth/register")
async def register(user: UserRegister):
    """Cadastrar novo usuário"""
    try:
        # TODO: Verificar se email já existe no banco
        # TODO: Salvar usuário no banco de dados
        
        hashed_pwd = hash_password(user.password)
        
        # Exemplo de resposta
        return {
            "success": True,
            "message": "Usuário cadastrado com sucesso",
            "user": {
                "id": 1,  # ID do banco
                "name": user.name,
                "email": user.email,
                "user_type": user.user_type
            }
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/auth/login")
async def login(user: UserLogin):
    """Fazer login"""
    try:
        # TODO: Buscar usuário no banco pelo email
        # TODO: Verificar senha com verify_password()
        
        # Exemplo: usuário encontrado
        user_data = {
            "id": 1,
            "name": "João Silva",
            "email": user.email,
            "user_type": "student"
        }
        
        token = create_access_token({"sub": user.email, "user_id": 1})
        
        return {
            "success": True,
            "token": token,
            "user": user_data
        }
    except Exception as e:
        raise HTTPException(status_code=401, detail="Email ou senha inválidos")

# ===== ROTAS DO ALUNO =====

@app.get("/api/student/subjects")
async def get_student_subjects():
    """Buscar matérias do aluno"""
    # TODO: Verificar token JWT
    # TODO: Buscar matérias do banco pelo user_id
    
    return {
        "success": True,
        "subjects": [
            {"id": 1, "name": "Matemática", "teacher": "Prof. Carlos", "grade": 8.5},
            {"id": 2, "name": "Português", "teacher": "Prof. Ana", "grade": 9.0}
        ]
    }

@app.get("/api/student/materials")
async def get_student_materials():
    """Buscar materiais de aula"""
    # TODO: Verificar token JWT
    # TODO: Buscar materiais do banco
    
    return {
        "success": True,
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

@app.get("/api/student/messages")
async def get_student_messages():
    """Buscar mensagens do professor"""
    # TODO: Verificar token JWT
    # TODO: Buscar mensagens do banco
    
    return {
        "success": True,
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

# ===== ROTAS DO PROFESSOR =====

@app.get("/api/teacher/classes")
async def get_teacher_classes():
    """Buscar turmas do professor"""
    # TODO: Verificar token JWT
    # TODO: Buscar turmas do banco
    
    return {
        "success": True,
        "classes": [
            {"id": 1, "name": "Matemática - 3º Ano A", "students_count": 30}
        ]
    }

@app.get("/api/teacher/students")
async def get_teacher_students(class_id: int):
    """Buscar alunos de uma turma"""
    # TODO: Verificar token JWT
    # TODO: Buscar alunos do banco
    
    return {
        "success": True,
        "students": [
            {"id": 1, "name": "João Silva", "email": "joao@email.com"}
        ]
    }

@app.post("/api/teacher/materials")
async def upload_material(
    class_id: int,
    title: str,
    file: UploadFile = File(...)
):
    """Upload de material"""
    # TODO: Verificar token JWT
    # TODO: Salvar arquivo (S3, local, etc)
    # TODO: Salvar referência no banco
    
    return {
        "success": True,
        "message": "Material enviado com sucesso",
        "material": {
            "id": 1,
            "title": title,
            "file_url": "https://..."
        }
    }

@app.post("/api/teacher/grades")
async def create_grade(grade: GradeCreate):
    """Lançar notas"""
    # TODO: Verificar token JWT
    # TODO: Salvar nota no banco
    
    return {
        "success": True,
        "message": "Nota lançada com sucesso"
    }

@app.post("/api/teacher/messages")
async def send_message(message: MessageCreate):
    """Enviar mensagem"""
    # TODO: Verificar token JWT
    # TODO: Salvar mensagem no banco
    
    return {
        "success": True,
        "message": "Mensagem enviada com sucesso"
    }

# ===== INICIAR SERVIDOR =====
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
