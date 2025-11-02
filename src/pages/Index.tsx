import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

const Index = () => {
  const [showTrick, setShowTrick] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showRealSite, setShowRealSite] = useState(false);
  const [codeLines, setCodeLines] = useState<string[]>([]);
  const navigate = useNavigate();

  const pythonCode = [
    "from flask import Flask, jsonify, request",
    "from flask_cors import CORS",
    "",
    "app = Flask(__name__)",
    "CORS(app)",
    "",
    "@app.route('/api/login', methods=['POST'])",
    "def login():",
    "    data = request.json",
    "    # Authentication logic here",
    "    return jsonify({'success': True})",
    "",
    "@app.route('/api/students', methods=['GET'])",
    "def get_students():",
    "    return jsonify({'students': []})",
    "",
    "if __name__ == '__main__':",
    "    app.run(debug=True)",
  ];

  const htmlCode = [
    "<!DOCTYPE html>",
    "<html lang='pt-BR'>",
    "<head>",
    "  <meta charset='UTF-8'>",
    "  <title>LUMINA - Plataforma Acadêmica</title>",
    "  <style>",
    "    * { margin: 0; padding: 0; }",
    "    body { font-family: 'Inter', sans-serif; }",
    "  </style>",
    "</head>",
    "<body>",
    "  <div class='container'>",
    "    <h1>LUMINA</h1>",
    "  </div>",
    "</body>",
    "</html>",
  ];

  useEffect(() => {
    if (showAnimation) {
      const allCode = [...pythonCode, "", "<!-- HTML -->", ...htmlCode];
      let currentLine = 0;

      const interval = setInterval(() => {
        if (currentLine < allCode.length) {
          setCodeLines((prev) => [...prev, allCode[currentLine]]);
          currentLine++;
        } else {
          clearInterval(interval);
          setTimeout(() => setShowRealSite(true), 1200);
        }
      }, 80);

      return () => clearInterval(interval);
    }
  }, [showAnimation]);

  const handleButtonClick = () => {
    setShowTrick(true);
    setTimeout(() => setShowAnimation(true), 1500);
  };

  const skipAnimation = () => {
    setShowRealSite(true);
  };

  if (showRealSite) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary">LUMINA</h1>
            </div>
            <nav className="flex gap-6">
              <a href="#sobre" className="hover:text-primary transition-colors">Sobre</a>
              <a href="#cursos" className="hover:text-primary transition-colors">Cursos</a>
              <a href="#contato" className="hover:text-primary transition-colors">Contato</a>
            </nav>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/cadastro")}>
                Cadastrar
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center space-y-6 max-w-4xl">
            <h2 className="text-5xl font-bold leading-tight animate-fade-in">
              Transforme sua Jornada Acadêmica com{" "}
              <span className="text-primary">LUMINA</span>
            </h2>
            <p className="text-xl text-muted-foreground animate-fade-in">
              A plataforma completa para alunos e professores. Gestão de materiais,
              notas, mensagens e IA integrada para potencializar o aprendizado.
            </p>
            <div className="flex gap-4 justify-center pt-6 animate-fade-in">
              <Button size="lg" onClick={() => navigate("/cadastro")}>
                Começar Agora
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/login")}>
                Fazer Login
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="sobre" className="py-20 px-4 bg-card/50">
          <div className="container mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12">Recursos da Plataforma</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-card rounded-lg border border-border space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-xl font-semibold">Gestão Acadêmica</h4>
                <p className="text-muted-foreground">
                  Acesse notas, materiais e cronogramas em um só lugar.
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg border border-border space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-xl font-semibold">IA Integrada</h4>
                <p className="text-muted-foreground">
                  Assistentes inteligentes para professores e alunos.
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg border border-border space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-xl font-semibold">Comunicação Eficiente</h4>
                <p className="text-muted-foreground">
                  Sistema de mensagens direto entre alunos e professores.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contato" className="py-20 px-4">
          <div className="container mx-auto max-w-2xl text-center space-y-6">
            <h3 className="text-3xl font-bold">Entre em Contato</h3>
            <p className="text-muted-foreground">
              Dúvidas sobre a plataforma? Fale conosco!
            </p>
            <Button size="lg">Enviar Mensagem</Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-8">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>© 2024 LUMINA - Plataforma Acadêmica | Projeto UNIP - ADS</p>
          </div>
        </footer>
      </div>
    );
  }

  if (showAnimation) {
    return (
      <div className="min-h-screen bg-[#1e1e1e] text-[#d4d4d4] font-mono p-8 relative overflow-auto">
        <Button
          onClick={skipAnimation}
          className="fixed top-4 right-4 z-50 opacity-0 animate-[fade-in_0.5s_ease-out_0.5s_forwards]"
          variant="outline"
          size="sm"
        >
          Pular
        </Button>
        <div className="mb-6 flex items-center gap-2 text-sm opacity-0 animate-[fade-in_0.4s_ease-out_0.2s_forwards]">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="ml-4 text-[#858585]">main.py</span>
        </div>
        <pre className="text-sm leading-loose">
          {codeLines.map((line, index) => (
            <div 
              key={index} 
              className="opacity-0 translate-y-1 animate-[fade-in_0.6s_ease-out_forwards]" 
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {line}
            </div>
          ))}
        </pre>
      </div>
    );
  }

  if (showTrick) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 transition-all duration-500">
        <div className="text-center space-y-4 animate-scale-in">
          <h1 className="text-5xl font-bold text-primary">
            Ops! 👀
          </h1>
          <p className="text-lg text-muted-foreground">Montando algo melhor...</p>
        </div>
      </div>
    );
  }

  // Simple initial version - looks rushed
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-white border-2 border-black p-8 w-full max-w-sm space-y-4">
        <h1 className="text-xl font-semibold text-center text-black">LUMINA</h1>
        <p className="text-sm text-black/70 text-center">Sistema Acadêmico</p>
        <div className="space-y-2 pt-2">
          <button 
            onClick={handleButtonClick} 
            className="w-full bg-black text-white py-2 px-4 rounded hover:bg-black/90 transition-colors"
          >
            Entrar
          </button>
          <button 
            onClick={handleButtonClick} 
            className="w-full bg-white text-black border-2 border-black py-2 px-4 rounded hover:bg-black/5 transition-colors"
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
