
import api from '@/lib/axios';
import { User } from '@/types';

const userService = {
  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get<{ success: boolean; users: User[] }>('/users');
    return response.data.users;
  },

  updateUserStatus: async (userId: number, status: 'active' | 'inactive' | 'banned'): Promise<void> => {
    await api.put(`/users/status/${userId}`, { status });
  },
};

export default userService;

