# 🚀 Backend Python - LUMINA

## Instalação e Execução

### 1. Instalar dependências
```bash
pip install -r requirements.txt
```

### 2. Executar servidor
```bash
python main.py
```

O servidor estará rodando em: `http://localhost:8000`

### 3. Documentação interativa
Acesse: `http://localhost:8000/docs`

---

## 📦 Estrutura Recomendada

```
backend-python/
├── main.py              # Arquivo principal
├── requirements.txt     # Dependências
├── config.py           # Configurações
├── models/             # Modelos do banco
│   ├── user.py
│   ├── subject.py
│   └── material.py
├── routes/             # Rotas separadas
│   ├── auth.py
│   ├── student.py
│   └── teacher.py
├── services/           # Lógica de negócio
│   ├── auth_service.py
│   └── storage_service.py
└── database/           # Conexão banco de dados
    └── connection.py
```

---

## 🗄️ Banco de Dados

### Opções recomendadas:

1. **PostgreSQL** (mais robusto)
```bash
pip install psycopg2-binary sqlalchemy
```

2. **SQLite** (mais simples, para testes)
```python
import sqlite3
```

3. **MongoDB** (NoSQL)
```bash
pip install pymongo
```

---

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env`:

```env
SECRET_KEY=sua-chave-secreta-super-segura
DATABASE_URL=postgresql://user:password@localhost/lumina
CORS_ORIGINS=http://localhost:5173,https://seuapp.lovable.app
```

---

## 🌐 Deploy

### Railway
1. Conecte seu repositório GitHub
2. Railway detecta automaticamente Python
3. Configure variáveis de ambiente

### Render
1. Conecte repositório
2. Selecione "Web Service"
3. Build: `pip install -r requirements.txt`
4. Start: `python main.py`

### PythonAnywhere
1. Upload dos arquivos
2. Configure WSGI
3. Instale dependências via console

---

## 🧪 Testar API

### Com curl:
```bash
# Cadastro
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"João","email":"joao@email.com","password":"123456","user_type":"student"}'

# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@email.com","password":"123456"}'
```

### Com Postman/Insomnia:
Importe a coleção da documentação `API_DOCUMENTATION.md`

---

## 📝 Próximos Passos

1. ✅ Configurar banco de dados
2. ✅ Implementar autenticação JWT
3. ✅ Criar tabelas/modelos
4. ✅ Implementar rotas
5. ✅ Adicionar validações
6. ✅ Configurar storage de arquivos
7. ✅ Deploy
8. ✅ Conectar com frontend
