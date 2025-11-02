import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { authApi } from "@/services/api";

const Cadastro = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState<"student" | "teacher">("student");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem!",
        variant: "destructive",
      });
      return;
    }

    try {
      await authApi.register({
        name,
        email,
        password,
        user_type: userType,
      });

      toast({
        title: "Cadastro realizado!",
        description: "Você já pode fazer login.",
      });

      navigate("/login");
    } catch (error) {
      toast({
        title: "Erro no cadastro",
        description: error instanceof Error ? error.message : "Tente novamente",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary">LUMINA</h1>
          <p className="text-muted-foreground">Crie sua conta</p>
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

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Cadastrar
          </Button>
        </form>

        <div className="text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-primary hover:underline"
          >
            Já tem conta? Faça login
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

export default Cadastro;
