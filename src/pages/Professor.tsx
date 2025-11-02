import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Upload, MessageSquare, LogOut, GraduationCap, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { authApi, teacherApi, Class, Student } from "@/services/api";

const Professor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState(authApi.getCurrentUser());
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [materialFile, setMaterialFile] = useState<File | null>(null);
  const [materialTitle, setMaterialTitle] = useState("");
  const [materialClassId, setMaterialClassId] = useState("");
  
  const [gradeClassId, setGradeClassId] = useState("");
  const [gradeStudentId, setGradeStudentId] = useState("");
  const [gradeSubject, setGradeSubject] = useState("");
  const [gradeValue, setGradeValue] = useState("");
  
  const [messageClassId, setMessageClassId] = useState("");
  const [messageSubject, setMessageSubject] = useState("");
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    loadClasses();
  }, [user, navigate]);

  const loadClasses = async () => {
    try {
      setLoading(true);
      const classesData = await teacherApi.getClasses();
      setClasses(classesData);
      
      if (classesData.length > 0) {
        setSelectedClass(classesData[0].id);
        await loadStudents(classesData[0].id);
      }
    } catch (error) {
      toast({
        title: "Erro ao carregar turmas",
        description: error instanceof Error ? error.message : "Tente novamente",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadStudents = async (classId: number) => {
    try {
      const studentsData = await teacherApi.getStudents(classId);
      setStudents(studentsData);
    } catch (error) {
      toast({
        title: "Erro ao carregar alunos",
        description: error instanceof Error ? error.message : "Tente novamente",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    authApi.logout();
    navigate("/");
  };

  const handleUploadMaterial = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!materialFile || !materialTitle || !materialClassId) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", materialFile);
      formData.append("title", materialTitle);
      formData.append("class_id", materialClassId);

      await teacherApi.uploadMaterial(formData);

      toast({
        title: "Material enviado!",
        description: "Os alunos já podem acessar.",
      });

      setMaterialFile(null);
      setMaterialTitle("");
      setMaterialClassId("");
      (document.getElementById("file") as HTMLInputElement).value = "";
    } catch (error) {
      toast({
        title: "Erro ao enviar material",
        description: error instanceof Error ? error.message : "Tente novamente",
        variant: "destructive",
      });
    }
  };

  const handleSendGrades = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!gradeClassId || !gradeStudentId || !gradeSubject || !gradeValue) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    try {
      await teacherApi.submitGrade({
        class_id: parseInt(gradeClassId),
        student_id: parseInt(gradeStudentId),
        subject: gradeSubject,
        grade: parseFloat(gradeValue),
      });

      toast({
        title: "Nota lançada!",
        description: "O aluno já pode visualizar.",
      });

      setGradeClassId("");
      setGradeStudentId("");
      setGradeSubject("");
      setGradeValue("");
    } catch (error) {
      toast({
        title: "Erro ao lançar nota",
        description: error instanceof Error ? error.message : "Tente novamente",
        variant: "destructive",
      });
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!messageClassId || !messageSubject || !messageText) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    try {
      await teacherApi.sendMessage({
        class_id: parseInt(messageClassId),
        subject: messageSubject,
        message: messageText,
      });

      toast({
        title: "Mensagem enviada!",
        description: "Os alunos receberão a notificação.",
      });

      setMessageClassId("");
      setMessageSubject("");
      setMessageText("");
    } catch (error) {
      toast({
        title: "Erro ao enviar mensagem",
        description: error instanceof Error ? error.message : "Tente novamente",
        variant: "destructive",
      });
    }
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
                <Card 
                  key={classItem.id} 
                  className={`p-6 space-y-3 cursor-pointer transition-colors ${
                    selectedClass === classItem.id ? "border-primary" : ""
                  }`}
                  onClick={() => {
                    setSelectedClass(classItem.id);
                    loadStudents(classItem.id);
                  }}
                >
                  <h3 className="text-xl font-semibold">{classItem.name}</h3>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-sm text-muted-foreground">Alunos</span>
                    <span className="text-2xl font-bold text-primary">{classItem.students_count}</span>
                  </div>
                </Card>
              ))}
            </div>

            {selectedClass && students.length > 0 && (
              <Card className="p-6 mt-4">
                <h3 className="text-xl font-semibold mb-4">Alunos da Turma</h3>
                <div className="space-y-2">
                  {students.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
            <h2 className="text-2xl font-bold">Upload de Material</h2>
            <Card className="p-6">
              <form onSubmit={handleUploadMaterial} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="class">Turma</Label>
                  <select 
                    id="class" 
                    className="w-full px-3 py-2 bg-background border border-input rounded-md" 
                    value={materialClassId}
                    onChange={(e) => setMaterialClassId(e.target.value)}
                    required
                  >
                    <option value="">Selecione a turma</option>
                    {classes.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Título do Material</Label>
                  <Input 
                    id="title" 
                    placeholder="Ex: Apostila React" 
                    value={materialTitle}
                    onChange={(e) => setMaterialTitle(e.target.value)}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file">Arquivo</Label>
                  <Input 
                    id="file" 
                    type="file" 
                    onChange={(e) => setMaterialFile(e.target.files?.[0] || null)}
                    required 
                  />
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
                  <Label htmlFor="grade-class-select">Turma</Label>
                  <select 
                    id="grade-class-select"
                    className="w-full px-3 py-2 bg-background border border-input rounded-md" 
                    value={gradeClassId}
                    onChange={(e) => {
                      setGradeClassId(e.target.value);
                      loadStudents(parseInt(e.target.value));
                    }}
                    required
                  >
                    <option value="">Selecione a turma</option>
                    {classes.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student">Aluno</Label>
                  <select 
                    id="student" 
                    className="w-full px-3 py-2 bg-background border border-input rounded-md" 
                    value={gradeStudentId}
                    onChange={(e) => setGradeStudentId(e.target.value)}
                    required
                  >
                    <option value="">Selecione o aluno</option>
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Matéria</Label>
                  <Input 
                    id="subject" 
                    placeholder="Ex: Matemática" 
                    value={gradeSubject}
                    onChange={(e) => setGradeSubject(e.target.value)}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade">Nota (0 a 10)</Label>
                  <Input 
                    id="grade" 
                    type="number" 
                    min="0" 
                    max="10" 
                    step="0.1" 
                    placeholder="8.5" 
                    value={gradeValue}
                    onChange={(e) => setGradeValue(e.target.value)}
                    required 
                  />
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
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient">Turma</Label>
                  <select 
                    id="recipient" 
                    className="w-full px-3 py-2 bg-background border border-input rounded-md" 
                    value={messageClassId}
                    onChange={(e) => setMessageClassId(e.target.value)}
                    required
                  >
                    <option value="">Selecione a turma</option>
                    {classes.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="msg-subject">Assunto</Label>
                  <Input 
                    id="msg-subject" 
                    placeholder="Ex: Prova marcada" 
                    value={messageSubject}
                    onChange={(e) => setMessageSubject(e.target.value)}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Digite sua mensagem..." 
                    rows={4} 
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    required 
                  />
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
