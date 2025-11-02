# 🚀 Guia Completo de Setup - LUMINA

## 📋 Pré-requisitos

- **Node.js** 18+ (para o frontend)
- **Python** 3.11+ (para o backend)
- **npm** ou **yarn** (gerenciador de pacotes)
- **pip** (gerenciador de pacotes Python)

---

## ⚡ Quick Start (3 passos)

### 1️⃣ Backend (Terminal 1)
```bash
cd backend-python
pip install -r requirements.txt
python main.py
```
✅ Backend rodando em: http://localhost:8000  
📚 Documentação API: http://localhost:8000/docs

### 2️⃣ Frontend (Terminal 2)
```bash
npm install
npm run dev
```
✅ Frontend rodando em: http://localhost:5173

### 3️⃣ Acessar
Abra o navegador em: http://localhost:5173

---

## 📁 Estrutura do Projeto

```
lumina/
│
├── 📱 FRONTEND (React + Vite + TypeScript)
│   ├── src/
│   │   ├── components/        # Componentes UI
│   │   ├── pages/            # Páginas da aplicação
│   │   │   ├── Index.tsx     # Home
│   │   │   ├── Login.tsx     # Login
│   │   │   ├── Cadastro.tsx  # Cadastro
│   │   │   ├── Aluno.tsx     # Dashboard Aluno
│   │   │   └── Professor.tsx # Dashboard Professor
│   │   ├── services/         # API Services
│   │   │   └── api.ts        # Conexão com backend
│   │   └── hooks/            # React Hooks
│   ├── .env                  # Variáveis de ambiente
│   └── package.json
│
└── 🐍 BACKEND (Python + FastAPI)
    ├── backend-python/
    │   ├── main.py           # Aplicação principal
    │   ├── config.py         # Configurações
    │   ├── requirements.txt  # Dependências Python
    │   ├── .env             # Variáveis de ambiente
    │   ├── database/
    │   │   ├── connection.py # Conexão SQLAlchemy
    │   │   └── models.py     # Modelos do banco
    │   ├── schemas/          # Validação Pydantic
    │   ├── routes/           # Endpoints API
    │   │   ├── auth.py       # Autenticação
    │   │   ├── student.py    # Rotas Aluno
    │   │   └── teacher.py    # Rotas Professor
    │   ├── middleware/       # Autenticação JWT
    │   ├── utils/            # Funções auxiliares
    │   └── uploads/          # Arquivos enviados
```

---

## 🔧 Configuração Detalhada

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000/api
```

### Backend (.env)
```env
SECRET_KEY=sua-chave-secreta-aqui-minimo-32-caracteres
DATABASE_URL=sqlite:///./lumina.db
CORS_ORIGINS=http://localhost:5173
```

---

## 🧪 Testando a Aplicação

### 1. Cadastrar Usuário
- Acesse: http://localhost:5173
- Clique em "Cadastrar"
- Preencha os dados
- Escolha tipo: Aluno ou Professor

### 2. Fazer Login
- Use email e senha cadastrados
- Será redirecionado para o dashboard

### 3. Dashboards

**👨‍🎓 Dashboard Aluno:**
- Ver matérias inscritas
- Acessar materiais
- Ler mensagens do professor

**👨‍🏫 Dashboard Professor:**
- Gerenciar turmas
- Upload de materiais
- Lançar notas
- Enviar mensagens

---

## 📊 Banco de Dados

### SQLite (Padrão)
- Arquivo: `lumina.db`
- Criado automaticamente ao rodar o backend
- Perfeito para desenvolvimento

### PostgreSQL (Produção)
```env
DATABASE_URL=postgresql://user:password@localhost/lumina
```

### Tabelas criadas automaticamente:
- `users` - Usuários (alunos e professores)
- `classes` - Turmas
- `class_students` - Relação aluno-turma
- `materials` - Materiais didáticos
- `grades` - Notas
- `messages` - Mensagens

---

## 🔐 Autenticação

Sistema usa **JWT (JSON Web Tokens)**

Fluxo:
1. Usuário faz login
2. Backend gera token JWT
3. Frontend armazena no localStorage
4. Token é enviado em todas requisições protegidas

Header de autenticação:
```
Authorization: Bearer {token_jwt}
```

---

## 📡 Endpoints da API

### Autenticação (Público)
```
POST /api/auth/register  # Cadastrar
POST /api/auth/login     # Login
```

### Aluno (Requer autenticação)
```
GET /api/student/subjects   # Listar matérias
GET /api/student/materials  # Listar materiais
GET /api/student/messages   # Listar mensagens
```

### Professor (Requer autenticação)
```
GET  /api/teacher/classes              # Listar turmas
GET  /api/teacher/students?class_id={} # Listar alunos
POST /api/teacher/materials            # Upload material
POST /api/teacher/grades               # Lançar nota
POST /api/teacher/messages             # Enviar mensagem
```

---

## 🚀 Deploy

### Frontend (Lovable)
1. Já está no Lovable
2. Clique em "Publish"
3. Configure domínio personalizado

### Backend (Railway)
1. Criar conta no Railway
2. Conectar repositório GitHub
3. Railway detecta Python automaticamente
4. Configurar variáveis de ambiente
5. Deploy automático

### Backend (Render)
1. Conectar repositório
2. Build: `pip install -r requirements.txt`
3. Start: `python main.py`
4. Configurar variáveis de ambiente

---

## ⚠️ Troubleshooting

### Backend não inicia
```bash
# Verificar Python
python --version

# Reinstalar dependências
pip install -r requirements.txt --force-reinstall
```

### Frontend não conecta ao backend
- Verificar se backend está rodando
- Confirmar URL no arquivo `.env`
- Verificar console do navegador (F12)

### Erro de CORS
- Adicionar URL do frontend no backend `.env`:
```env
CORS_ORIGINS=http://localhost:5173,sua-url-frontend
```

### Erro de autenticação
- Limpar localStorage do navegador
- Fazer logout e login novamente

---

## 📞 Comandos Úteis

### Backend
```bash
# Iniciar servidor
python main.py

# Criar ambiente virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Ver logs
# Os logs aparecem no terminal
```

### Frontend
```bash
# Instalar dependências
npm install

# Iniciar desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview build
npm run preview
```

---

## ✅ Checklist Final

- [ ] Backend rodando em http://localhost:8000
- [ ] Frontend rodando em http://localhost:5173
- [ ] Consegue acessar http://localhost:8000/docs
- [ ] Consegue cadastrar usuário
- [ ] Consegue fazer login
- [ ] Dashboard do aluno funciona
- [ ] Dashboard do professor funciona
- [ ] Banco de dados criado (lumina.db)

---

## 🎉 Pronto!

Seu sistema LUMINA está 100% funcional!

**Frontend React** + **Backend Python** + **Banco de Dados** + **Autenticação JWT**

Para dúvidas, consulte:
- Documentação API: http://localhost:8000/docs
- README do Backend: `backend-python/README.md`
