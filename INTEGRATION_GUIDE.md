# 🔗 Guia de Integração Frontend + Backend

## 📋 Checklist de Integração

### 1️⃣ Backend Python
- [ ] Instalar dependências: `pip install -r requirements.txt`
- [ ] Configurar banco de dados
- [ ] Configurar variáveis de ambiente (`.env`)
- [ ] Executar servidor: `python main.py`
- [ ] Testar rotas com curl ou Postman
- [ ] Fazer deploy (Railway, Render, etc)

### 2️⃣ Frontend React
- [ ] Copiar `.env.example` para `.env`
- [ ] Configurar `VITE_API_URL` com URL do backend
- [ ] Substituir dados mock pelas chamadas de API
- [ ] Testar fluxo completo: cadastro → login → dashboard
- [ ] Deploy no Lovable

---

## 🚀 Como Usar as APIs no Frontend

### Exemplo 1: Login

**Antes (mock data):**
```tsx
const handleLogin = () => {
  console.log("Login:", { email, password });
  navigate("/aluno");
};
```

**Depois (com API):**
```tsx
import { authApi } from "@/services/api";
import { toast } from "@/hooks/use-toast";

const handleLogin = async () => {
  try {
    const result = await authApi.login({ email, password });
    
    toast({
      title: "Login realizado!",
      description: `Bem-vindo, ${result.user.name}`,
    });
    
    // Redirecionar baseado no tipo de usuário
    if (result.user.user_type === "student") {
      navigate("/aluno");
    } else {
      navigate("/professor");
    }
  } catch (error) {
    toast({
      title: "Erro no login",
      description: error.message,
      variant: "destructive",
    });
  }
};
```

---

### Exemplo 2: Buscar Matérias do Aluno

**Antes (mock data):**
```tsx
const subjects = [
  { id: 1, name: "Matemática", teacher: "Prof. Carlos", grade: 8.5 },
  // ...
];
```

**Depois (com API):**
```tsx
import { studentApi } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const { data: subjects, isLoading } = useQuery({
  queryKey: ["subjects"],
  queryFn: studentApi.getSubjects,
});

if (isLoading) return <div>Carregando...</div>;
```

---

### Exemplo 3: Upload de Material (Professor)

**Antes (mock):**
```tsx
const handleUploadMaterial = (e: React.FormEvent) => {
  e.preventDefault();
  console.log("Upload:", { turma, titulo, arquivo });
  toast({ title: "Material enviado!" });
};
```

**Depois (com API):**
```tsx
import { teacherApi } from "@/services/api";

const handleUploadMaterial = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const formData = new FormData();
  formData.append("class_id", turma);
  formData.append("title", titulo);
  formData.append("file", arquivo);
  
  try {
    const result = await teacherApi.uploadMaterial(formData);
    toast({
      title: "Sucesso!",
      description: result.message,
    });
    setTitulo("");
    setArquivo(null);
  } catch (error) {
    toast({
      title: "Erro ao enviar",
      description: error.message,
      variant: "destructive",
    });
  }
};
```

---

## 🔐 Proteção de Rotas

Crie um componente para proteger rotas autenticadas:

```tsx
// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { authApi } from "@/services/api";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = authApi.getCurrentUser();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}
```

**Use no App.tsx:**
```tsx
<Route path="/aluno" element={
  <ProtectedRoute>
    <Aluno />
  </ProtectedRoute>
} />
```

---

## 🌐 CORS

Certifique-se de que o backend permite requisições do frontend:

```python
# No backend Python (main.py)
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

## 🐛 Debugging

### Ver requisições no console:
```tsx
// Adicione isto temporariamente no api.ts para debug
console.log('Chamando API:', url);
console.log('Response:', await response.json());
```

### Testar backend diretamente:
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@email.com","password":"123456"}'
```

---

## 📦 Deploy Completo

### Backend (Railway):
1. Push código Python para GitHub
2. Conectar Railway → GitHub
3. Configurar variáveis de ambiente
4. Copiar URL gerada (ex: `https://seu-app.railway.app`)

### Frontend (Lovable):
1. Atualizar `.env`: `VITE_API_URL=https://seu-app.railway.app/api`
2. Clicar em "Publish" no Lovable
3. Testar em produção

---

## ✅ Pronto!

Agora você tem:
- ✅ Backend Python estruturado
- ✅ Frontend React preparado
- ✅ Serviço de API configurado
- ✅ Documentação completa
- ✅ Guia de integração

**Próximo passo:** Implementar o backend seguindo `backend-example-python/main.py` e conectar!
