
import { toast } from "@/hooks/use-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

// Helper to get token
const getToken = () => {
  return localStorage.getItem('token');
};

// Helper for handling API responses
const handleResponse = async (response: Response) => {
  const data = await response.json();
  
  if (!response.ok) {
    const message = data.message || 'Something went wrong';
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    });
    throw new Error(message);
  }
  
  return data;
};

const apiClient = {
  // Auth endpoints
  auth: {
    register: async (userData: any) => {
      const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      return handleResponse(response);
    },
    
    login: async (credentials: any) => {
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      return handleResponse(response);
    },
    
    getCurrentUser: async () => {
      const token = getToken();
      if (!token) return null;
      
      try {
        const response = await fetch(`${API_URL}/users/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        return handleResponse(response);
      } catch (error) {
        console.error('Error getting current user:', error);
        return null;
      }
    },
  },
  
  // Courses endpoints
  courses: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/courses`);
      return handleResponse(response);
    },
    
    getById: async (courseId: string) => {
      const response = await fetch(`${API_URL}/courses/${courseId}`);
      return handleResponse(response);
    },
    
    create: async (courseData: any) => {
      const token = getToken();
      const response = await fetch(`${API_URL}/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(courseData),
      });
      return handleResponse(response);
    },
    
    update: async (courseId: string, courseData: any) => {
      const token = getToken();
      const response = await fetch(`${API_URL}/courses/${courseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(courseData),
      });
      return handleResponse(response);
    },
    
    delete: async (courseId: string) => {
      const token = getToken();
      const response = await fetch(`${API_URL}/courses/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },
  },
  
  // Chapters endpoints
  chapters: {
    getAllForCourse: async (courseId: string) => {
      const response = await fetch(`${API_URL}/chapters/course/${courseId}`);
      return handleResponse(response);
    },
    
    getById: async (chapterId: string) => {
      const response = await fetch(`${API_URL}/chapters/${chapterId}`);
      return handleResponse(response);
    },
    
    create: async (chapterData: any) => {
      const token = getToken();
      const response = await fetch(`${API_URL}/chapters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(chapterData),
      });
      return handleResponse(response);
    },
    
    update: async (chapterId: string, chapterData: any) => {
      const token = getToken();
      const response = await fetch(`${API_URL}/chapters/${chapterId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(chapterData),
      });
      return handleResponse(response);
    },
    
    delete: async (chapterId: string) => {
      const token = getToken();
      const response = await fetch(`${API_URL}/chapters/${chapterId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },
    
    reorder: async (courseId: string, chapterOrders: any[]) => {
      const token = getToken();
      const response = await fetch(`${API_URL}/chapters/reorder/${courseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ chapterOrders }),
      });
      return handleResponse(response);
    },
  },
  
  // Lessons endpoints
  lessons: {
    getAllForChapter: async (chapterId: string) => {
      const response = await fetch(`${API_URL}/lessons/chapter/${chapterId}`);
      return handleResponse(response);
    },
    
    getById: async (lessonId: string) => {
      const response = await fetch(`${API_URL}/lessons/${lessonId}`);
      return handleResponse(response);
    },
    
    create: async (lessonData: any) => {
      const token = getToken();
      const response = await fetch(`${API_URL}/lessons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(lessonData),
      });
      return handleResponse(response);
    },
    
    update: async (lessonId: string, lessonData: any) => {
      const token = getToken();
      const response = await fetch(`${API_URL}/lessons/${lessonId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(lessonData),
      });
      return handleResponse(response);
    },
    
    delete: async (lessonId: string) => {
      const token = getToken();
      const response = await fetch(`${API_URL}/lessons/${lessonId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },
    
    reorder: async (chapterId: string, lessonOrders: any[]) => {
      const token = getToken();
      const response = await fetch(`${API_URL}/lessons/reorder/${chapterId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ lessonOrders }),
      });
      return handleResponse(response);
    },
    
    createPage: async (lessonId: string, pageData: any) => {
      const token = getToken();
      const response = await fetch(`${API_URL}/lessons/${lessonId}/pages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(pageData),
      });
      return handleResponse(response);
    },
    
    updatePage: async (pageId: string, pageData: any) => {
      const token = getToken();
      const response = await fetch(`${API_URL}/lessons/pages/${pageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(pageData),
      });
      return handleResponse(response);
    },
    
    deletePage: async (pageId: string) => {
      const token = getToken();
      const response = await fetch(`${API_URL}/lessons/pages/${pageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },
  },
  
  // Enrollment endpoints
  enrollment: {
    getStatus: async (courseId: string) => {
      const token = getToken();
      const response = await fetch(`${API_URL}/enrollment/status?course_id=${courseId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },
    
    getUserEnrollments: async () => {
      const token = getToken();
      const response = await fetch(`${API_URL}/enrollment/user`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },
    
    enroll: async (courseId: string) => {
      const token = getToken();
      const response = await fetch(`${API_URL}/enrollment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ course_id: courseId }),
      });
      return handleResponse(response);
    },
    
    updateProgress: async (enrollmentId: string, progress: number) => {
      const token = getToken();
      const response = await fetch(`${API_URL}/enrollment/${enrollmentId}/progress`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ progress_percent: progress }),
      });
      return handleResponse(response);
    },
    
    dropCourse: async (enrollmentId: string) => {
      const token = getToken();
      const response = await fetch(`${API_URL}/enrollment/${enrollmentId}/drop`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },
    
    getStats: async (courseId: string) => {
      const token = getToken();
      const response = await fetch(`${API_URL}/enrollment/stats/${courseId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },
  },
  
  // Exams endpoints
  exams: {
    getAllForChapter: async (chapterId: string) => {
      const response = await fetch(`${API_URL}/exams/chapter/${chapterId}`);
      return handleResponse(response);
    },
    
    getById: async (examId: string, isAdmin = false) => {
      const response = await fetch(`${API_URL}/exams/${examId}${isAdmin ? '?admin=true' : ''}`);
      return handleResponse(response);
    },
    
    create: async (examData: any) => {
      const token = getToken();
      const response = await fetch(`${API_URL}/exams`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(examData),
      });
      return handleResponse(response);
    },
    
    update: async (examId: string, examData: any) => {
      const token = getToken();
      const response = await fetch(`${API_URL}/exams/${examId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(examData),
      });
      return handleResponse(response);
    },
    
    delete: async (examId: string) => {
      const token = getToken();
      const response = await fetch(`${API_URL}/exams/${examId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },
    
    submit: async (examId: string, answers: any[]) => {
      const token = getToken();
      const response = await fetch(`${API_URL}/exams/${examId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ answers }),
      });
      return handleResponse(response);
    },
    
    getResults: async (examId: string) => {
      const token = getToken();
      const response = await fetch(`${API_URL}/exams/${examId}/results`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },
  },
  
  // Questions endpoints (admin only)
  questions: {
    getAllForChapter: async (chapterId: string) => {
      const token = getToken();
      const response = await fetch(`${API_URL}/questions/chapter/${chapterId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },
    
    getById: async (questionId: string) => {
      const token = getToken();
      const response = await fetch(`${API_URL}/questions/${questionId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },
    
    create: async (questionData: any) => {
      const token = getToken();
      const response = await fetch(`${API_URL}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(questionData),
      });
      return handleResponse(response);
    },
    
    update: async (questionId: string, questionData: any) => {
      const token = getToken();
      const response = await fetch(`${API_URL}/questions/${questionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(questionData),
      });
      return handleResponse(response);
    },
    
    delete: async (questionId: string) => {
      const token = getToken();
      const response = await fetch(`${API_URL}/questions/${questionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },
    
    bulkCreate: async (questions: any[]) => {
      const token = getToken();
      const response = await fetch(`${API_URL}/questions/bulk`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ questions }),
      });
      return handleResponse(response);
    },
  },
  
  // Certificates endpoints
  certificates: {
    getUserCertificates: async () => {
      const token = getToken();
      const response = await fetch(`${API_URL}/certificates/user`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },
    
    getById: async (certificateId: string) => {
      const token = getToken();
      const response = await fetch(`${API_URL}/certificates/${certificateId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },
    
    verify: async (certificateUrl: string) => {
      const response = await fetch(`${API_URL}/certificates/verify/${certificateUrl}`);
      return handleResponse(response);
    },
  },
};

export default apiClient;
