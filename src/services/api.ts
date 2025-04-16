import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication services
export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/users/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },
  register: async (userData: any) => {
    const response = await api.post('/users/register', userData);
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },
  updateProfile: async (userId: number, userData: any) => {
    const response = await api.put(`/users/${userId}`, userData);
    if (response.data.success) {
      // Update user in localStorage with new data, keeping other fields
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUser = { ...currentUser, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    return response.data;
  },
  changePassword: async (userId: number, passwordData: any) => {
    const response = await api.put(`/users/${userId}/password`, passwordData);
    return response.data;
  },
};

// User management services for admin
export const userService = {
  getAllUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },
  getUserById: async (id: number) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
  updateUserStatus: async (id: number, status: string) => {
    const response = await api.put(`/users/${id}/status`, { status });
    return response.data;
  },
  updateUserRole: async (id: number, role: string) => {
    const response = await api.put(`/users/${id}/role`, { role });
    return response.data;
  },
  deleteUser: async (id: number) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};

// Course services
export const courseService = {
  getAllCourses: async () => {
    const response = await api.get('/courses');
    return response.data;
  },
  getCourseById: async (id: number) => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },
  createCourse: async (courseData: any) => {
    const response = await api.post('/courses', courseData);
    return response.data;
  },
  updateCourse: async (id: number, courseData: any) => {
    const response = await api.put(`/courses/${id}`, courseData);
    return response.data;
  },
  deleteCourse: async (id: number) => {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
  },
};

// Chapter services
export const chapterService = {
  getChaptersByCourse: async (courseId: number) => {
    const response = await api.get(`/chapters/course/${courseId}`);
    return response.data;
  },
  getChapterById: async (id: number) => {
    const response = await api.get(`/chapters/${id}`);
    return response.data;
  },
  createChapter: async (chapterData: any) => {
    const response = await api.post('/chapters', chapterData);
    return response.data;
  },
  updateChapter: async (id: number, chapterData: any) => {
    const response = await api.put(`/chapters/${id}`, chapterData);
    return response.data;
  },
  deleteChapter: async (id: number) => {
    const response = await api.delete(`/chapters/${id}`);
    return response.data;
  },
};

// Enrollment services
export const enrollmentService = {
  getUserEnrollments: async () => {
    const response = await api.get('/enrollment/user');
    return response.data;
  },
  enrollInCourse: async (courseId: number) => {
    const response = await api.post('/enrollment', { courseId });
    return response.data;
  },
  updateProgress: async (enrollmentId: number, progressData: any) => {
    const response = await api.put(`/enrollment/${enrollmentId}/progress`, progressData);
    return response.data;
  },
  dropCourse: async (enrollmentId: number) => {
    const response = await api.put(`/enrollment/${enrollmentId}/drop`);
    return response.data;
  },
};

export default api;
