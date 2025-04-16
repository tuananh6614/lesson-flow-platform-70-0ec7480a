
import api from '@/lib/axios';
import { User } from '@/types';

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
  message?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  full_name: string;
  email: string;
  password: string;
}

const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/users/login', data);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  },
  
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/users/register', data);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  },
  
  logout: (): void => {
    localStorage.removeItem('token');
  },
  
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<{ success: boolean; user: User }>('/users/me');
    return response.data.user;
  },
  
  updateProfile: async (userId: number, data: Partial<User>): Promise<User> => {
    const response = await api.put<{ success: boolean; user: User }>(`/users/${userId}`, data);
    return response.data.user;
  },
  
  changePassword: async (userId: number, currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
    const response = await api.put<{ success: boolean; message: string }>(`/users/change-password/${userId}`, {
      current_password: currentPassword,
      new_password: newPassword
    });
    return response.data;
  }
};

export default authService;
