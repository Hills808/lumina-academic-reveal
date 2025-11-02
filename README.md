# 🎓 LUMINA - Plataforma Educacional

Sistema completo de gestão educacional com dashboard para alunos e professores.

![Stack](https://img.shields.io/badge/React-18.3-blue)
![Stack](https://img.shields.io/badge/Python-3.11-green)
![Stack](https://img.shields.io/badge/FastAPI-0.109-teal)
![Stack](https://img.shields.io/badge/TypeScript-5.5-blue)

---

## ⚡ Quick Start

### Pré-requisitos
- Node.js 18+
- Python 3.11+
- npm/yarn
- pip

### 🚀 Rodando no GitHub Codespace

**1. Configure o Backend:**
```bash
cd backend-python
cp .env.example .env
pip install -r requirements.txt
```

**2. Inicie o Backend (Terminal 1):**
```bash
cd backend-python
python main.py
```
O backend estará rodando em: `http://localhost:8000`

**3. Inicie o Frontend (Terminal 2):**
```bash
npm install
npm run dev
```
O frontend detectará automaticamente a URL do Codespace!

**4. Acessar:**
- O Codespace abrirá automaticamente o frontend
- API Docs: Troque a porta 5173 por 8000 na URL e adicione `/docs`

### 💻 Rodando Localmente

**1. Backend (Terminal 1):**
```bash
cd backend-python
cp .env.example .env
pip install -r requirements.txt
python main.py
```

**2. Frontend (Terminal 2):**
```bash
npm install
npm run dev
```

**3. Acessar:**
```
Frontend: http://localhost:5173
Backend API: http://localhost:8000
Docs API: http://localhost:8000/docs
```

---

## 🏗️ Arquitetura

### Frontend
- **React 18** com TypeScript
- **Vite** para build
- **TailwindCSS** para estilização
- **Shadcn/ui** para componentes
- **React Router** para navegação
- **Tanstack Query** para cache de dados

### Backend
- **FastAPI** framework Python
- **SQLAlchemy** ORM
- **JWT** para autenticação
- **Pydantic** para validação
- **SQLite/PostgreSQL** banco de dados
- **Bcrypt** para senhas

---

## 📱 Funcionalidades

### 👨‍🎓 Dashboard Aluno
- ✅ Ver matérias inscritas
- ✅ Acessar materiais didáticos
- ✅ Receber mensagens do professor
- ✅ Visualizar notas e feedback

### 👨‍🏫 Dashboard Professor
- ✅ Gerenciar turmas
- ✅ Upload de materiais (PDF, vídeos, etc)
- ✅ Lançar notas dos alunos
- ✅ Enviar mensagens personalizadas
- ✅ Visualizar lista de alunos

### 🔐 Sistema de Autenticação
- ✅ Cadastro de usuários
- ✅ Login com email/senha
- ✅ Autenticação JWT
- ✅ Proteção de rotas
- ✅ Diferentes permissões (aluno/professor)

---

## 📁 Estrutura do Projeto

```
lumina/
├── 📱 Frontend (React)
│   ├── src/
│   │   ├── components/ui/    # Componentes Shadcn
│   │   ├── pages/           # Páginas da aplicação
│   │   ├── services/        # Conexão com API
│   │   ├── hooks/           # React Hooks
│   │   └── lib/             # Utilitários
│   ├── .env                 # Config frontend
│   └── package.json
│
└── 🐍 Backend (Python)
    └── backend-python/
        ├── main.py          # App FastAPI
        ├── config.py        # Configurações
        ├── database/        # Modelos e conexão
        ├── routes/          # Endpoints API
        ├── schemas/         # Validação
        ├── middleware/      # Auth JWT
        ├── utils/           # Funções auxiliares
        ├── .env            # Config backend
        └── requirements.txt
```

---

## 🔧 Configuração

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000/api
```

### Backend (.env)
```env
SECRET_KEY=sua-chave-secreta-32-chars
DATABASE_URL=sqlite:///./lumina.db
CORS_ORIGINS=http://localhost:5173
```

---

## 📊 Banco de Dados

### Modelos principais:

**Users**
- Alunos e Professores
- Autenticação JWT
- Senhas hasheadas (bcrypt)

**Classes (Turmas)**
- Gerenciadas por professores
- Alunos inscritos

**Materials (Materiais)**
- Upload de arquivos
- Associados a turmas

**Grades (Notas)**
- Lançadas por professores
- Com feedback opcional

**Messages (Mensagens)**
- Professor → Aluno
- Por turma

---

## 🚀 Deploy

### Frontend (Lovable/Vercel)
- Build automático
- Deploy em 1 clique

### Backend (Railway/Render)
```bash
# Railway detecta automaticamente
# Ou configure:
Build: pip install -r requirements.txt
Start: python main.py
```

### Variáveis de Ambiente
Configure no painel do provedor de deploy

---

## 📚 Testar a API

Após iniciar o backend, acesse a documentação interativa:
- **Swagger UI**: `http://localhost:8000/docs`
- **Health Check**: `http://localhost:8000/health`

---

## 🛠️ Stack Tecnológico

### Frontend
- React 18.3
- TypeScript 5.5
- Vite 5.4
- TailwindCSS 3.4
- Shadcn/ui
- React Router 6
- Tanstack Query 5

### Backend
- Python 3.11+
- FastAPI 0.109
- SQLAlchemy 2.0
- Pydantic 2.5
- JWT Auth
- Bcrypt

---

## 📞 Suporte

Para mais informações:
- 📚 Acesse a documentação da API: http://localhost:8000/docs
- 🐛 Verifique logs no console
- 💬 Consulte este README para instruções

---

## 🎉 Features

- [x] Sistema de autenticação completo
- [x] Dashboard aluno e professor
- [x] Upload de materiais
- [x] Sistema de notas
- [x] Mensagens professor-aluno
- [x] Banco de dados relacional
- [x] API RESTful documentada
- [x] Validação de dados
- [x] Segurança (JWT + bcrypt)
- [x] CORS configurável
- [x] Deploy ready

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.

---

**Desenvolvido com ❤️ usando React + Python**
