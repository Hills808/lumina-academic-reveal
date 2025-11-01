import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Upload, MessageSquare, LogOut, GraduationCap, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Professor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [teacherName] = useState("Prof. Maria Santos");

  const handleLogout = () => {
    navigate("/");
  };

  const handleUploadMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Material enviado!",
      description: "O material foi disponibilizado para os alunos.",
    });
  };

  const handleSendGrades = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Notas lançadas!",
      description: "As notas foram registradas no sistema.",
    });
  };

  // Mock data
  const classes = [
    { id: 1, name: "Programação Web - Turma A", students: 35 },
    { id: 2, name: "Programação Web - Turma B", students: 32 },
  ];

  const students = [
    { id: 1, name: "João Silva", class: "Turma A", grade: 8.5 },
    { id: 2, name: "Maria Oliveira", class: "Turma A", grade: 9.0 },
    { id: 3, name: "Pedro Santos", class: "Turma B", grade: 7.5 },
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
            <span className="text-sm">Olá, {teacherName}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="classes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="classes">
              <BookOpen className="w-4 h-4 mr-2" />
              Turmas
            </TabsTrigger>
            <TabsTrigger value="upload">
              <Upload className="w-4 h-4 mr-2" />
              Material
            </TabsTrigger>
            <TabsTrigger value="grades">
              <Award className="w-4 h-4 mr-2" />
              Notas
            </TabsTrigger>
            <TabsTrigger value="messages">
              <MessageSquare className="w-4 h-4 mr-2" />
              Mensagens
            </TabsTrigger>
          </TabsList>

          <TabsContent value="classes" className="space-y-4">
            <h2 className="text-2xl font-bold">Minhas Turmas</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {classes.map((classItem) => (
                <Card key={classItem.id} className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold">{classItem.name}</h3>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-sm text-muted-foreground">Alunos</span>
                    <span className="text-2xl font-bold text-primary">{classItem.students}</span>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
            <h2 className="text-2xl font-bold">Upload de Material</h2>
            <Card className="p-6">
              <form onSubmit={handleUploadMaterial} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título do Material</Label>
                  <Input id="title" placeholder="Ex: Apostila React" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="class">Turma</Label>
                  <select id="class" className="w-full px-3 py-2 bg-background border border-input rounded-md" required>
                    <option value="">Selecione a turma</option>
                    {classes.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file">Arquivo</Label>
                  <Input id="file" type="file" required />
                </div>
                <Button type="submit" className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Enviar Material
                </Button>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="grades" className="space-y-4">
            <h2 className="text-2xl font-bold">Lançamento de Notas</h2>
            <Card className="p-6">
              <form onSubmit={handleSendGrades} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student">Aluno</Label>
                  <select id="student" className="w-full px-3 py-2 bg-background border border-input rounded-md" required>
                    <option value="">Selecione o aluno</option>
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>{s.name} - {s.class}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade">Nota (0 a 10)</Label>
                  <Input id="grade" type="number" min="0" max="10" step="0.1" placeholder="8.5" required />
                </div>
                <Button type="submit" className="w-full">
                  <Award className="w-4 h-4 mr-2" />
                  Lançar Nota
                </Button>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            <h2 className="text-2xl font-bold">Enviar Mensagem</h2>
            <Card className="p-6">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient">Destinatário</Label>
                  <select id="recipient" className="w-full px-3 py-2 bg-background border border-input rounded-md" required>
                    <option value="">Selecione</option>
                    <option value="all">Todos os alunos</option>
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea id="message" placeholder="Digite sua mensagem..." rows={4} required />
                </div>
                <Button type="submit" className="w-full">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Enviar Mensagem
                </Button>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Professor;
