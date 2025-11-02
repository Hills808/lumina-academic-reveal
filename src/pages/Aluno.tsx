import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FileText, MessageSquare, LogOut, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { authApi, studentApi, Subject, Material, Message } from "@/services/api";

const Aluno = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState(authApi.getCurrentUser());
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    loadStudentData();
  }, [user, navigate]);

  const loadStudentData = async () => {
    try {
      setLoading(true);
      const [subjectsData, materialsData, messagesData] = await Promise.all([
        studentApi.getSubjects(),
        studentApi.getMaterials(),
        studentApi.getMessages(),
      ]);
      
      setSubjects(subjectsData);
      setMaterials(materialsData);
      setMessages(messagesData);
    } catch (error) {
      toast({
        title: "Erro ao carregar dados",
        description: error instanceof Error ? error.message : "Tente novamente",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authApi.logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">LUMINA</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">Olá, {user?.name}</span>
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
                <Card key={material.id} className="p-4 flex items-center justify-between hover:bg-accent/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <h3 className="font-semibold">{material.title}</h3>
                      <p className="text-sm text-muted-foreground">{material.subject}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{material.date}</span>
                    <Button variant="outline" size="sm" asChild>
                      <a href={material.file_url} target="_blank" rel="noopener noreferrer">
                        Baixar
                      </a>
                    </Button>
                  </div>
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
                    <div>
                      <h3 className="font-semibold">{message.subject}</h3>
                      <p className="text-xs text-muted-foreground">De: {message.from}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{message.date}</span>
                  </div>
                  <p className="text-sm">{message.message}</p>
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
