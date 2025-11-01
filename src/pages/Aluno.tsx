import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FileText, MessageSquare, LogOut, GraduationCap } from "lucide-react";

const Aluno = () => {
  const navigate = useNavigate();
  const [studentName] = useState("João Silva");

  const handleLogout = () => {
    navigate("/");
  };

  // Mock data
  const subjects = [
    { id: 1, name: "Programação Web", teacher: "Prof. Maria Santos", grade: 8.5 },
    { id: 2, name: "Banco de Dados", teacher: "Prof. Carlos Lima", grade: 9.0 },
    { id: 3, name: "Engenharia de Software", teacher: "Prof. Ana Costa", grade: 7.5 },
  ];

  const materials = [
    { id: 1, title: "Apostila React", subject: "Programação Web", date: "2024-10-15" },
    { id: 2, title: "SQL Avançado", subject: "Banco de Dados", date: "2024-10-12" },
    { id: 3, title: "Padrões de Projeto", subject: "Engenharia de Software", date: "2024-10-10" },
  ];

  const messages = [
    { id: 1, from: "Prof. Maria Santos", text: "Trabalho entregue com sucesso!", date: "Hoje" },
    { id: 2, from: "Prof. Carlos Lima", text: "Aula extra na sexta-feira", date: "Ontem" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">LUMINA</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">Olá, {studentName}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="subjects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="subjects">
              <BookOpen className="w-4 h-4 mr-2" />
              Matérias
            </TabsTrigger>
            <TabsTrigger value="materials">
              <FileText className="w-4 h-4 mr-2" />
              Materiais
            </TabsTrigger>
            <TabsTrigger value="messages">
              <MessageSquare className="w-4 h-4 mr-2" />
              Mensagens
            </TabsTrigger>
          </TabsList>

          <TabsContent value="subjects" className="space-y-4">
            <h2 className="text-2xl font-bold">Minhas Matérias</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {subjects.map((subject) => (
                <Card key={subject.id} className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold">{subject.name}</h3>
                  <p className="text-sm text-muted-foreground">{subject.teacher}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-sm">Nota</span>
                    <span className="text-2xl font-bold text-primary">{subject.grade}</span>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="materials" className="space-y-4">
            <h2 className="text-2xl font-bold">Material de Aula</h2>
            <div className="space-y-3">
              {materials.map((material) => (
                <Card key={material.id} className="p-4 flex items-center justify-between hover:bg-accent/5 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <h3 className="font-semibold">{material.title}</h3>
                      <p className="text-sm text-muted-foreground">{material.subject}</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{material.date}</span>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            <h2 className="text-2xl font-bold">Mensagens</h2>
            <div className="space-y-3">
              {messages.map((message) => (
                <Card key={message.id} className="p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">{message.from}</h3>
                    <span className="text-xs text-muted-foreground">{message.date}</span>
                  </div>
                  <p className="text-sm">{message.text}</p>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Aluno;
