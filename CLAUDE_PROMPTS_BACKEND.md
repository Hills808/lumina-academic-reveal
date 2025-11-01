# 🤖 Guia de Prompts para Claude - Backend Python

## 📋 Estratégia de Desenvolvimento

### Fase 1: Estrutura Base
### Fase 2: Banco de Dados
### Fase 3: Autenticação
### Fase 4: Rotas de Negócio
### Fase 5: Testes e Deploy

---

## 🎯 FASE 1: ESTRUTURA BASE

### Prompt 1.1 - Setup Inicial
```
Preciso criar um backend em Python usando FastAPI para uma plataforma educacional chamada LUMINA. 

Requisitos:
- FastAPI com estrutura modular
- Configuração de CORS para aceitar requisições de http://localhost:5173 e https://meuapp.lovable.app
- Autenticação JWT
- Validação de dados com Pydantic
- Sistema de logging
- Tratamento de erros centralizado
- Variáveis de ambiente com python-decouple

Crie a estrutura de pastas e o arquivo main.py inicial com configuração básica.
```

### Prompt 1.2 - Configurações
```
Crie um sistema de configurações usando python-decouple que gerencie:
- SECRET_KEY para JWT
- DATABASE_URL
- CORS_ORIGINS (lista de URLs permitidas)
- Configurações de ambiente (development, production)
- Validação de variáveis obrigatórias

Arquivo: config.py
```

---

## 🗄️ FASE 2: BANCO DE DADOS

### Prompt 2.1 - Setup do Banco
```
Configure SQLAlchemy para trabalhar com PostgreSQL:

Preciso de:
- Configuração de conexão assíncrona
- Base model com campos padrão (id, created_at, updated_at)
- Session factory
- Health check do banco

Use a seguinte estrutura de tabelas:
1. users (id, name, email, password_hash, user_type, created_at)
2. subjects (id, name, teacher_id, created_at)
3. enrollments (id, student_id, subject_id, grade, created_at)
4. materials (id, subject_id, title, file_url, uploaded_at)
5. messages (id, subject_id, from_user_id, content, created_at)

Arquivo: database/connection.py e database/models.py
```

### Prompt 2.2 - Modelos Pydantic
```
Crie os schemas Pydantic para validação de dados baseados nas tabelas:

Para cada tabela, preciso de:
- Schema de criação (Create)
- Schema de resposta (Response)
- Schema de atualização (Update) quando aplicável
- Validações personalizadas (tamanho de strings, formato de email, range de notas)

Referência: Use os limites definidos em API_DOCUMENTATION.md

Arquivo: schemas/user.py, schemas/subject.py, etc.
```

---

## 🔐 FASE 3: AUTENTICAÇÃO

### Prompt 3.1 - Sistema de Autenticação
```
Implemente sistema completo de autenticação JWT:

Funcionalidades:
1. Hash de senhas com bcrypt
2. Geração de tokens JWT (access token com expiração de 24h)
3. Verificação de tokens
4. Middleware de autenticação
5. Função para extrair user_id do token
6. Proteção de rotas com dependency injection

Requisitos de segurança:
- Usar algoritmo HS256
- Validar força da senha (mínimo 6 caracteres)
- Rate limiting para login
- Não expor detalhes de erro (usar mensagens genéricas)

Arquivo: services/auth_service.py
```

### Prompt 3.2 - Rotas de Auth
```
Crie as rotas de autenticação:

POST /api/auth/register:
- Validar se email já existe
- Hash da senha
- Criar usuário no banco
- Retornar dados do usuário (sem senha)

POST /api/auth/login:
- Verificar email e senha
- Gerar JWT token
- Retornar token + dados do usuário

GET /api/auth/me:
- Rota protegida
- Retornar dados do usuário logado

Arquivo: routes/auth.py
```

---

## 📚 FASE 4: ROTAS DE NEGÓCIO

### Prompt 4.1 - Rotas do Aluno
```
Implemente as rotas do aluno baseadas na documentação API_DOCUMENTATION.md:

GET /api/student/subjects
- Buscar matérias onde o aluno está matriculado
- Incluir nome da matéria, professor e nota
- Rota protegida (verificar JWT)

GET /api/student/materials
- Buscar materiais das matérias do aluno
- Ordenar por data (mais recentes primeiro)
- Incluir URL de download

GET /api/student/messages
- Buscar mensagens enviadas pelos professores
- Filtrar apenas mensagens das matérias do aluno
- Ordenar por data (mais recentes primeiro)

Use joins otimizados e limite os resultados a 50 por página.

Arquivo: routes/student.py
```

### Prompt 4.2 - Rotas do Professor
```
Implemente as rotas do professor:

GET /api/teacher/classes
- Listar turmas (subjects) onde o professor leciona
- Incluir contagem de alunos

GET /api/teacher/students?class_id=X
- Listar alunos de uma turma específica
- Verificar se a turma pertence ao professor

POST /api/teacher/materials
- Upload de arquivo (PDF, DOC, PPT)
- Validar tamanho máximo (10MB)
- Salvar arquivo no sistema ou S3
- Salvar referência no banco

POST /api/teacher/grades
- Lançar nota para um aluno
- Validar range (0-10)
- Verificar se aluno está na turma

POST /api/teacher/messages
- Enviar mensagem para todos alunos de uma turma
- Validar tamanho da mensagem

Arquivo: routes/teacher.py
```

### Prompt 4.3 - Sistema de Upload
```
Crie um serviço de upload de arquivos:

Opções:
1. Local storage (para desenvolvimento)
2. S3-compatible storage (para produção)

Requisitos:
- Validar tipo de arquivo (PDF, DOC, DOCX, PPT, PPTX)
- Validar tamanho máximo (10MB)
- Gerar nome único para arquivo
- Retornar URL pública
- Permitir exclusão de arquivos

Arquivo: services/storage_service.py
```

---

## 🧪 FASE 5: TESTES E DEPLOY

### Prompt 5.1 - Testes
```
Crie testes automatizados usando pytest:

Testes necessários:
1. Autenticação (registro, login, token inválido)
2. Rotas do aluno (acesso autorizado e não autorizado)
3. Rotas do professor (upload, notas, mensagens)
4. Validações de dados
5. Casos de erro (404, 401, 400)

Use fixtures para:
- Cliente de teste
- Usuários de teste (aluno e professor)
- Dados mock

Arquivo: tests/test_auth.py, tests/test_student.py, tests/test_teacher.py
```

### Prompt 5.2 - Docker
```
Crie configuração Docker para o backend:

docker-compose.yml com:
- Serviço FastAPI (Python 3.11)
- PostgreSQL 15
- Variáveis de ambiente
- Volumes persistentes
- Health checks
- Restart policy

Dockerfile otimizado:
- Multi-stage build
- Cache de dependências
- Usuário não-root
- Tamanho mínimo

Arquivos: Dockerfile, docker-compose.yml, .dockerignore
```

---

## 💡 DICAS PARA USAR O CLAUDE

### ✅ Boas Práticas

1. **Seja Específico**: Sempre referencie os arquivos de documentação (API_DOCUMENTATION.md)
2. **Contexto Incremental**: Envie prompts na ordem das fases
3. **Peça Explicações**: "Explique o que cada parte faz"
4. **Revise Segurança**: Sempre peça para revisar aspectos de segurança
5. **Peça Comentários**: "Adicione comentários explicativos no código"

### 📝 Template de Prompt Eficiente

```
Contexto: [Descreva o que já foi feito]
Objetivo: [O que precisa ser implementado]
Requisitos: [Lista de requisitos específicos]
Referências: [Mencione arquivos de documentação]
Restrições: [Limitações ou considerações especiais]
```

### 🔄 Iteração com Claude

```
Primeira rodada: "Crie a estrutura básica"
Segunda rodada: "Adicione tratamento de erros"
Terceira rodada: "Adicione testes unitários"
Quarta rodada: "Otimize as queries do banco"
```

---

## 🎓 EXEMPLO COMPLETO DE CONVERSA

### Você:
```
Olá! Vou criar um backend Python para uma plataforma educacional. 
Tenho a documentação da API em API_DOCUMENTATION.md.

Vamos começar pela estrutura base:
[Cole o Prompt 1.1]
```

### Claude responde com código...

### Você:
```
Perfeito! Agora vamos configurar o banco de dados.
[Cole o Prompt 2.1]

Obs: Use async SQLAlchemy para performance.
```

### Claude responde...

### Você:
```
Ótimo! Antes de continuar, pode revisar a segurança do código de autenticação?
Especialmente:
- Há alguma vulnerabilidade SQL injection?
- O hash de senha está correto?
- Os tokens JWT estão seguros?
```

---

## 🚨 CHECKLIST FINAL

Ao terminar, peça ao Claude para revisar:

- [ ] Todas as rotas da API_DOCUMENTATION.md foram implementadas
- [ ] Validação de dados em todas as entradas
- [ ] Tratamento de erros em todas as rotas
- [ ] Proteção de rotas com JWT
- [ ] CORS configurado corretamente
- [ ] Variáveis sensíveis em .env
- [ ] Queries otimizadas (usar joins, não N+1)
- [ ] Logs adequados (sem expor dados sensíveis)
- [ ] Testes cobrindo casos principais
- [ ] Documentação atualizada
- [ ] Docker funcionando
- [ ] Ready para deploy

---

## 🔗 Próximos Passos Após Implementação

1. Testar localmente: `python main.py`
2. Rodar testes: `pytest`
3. Testar com frontend: Atualizar VITE_API_URL
4. Deploy (Railway/Render)
5. Configurar CI/CD (GitHub Actions)
