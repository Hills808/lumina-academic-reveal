// 🔌 Serviço de API para conectar com backend Python

// URL base da API - altere quando fizer deploy do backend
const API_BASE_URL = (() => {
  // Permite override via query (?api=URL) e persiste em localStorage
  try {
    const params = new URLSearchParams(window.location.search);
    const paramApi = params.get('api');
    if (paramApi) {
      const clean = paramApi.trim().replace(/\/$/, '');
      localStorage.setItem('api_base_url', clean);
    }
  } catch {}

  const stored = localStorage.getItem('api_base_url');
  const envRaw = (import.meta.env.VITE_API_URL as string | undefined)?.trim();
  let base = stored || envRaw || '';

  if (base) {
    base = base.replace(/\/$/, "");
    if (!/\/api$/.test(base)) base += "/api";
    return base;
  }

  const { hostname } = window.location;
  // GitHub Codespaces: troca o sufixo de porta pelo 8000
  if (/\.app\.github\.dev$/.test(hostname)) {
    const apiHost = hostname.replace(/-(\d+)\.app\.github\.dev$/, '-8000.app.github.dev');
    return `https://${apiHost}/api`;
  }
  if (/\.githubpreview\.dev$/.test(hostname)) {
    const apiHost = hostname.replace(/-(\d+)\.githubpreview\.dev$/, '-8000.githubpreview.dev');
    return `https://${apiHost}/api`;
  }
  return 'http://localhost:8000/api';
})();

console.info('[API] Base URL:', API_BASE_URL);

// ===== TIPOS =====

export interface User {
  id: number;
  name: string;
  email: string;
  user_type: 'student' | 'teacher';
}

export interface AuthTokenResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface Subject {
  id: number;
  name: string;
  teacher: string;
  grade: number;
}

export interface Material {
  id: number;
  subject: string;
  title: string;
  date: string;
  file_url: string;
}

export interface Message {
  id: number;
  from: string;
  subject: string;
  message: string;
  date: string;
}

export interface Class {
  id: number;
  name: string;
  students_count: number;
}

export interface Student {
  id: number;
  name: string;
  email: string;
}

// ===== FUNÇÕES AUXILIARES =====

function getAuthHeader() {
  const token = localStorage.getItem('auth_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = `Erro: ${response.status}`;
    try {
      const data = await response.json();
      if (typeof data?.detail === "string") message = data.detail;
      else if (Array.isArray(data?.detail) && data.detail[0]?.msg) message = data.detail[0].msg;
      else if (data?.error) message = data.error;
    } catch {}
    throw new Error(message);
  }
  return response.json();
}

// ===== AUTENTICAÇÃO =====

export const authApi = {
  async register(data: {
    name: string;
    email: string;
    password: string;
    user_type: string;
  }): Promise<AuthTokenResponse> {
    try {
      const url = `${API_BASE_URL}/auth/register`;
      console.info('[API] POST', url, data);
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await handleResponse<AuthTokenResponse>(response);
      if (result.access_token) {
        localStorage.setItem('auth_token', result.access_token);
        localStorage.setItem('user', JSON.stringify(result.user));
      }
      return result;
    } catch (err: any) {
      console.error('[API] register error', err);
      throw new Error(`Falha ao conectar na API (${API_BASE_URL}). Verifique a URL e tente novamente. Detalhe: ${err?.message || err}`);
    }
  },

  async login(data: {
    email: string;
    password: string;
  }): Promise<AuthTokenResponse> {
    try {
      const url = `${API_BASE_URL}/auth/login`;
      console.info('[API] POST', url, { email: data.email });
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await handleResponse<AuthTokenResponse>(response);
      
      // Salvar token no localStorage
      if (result.access_token) {
        localStorage.setItem('auth_token', result.access_token);
        localStorage.setItem('user', JSON.stringify(result.user));
      }
      
      return result;
    } catch (err: any) {
      console.error('[API] login error', err);
      throw new Error(`Falha ao conectar na API (${API_BASE_URL}). Verifique a URL e tente novamente. Detalhe: ${err?.message || err}`);
    }
  },

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};

// ===== ROTAS DO ALUNO =====

export const studentApi = {
  async getSubjects(): Promise<Subject[]> {
    const response = await fetch(`${API_BASE_URL}/student/subjects`, {
      headers: getAuthHeader(),
    });
    const result = await handleResponse<{ success: boolean; subjects: Subject[] }>(response);
    return result.subjects;
  },

  async getMaterials(): Promise<Material[]> {
    const response = await fetch(`${API_BASE_URL}/student/materials`, {
      headers: getAuthHeader(),
    });
    const result = await handleResponse<{ success: boolean; materials: Material[] }>(response);
    return result.materials;
  },

  async getMessages(): Promise<Message[]> {
    const response = await fetch(`${API_BASE_URL}/student/messages`, {
      headers: getAuthHeader(),
    });
    const result = await handleResponse<{ success: boolean; messages: Message[] }>(response);
    return result.messages;
  },
};

// ===== ROTAS DO PROFESSOR =====

export const teacherApi = {
  async getClasses(): Promise<Class[]> {
    const response = await fetch(`${API_BASE_URL}/teacher/classes`, {
      headers: getAuthHeader(),
    });
    const result = await handleResponse<{ success: boolean; classes: Class[] }>(response);
    return result.classes;
  },

  async getStudents(classId: number): Promise<Student[]> {
    const response = await fetch(`${API_BASE_URL}/teacher/students?class_id=${classId}`, {
      headers: getAuthHeader(),
    });
    const result = await handleResponse<{ success: boolean; students: Student[] }>(response);
    return result.students;
  },

  async uploadMaterial(data: FormData): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${API_BASE_URL}/teacher/materials`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: data,
    });
    return handleResponse(response);
  },

  async submitGrade(data: {
    class_id: number;
    student_id: number;
    subject: string;
    grade: number;
  }): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${API_BASE_URL}/teacher/grades`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  async sendMessage(data: {
    class_id: number;
    subject: string;
    message: string;
  }): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${API_BASE_URL}/teacher/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },
};
