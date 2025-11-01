# ✅ Checklist Completo - Backend Python

Use este checklist para garantir que o backend foi implementado corretamente.

---

## 📦 ESTRUTURA DO PROJETO

```
backend-python/
├── main.py                  ✅ Arquivo principal FastAPI
├── config.py                ✅ Configurações e variáveis de ambiente
├── requirements.txt         ✅ Dependências
├── .env.example            ✅ Exemplo de variáveis
├── .env                    ✅ Variáveis reais (não commitar!)
├── .dockerignore           ✅ Arquivos ignorados pelo Docker
├── Dockerfile              ✅ Imagem Docker
├── docker-compose.yml      ✅ Orquestração de containers
├── README.md               ✅ Documentação de setup
│
├── database/
│   ├── __init__.py         ✅
│   ├── connection.py       ✅ Configuração do banco
│   └── models.py           ✅ Modelos SQLAlchemy
│
├── schemas/
│   ├── __init__.py         ✅
│   ├── user.py             ✅ Schemas Pydantic
│   ├── subject.py          ✅
│   ├── material.py         ✅
│   └── message.py          ✅
│
├── routes/
│   ├── __init__.py         ✅
│   ├── auth.py             ✅ Rotas de autenticação
│   ├── student.py          ✅ Rotas do aluno
│   └── teacher.py          ✅ Rotas do professor
│
├── services/
│   ├── __init__.py         ✅
│   ├── auth_service.py     ✅ Lógica de autenticação
│   └── storage_service.py  ✅ Upload de arquivos
│
├── middleware/
│   ├── __init__.py         ✅
│   └── auth_middleware.py  ✅ Verificação de JWT
│
└── tests/
    ├── __init__.py         ✅
    ├── conftest.py         ✅ Fixtures
    ├── test_auth.py        ✅ Testes de autenticação
    ├── test_student.py     ✅ Testes das rotas do aluno
    └── test_teacher.py     ✅ Testes das rotas do professor
```

---

## 🔐 SEGURANÇA

### Autenticação
- [ ] Senhas são hasheadas com bcrypt (nunca salvam texto plano)
- [ ] JWT token usa SECRET_KEY forte
- [ ] Token expira em 24h ou menos
- [ ] Middleware valida token em todas as rotas protegidas
- [ ] Erros de autenticação não expõem informações sensíveis
- [ ] Rate limiting implementado no login

### Validação de Dados
- [ ] Todos os inputs são validados com Pydantic
- [ ] Validação de tamanho de strings
- [ ] Validação de formato de email
- [ ] Validação de range de notas (0-10)
- [ ] Validação de tipos de arquivo no upload
- [ ] Sanitização de inputs para prevenir SQL injection

### CORS
- [ ] CORS configurado para permitir apenas origens específicas
- [ ] Não usa wildcard (*) em produção
- [ ] Headers permitidos estão corretos

### Variáveis de Ambiente
- [ ] SECRET_KEY não está hardcoded
- [ ] DATABASE_URL não está no código
- [ ] .env está no .gitignore
- [ ] .env.example documenta todas as variáveis necessárias

---

## 📊 BANCO DE DADOS

### Modelos
- [ ] Modelo `User` (id, name, email, password_hash, user_type)
- [ ] Modelo `Subject` (id, name, teacher_id)
- [ ] Modelo `Enrollment` (id, student_id, subject_id, grade)
- [ ] Modelo `Material` (id, subject_id, title, file_url)
- [ ] Modelo `Message` (id, subject_id, from_user_id, content)

### Relacionamentos
- [ ] Foreign keys configuradas
- [ ] Cascading deletes onde apropriado
- [ ] Indexes em campos frequentemente consultados

### Migrations
- [ ] Sistema de migrations configurado (Alembic)
- [ ] Migration inicial criada
- [ ] Comandos de migration documentados

---

## 🛣️ ROTAS DA API

### Autenticação (/api/auth)
- [ ] POST /register - Cadastro de usuário
  - [ ] Valida email único
  - [ ] Hash de senha
  - [ ] Retorna usuário (sem senha)
- [ ] POST /login - Login
  - [ ] Valida credenciais
  - [ ] Retorna token JWT + usuário
- [ ] GET /me - Dados do usuário logado
  - [ ] Rota protegida
  - [ ] Retorna dados do token

### Aluno (/api/student)
- [ ] GET /subjects - Matérias do aluno
  - [ ] Rota protegida
  - [ ] Retorna apenas matérias onde está matriculado
  - [ ] Inclui nota
- [ ] GET /materials - Materiais de aula
  - [ ] Rota protegida
  - [ ] Filtra por matérias do aluno
  - [ ] Ordenado por data
- [ ] GET /messages - Mensagens dos professores
  - [ ] Rota protegida
  - [ ] Filtra por matérias do aluno
  - [ ] Ordenado por data

### Professor (/api/teacher)
- [ ] GET /classes - Turmas do professor
  - [ ] Rota protegida
  - [ ] Apenas turmas onde é professor
  - [ ] Inclui contagem de alunos
- [ ] GET /students - Alunos de uma turma
  - [ ] Rota protegida
  - [ ] Valida se turma pertence ao professor
  - [ ] Query parameter: class_id
- [ ] POST /materials - Upload de material
  - [ ] Rota protegida
  - [ ] Valida tipo de arquivo
  - [ ] Valida tamanho (10MB max)
  - [ ] Salva arquivo
  - [ ] Retorna URL
- [ ] POST /grades - Lançar nota
  - [ ] Rota protegida
  - [ ] Valida range (0-10)
  - [ ] Valida se aluno está na turma
- [ ] POST /messages - Enviar mensagem
  - [ ] Rota protegida
  - [ ] Valida tamanho da mensagem
  - [ ] Envia para todos alunos da turma

---

## 🧪 TESTES

### Cobertura Mínima
- [ ] Testes de autenticação (register, login)
- [ ] Testes de autorização (token inválido)
- [ ] Testes de rotas do aluno
- [ ] Testes de rotas do professor
- [ ] Testes de validação de dados
- [ ] Testes de casos de erro (404, 401, 400)

### Qualidade dos Testes
- [ ] Usa fixtures para setup
- [ ] Testes são independentes
- [ ] Coverage > 70%
- [ ] Todos os testes passam: `pytest`

---

## 📝 DOCUMENTAÇÃO

- [ ] README.md com instruções de setup
- [ ] API_DOCUMENTATION.md atualizado
- [ ] Comentários em código complexo
- [ ] Docstrings em funções principais
- [ ] .env.example com todas as variáveis

---

## 🚀 DEPLOY

### Preparação
- [ ] Dockerfile funciona corretamente
- [ ] docker-compose.yml está completo
- [ ] Variáveis de ambiente documentadas
- [ ] Health check endpoint (/health ou /api/health)
- [ ] Logging configurado

### Plataforma (Railway/Render)
- [ ] Repositório conectado
- [ ] Variáveis de ambiente configuradas
- [ ] Banco de dados provisionado
- [ ] Build bem-sucedido
- [ ] Deploy bem-sucedido
- [ ] URL pública funcionando

### Verificação Pós-Deploy
- [ ] Testar POST /api/auth/register
- [ ] Testar POST /api/auth/login
- [ ] Testar rotas protegidas com token
- [ ] Verificar logs de erro
- [ ] Verificar CORS com frontend

---

## 🔄 INTEGRAÇÃO COM FRONTEND

- [ ] CORS permite origem do frontend
- [ ] Frontend tem URL correta (VITE_API_URL)
- [ ] Testar fluxo completo:
  - [ ] Cadastro → Login → Dashboard Aluno
  - [ ] Cadastro → Login → Dashboard Professor
  - [ ] Upload de material
  - [ ] Lançamento de notas
  - [ ] Envio de mensagens

---

## 🐛 TROUBLESHOOTING

### Se algo não funcionar:

1. **Erro de CORS**
   - [ ] Verificar CORS_ORIGINS no backend
   - [ ] Verificar se frontend está usando URL correta

2. **Erro 401 Unauthorized**
   - [ ] Token está sendo enviado no header?
   - [ ] Token é válido? (não expirou?)
   - [ ] SECRET_KEY é a mesma em todos os ambientes?

3. **Erro de Conexão com Banco**
   - [ ] DATABASE_URL está correta?
   - [ ] Banco de dados está rodando?
   - [ ] Migrations foram executadas?

4. **Erro de Upload**
   - [ ] Pasta de uploads existe?
   - [ ] Permissões de escrita?
   - [ ] Tamanho do arquivo < 10MB?
   - [ ] Tipo de arquivo permitido?

---

## 📊 MÉTRICAS DE QUALIDADE

### Performance
- [ ] Queries otimizadas (usar joins, não N+1)
- [ ] Índices no banco de dados
- [ ] Paginação implementada
- [ ] Cache onde apropriado

### Código
- [ ] Segue PEP 8
- [ ] Não há código comentado
- [ ] Não há TODOs pendentes
- [ ] Funções têm responsabilidade única
- [ ] Código é legível e bem organizado

### Logs
- [ ] Logs informativos (não verbose demais)
- [ ] Não loga dados sensíveis (senhas, tokens)
- [ ] Logs estruturados (JSON)
- [ ] Níveis de log apropriados (DEBUG, INFO, ERROR)

---

## ✅ APROVAÇÃO FINAL

Antes de considerar o backend completo, confirme:

- [ ] Todos os items acima estão ✅
- [ ] Frontend conecta com sucesso
- [ ] Todos os fluxos principais funcionam
- [ ] Testes passam
- [ ] Deploy está estável
- [ ] Documentação está completa
- [ ] Não há erros no console/logs

---

**Backend pronto para produção! 🎉**
