import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { authApi } from "@/services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"student" | "teacher">("student");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await authApi.login({ email, password });
      
      // Verifica se o tipo de usuário corresponde
      if (result.user.user_type !== userType) {
        toast({
          title: "Erro no login",
          description: `Este usuário está cadastrado como ${result.user.user_type === "student" ? "aluno" : "professor"}`,
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Login realizado!",
        description: `Bem-vindo, ${result.user.name}!`,
      });

      // Redireciona baseado no tipo de usuário
      navigate(userType === "student" ? "/aluno" : "/professor");
    } catch (error) {
      toast({
        title: "Erro no login",
        description: error instanceof Error ? error.message : "Verifique suas credenciais",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary">LUMINA</h1>
          <p className="text-muted-foreground">Acesse sua conta</p>
        </div>

        <div className="flex gap-2 p-1 bg-muted rounded-lg">
          <button
            onClick={() => setUserType("student")}
            className={`flex-1 py-2 rounded-md transition-colors ${
              userType === "student"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground"
            }`}
          >
            Aluno
          </button>
          <button
            onClick={() => setUserType("teacher")}
            className={`flex-1 py-2 rounded-md transition-colors ${
              userType === "teacher"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground"
            }`}
          >
            Professor
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>

        <div className="text-center">
          <button
            onClick={() => navigate("/cadastro")}
            className="text-sm text-primary hover:underline"
          >
            Não tem conta? Cadastre-se
          </button>
        </div>

        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="w-full"
        >
          Voltar
        </Button>
      </Card>
    </div>
  );
};

export default Login;
