# 🚀 LUMINA Backend - Python FastAPI

Backend completo para plataforma educacional LUMINA.

## 📦 Instalação

### 1. Criar ambiente virtual (recomendado)
```bash
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

### 2. Instalar dependências
```bash
pip install -r requirements.txt
```

### 3. Configurar variáveis de ambiente
```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar .env e adicionar suas configurações
```

### 4. Executar servidor
```bash
python main.py
```

O servidor estará rodando em: `http://localhost:8000`

## 📚 Documentação

- **API Docs (Swagger)**: http://localhost:8000/docs
- **API Docs (ReDoc)**: http://localhost:8000/redoc

## 🗂️ Estrutura do Projeto

```
backend-python/
├── main.py                 # Arquivo principal FastAPI
├── config.py              # Configurações
├── requirements.txt       # Dependências
├── .env.example          # Exemplo de variáveis de ambiente
├── database/
│   ├── connection.py     # Conexão SQLAlchemy
│   └── models.py         # Modelos do banco
├── schemas/
│   ├── user.py          # Schemas de usuário
│   ├── class_schema.py  # Schemas de turma
│   ├── material.py      # Schemas de material
│   ├── grade.py         # Schemas de nota
│   └── message.py       # Schemas de mensagem
├── routes/
│   ├── auth.py          # Rotas de autenticação
│   ├── student.py       # Rotas de aluno
│   └── teacher.py       # Rotas de professor
├── middleware/
│   └── auth.py          # Middleware de autenticação
└── utils/
    └── security.py      # Funções de segurança
```

## 🔐 Autenticação

O sistema usa JWT (JSON Web Tokens) para autenticação.

**Headers necessários nas rotas protegidas:**
```
Authorization: Bearer {seu_token_jwt}
```

## 🧪 Testar API

### Cadastro
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@email.com",
    "password": "123456",
    "user_type": "student"
  }'
```

### Login
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@email.com",
    "password": "123456"
  }'
```

## 🗄️ Banco de Dados

Por padrão usa SQLite (`lumina.db`). Para mudar:

### PostgreSQL
```env
DATABASE_URL=postgresql://user:password@localhost/lumina
```

### MySQL
```env
DATABASE_URL=mysql://user:password@localhost/lumina
```

## 🚀 Deploy

### Railway
1. Conecte seu repositório GitHub
2. Configure as variáveis de ambiente
3. Railway detecta automaticamente Python e FastAPI

### Render
1. Conecte repositório
2. Build Command: `pip install -r requirements.txt`
3. Start Command: `python main.py`

### PythonAnywhere
1. Upload dos arquivos
2. Configure WSGI para FastAPI
3. Instale dependências via console

## ⚙️ Variáveis de Ambiente Importantes

- `SECRET_KEY`: Chave secreta para JWT (mínimo 32 caracteres)
- `DATABASE_URL`: URL de conexão com banco de dados
- `CORS_ORIGINS`: URLs permitidas para CORS
- `UPLOAD_DIR`: Diretório para upload de arquivos

## 📝 API Endpoints

### Autenticação
- `POST /api/auth/register` - Cadastrar usuário
- `POST /api/auth/login` - Fazer login

### Aluno (requer autenticação)
- `GET /api/student/subjects` - Listar matérias
- `GET /api/student/materials` - Listar materiais
- `GET /api/student/messages` - Listar mensagens

### Professor (requer autenticação)
- `GET /api/teacher/classes` - Listar turmas
- `GET /api/teacher/students?class_id={id}` - Listar alunos
- `POST /api/teacher/materials` - Upload de material
- `POST /api/teacher/grades` - Criar nota
- `POST /api/teacher/messages` - Enviar mensagem

## 🔒 Segurança

- Senhas hasheadas com bcrypt
- Autenticação JWT
- Validação de dados com Pydantic
- CORS configurável
- Proteção contra SQL Injection (SQLAlchemy)

## 📞 Suporte

Para dúvidas ou problemas, consulte a documentação completa em `/docs`.
